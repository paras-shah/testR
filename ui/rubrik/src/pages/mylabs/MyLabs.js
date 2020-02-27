import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Material UI
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";

// Redux
import { connect } from "react-redux";
import {
    fetchMyLabsAction,
    deleteMyLabAction,
    checkForNewMyLabs,
    updateSearchTermAction
} from "../../actions";

// Custom
// Styles
import withStyles from "./styles";
// Copy
import { COPY_MY_LAB_TEMPLATE } from "../../copy/common";
// Components
import PageTitle from "../../components/PageTitle/PageTitle";
import { Typography } from "../../components/Wrappers/Wrappers";
import CustomDialog from "../../components/CustomDialog/CustomDialog";
import NoLabFound from "../labtemplates/components/NoLabFound";
import LabInstance from "./components/LabInstance";
import { getLabInstanceName } from "../../utilities";

// Config
import { WEBPAGE_LABEL, LAB_REFRESH_INTERVAL } from "../../apis/config";

//Widget
import Notification from "../../components/Notification/Notification";

class MyLabs extends React.Component {
    /*
        declare a member variable to hold the interval ID
        that we can reference later.
    */
    intervalId = null;
    isDeleting = false;

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            selectedLabInstance: null,
            loading: true,
            error: false,
            value: ""
        };
    }

    /*
    Type: Life cycle event
    Params: none 
    Return: None
    Functionality: Update all labs and labs specific to virtualLocations
    */
    componentDidMount() {
        const { selectedVirtualDataUnit, searchTerm } = this.props;
        if (!selectedVirtualDataUnit) {
            this.setState({ ...this.state, loading: true });
        } else {
            this.props.fetchMyLabsAction(selectedVirtualDataUnit, searchTerm);
        }
    }

    /*
    Type: Life cycle event
    Params: prevProps 
    Return: None
    Functionality: Update labs specific to virtualLocations
    */
    componentDidUpdate(prevProps, prevState, snapshot) {
        const {
            myLabs,
            selectedVirtualDataUnit,
            newMyLabsCount,
            searchTerm
        } = this.props;
        const prevMyLabs = prevProps.myLabs;
        const prevLocationSelected = prevProps.selectedVirtualDataUnit;
        const prevSearchTerm = prevProps.searchTerm;

        /* No change in number in update */
        if (
            !this.isDeleting &&
            this.state.loading &&
            myLabs.virtualDataUnitInstances &&
            prevMyLabs.virtualDataUnitInstances &&
            myLabs.virtualDataUnitInstances.length ===
            prevMyLabs.virtualDataUnitInstances.length
        ) {
            this.setState({ ...this.state, loading: false, error: false });
        }

        /* setState is async - not able to update isDeleting of state 
            this.setState((previousState, currentProps) => {
                return { ...previousState,  isDeleting: false}; }); 
        */
        if (
            this.isDeleting &&
            myLabs.virtualDataUnitInstances.length <
            prevMyLabs.virtualDataUnitInstances.length
        ) {
            this.isDeleting = false;
        }

        /* When we get VDU for the very first time or
            When there is a change in VDU or
            There is a change in  instances 
                From none to any or change in numbers 
        */

        if (
            (!prevLocationSelected && selectedVirtualDataUnit) ||
            prevLocationSelected !== selectedVirtualDataUnit ||
            (myLabs.virtualDataUnitInstances &&
                !prevMyLabs.virtualDataUnitInstances) ||
            (prevMyLabs.virtualDataUnitInstances &&
                myLabs.virtualDataUnitInstances.length !==
                prevMyLabs.virtualDataUnitInstances.length) ||
            searchTerm !== prevSearchTerm
        ) {
            this.setState({ ...this.state, loading: true });
            this.props.fetchMyLabsAction(selectedVirtualDataUnit, searchTerm);
        }

        /* Clear repetitive calls once we fetch the data with no new labs */
        if (this.intervalId && !newMyLabsCount) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }

        /* Fetch lab data after certain intervals  */
        if (newMyLabsCount && !this.intervalId) {
            const _self = this;
            this.stopAutomaticUpdate();

            _self.intervalId = setInterval(function () {
                _self.props.fetchMyLabsAction(
                    selectedVirtualDataUnit,
                    _self.props.searchTerm
                );
            }, LAB_REFRESH_INTERVAL);
        }
    }

    /*
    Type: Member function
    Params: None
    Return: Layout 
    Functionality: To stop fetching data once component unmounted
    */
    componentWillUnmount() {
        this.stopAutomaticUpdate();
    }

    /*
    Type: Member function
    Params: virtualDataUnitInstances, classes
    Return: Layout 
    */
    renderMyLabTemplates = (virtualDataUnitInstances, classes) => {

        if (virtualDataUnitInstances && virtualDataUnitInstances.length) {
            return virtualDataUnitInstances.map((lab, index) => {
                return (
                    <LabInstance
                        key={index}
                        classes={classes}
                        lab={lab}
                        handleClickDeleteModalOpen={
                            this.handleClickDeleteModalOpen
                        }
                        handleDelete={this.handleDeleteAction}
                    />
                );
            });
        } else {
            return (
                <Grid item sm={12}>
                    <NoLabFound emptySearch={this.props.updateSearchTermAction}
                    />
                </Grid>
            );
        }
    };

    /*
    Type: Member function
    Params: None
    Return: Layout 
    Functionality: To stop automatic update of lab status
    */
    stopAutomaticUpdate() {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    /*
    Type: Member function
    Params: lab ,  
    Return: None
    Functionality: Opens dialog box 
*/
    handleClickDeleteModalOpen = lab => {
        this.setState({
            ...this.state,
            open: true,
            selectedLabInstance: lab
        });
    };

    /*
    Type: Member function
    Params: None
    Return: None 
    Functionality: Close dialog box
*/
    handleClose = () => {
        this.setState((previousState, currentProps) => {
            return {
                ...previousState,
                loading: true,
                open: false
            };
        });
    };

    /*
    Type: Member function
    Params: lab , panel 
    Return: None
    Functionality: Opens dialog box pre-populate with selected Lab
*/
    handleDeleteAction = () => {
        this.stopAutomaticUpdate();

        const { selectedLabInstance } = this.state;
        this.props.deleteMyLabAction(
            selectedLabInstance.id,
            this.props.selectedVirtualDataUnit,
            this.props.searchTerm
        );
        this.props.fetchMyLabsAction(
            this.props.selectedVirtualDataUnit,
            this.props.searchTerm
        );

        this.handleClose();
        this.isDeleting = true;
    };

    /*
    Type: Member function
    Params: lab , panel 
    Return: None
    Functionality: Displays delete confirm modal
*/
    renderDeleteModal = (open, classes) => {
        const labInstance = this.state.selectedLabInstance;

        return (
            <CustomDialog
                open={open}
                maxWidth="lg"
                classes={classes}
                headerContent={false}
                actions={true}
                actionLabel="Proceed"
                cancelLabel="Cancel"
                handleAction={this.handleDeleteAction}
                handleClose={this.handleClose}
                content={
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                    >
                        <Grid
                            item
                            xs={12}
                            className={classes.deleteConfirmationBox}
                        >
                            {labInstance && (
                                <header
                                    className={
                                        classes.deleteInstanceWidgetHeader
                                    }
                                >
                                    <div
                                        className={
                                            classes.deleteInstanceWidgetHeaderText
                                        }
                                    >
                                        <Typography variant="h5">
                                            {getLabInstanceName(labInstance)}
                                        </Typography>
                                        {labInstance.description &&
                                            labInstance.description.short && (
                                                <Typography
                                                    color="quinary"
                                                    theme="main"
                                                    className={
                                                        classes.deleteInstanceBriefDescription
                                                    }
                                                >
                                                    {
                                                        labInstance.lab_template_name
                                                    }
                                                    {"@"}
                                                    {
                                                        labInstance.lab_template_version
                                                    }
                                                </Typography>
                                            )}
                                    </div>

                                    {/*
                                    <List
                                        dense={true}
                                        className={
                                            classes.deleteInstanceWidgetHeaderDetails
                                        }
                                    >
                                        <ListItem>
                                            <Typography
                                                color="quinary"
                                                theme="main"
                                                className={
                                                    classes.deleteInstanceBriefDescription
                                                }
                                            >
                                                Creation
                                                <span
                                                    className={
                                                        classes.textSecondary
                                                    }
                                                >
                                                    -
                                                </span>
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography
                                                color="quinary"
                                                theme="main"
                                                className={
                                                    classes.deleteInstanceBriefDescription
                                                }
                                            >
                                                Runtime
                                                <span
                                                    className={
                                                        classes.textSecondary
                                                    }
                                                >
                                                    -
                                                </span>
                                            </Typography>
                                        </ListItem>
                                    </List>
                                                */}
                                </header>
                            )}

                            <Typography variant="h5" weight="medium">
                                {COPY_MY_LAB_TEMPLATE.CONFIRM_DESTROY}
                            </Typography>

                            <Typography
                                color="text"
                                colorBrightness="main"
                                className={classnames("smallText")}
                            >
                                ({COPY_MY_LAB_TEMPLATE.CONFIRM_DESTROY_HELPTEXT})
                            </Typography>
                        </Grid>
                    </Grid>
                }
            />
        );
    };


    render() {
        //var theme = useTheme();
        const { myLabs, classes } = this.props;

        return (
            <>
                <PageTitle
                    title={WEBPAGE_LABEL.MY_LABS}
                    className={"myLabs"}
                    buttonType="Labs"
                    emptySearch={this.props.updateSearchTermAction}
                />


                {this.state.loading ? (
                    <Grid
                        container
                        spacing={4}
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item sm={1}>
                            <CircularProgress
                                size={60}
                                className={classes.loaderIcon}
                            />
                        </Grid>
                    </Grid>
                ) : this.state.error ? (
                    <Grid
                        container
                        spacing={4}
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item md={4} sm={6} xs={12}>
                            <Notification
                                className={classes.notificationItem}
                                shadowless
                                type="message"
                                message={COPY_MY_LAB_TEMPLATE.NO_VDUS}
                                variant="contained"
                                color="warning"
                            />
                        </Grid>
                    </Grid>
                ) : (
                            <Grid
                                container
                                spacing={4}
                                direction="row"
                                justify="flex-start"
                                alignItems="stretch"
                            >
                                {this.renderMyLabTemplates(
                                    myLabs.virtualDataUnitInstances,
                                    classes
                                )}
                            </Grid>
                        )}

                {/* Modal to confirm user delete action */
                    this.renderDeleteModal(this.state.open, classes)}
            </>
        );
    }
}

MyLabs.propTypes = {
    classes: PropTypes.object.isRequired,
    myLabs: PropTypes.oneOfType([() => null, PropTypes.object]).isRequired
};

const mapStateToProps = ({ myLabs, virtualLocations, layout }) => {
    const { searchTerm } = layout;
    return {
        myLabs,
        searchTerm,
        selectedVirtualDataUnit: virtualLocations
            ? virtualLocations.selectedVirtualDataUnit
            : undefined,
        newMyLabsCount: myLabs ? checkForNewMyLabs(myLabs) : 0
    };
};

export default connect(mapStateToProps, {
    fetchMyLabsAction,
    deleteMyLabAction,
    checkForNewMyLabs,
    updateSearchTermAction
})(withStyles(MyLabs));