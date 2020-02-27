import React from "react";
import PropTypes from "prop-types";

// Material UI
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

// Redux
import { connect } from "react-redux";
import { fetchLabTemplatesAction, updateSearchTermAction } from "../../actions/";

//Custom
// Styles
import withStyles from "./styles";
// Config
import { WEBPAGE_LABEL } from "../../apis/config";
// Copy
import { COPY_LAB_TEMPLATE } from "../../copy/common";
// Components
import PageTitle from "../../components/PageTitle/PageTitle";
import CustomDialog from "../../components/CustomDialog/CustomDialog";
import LabGenerator from "./components/LabGenerator";
import NoLabFound from "./components/NoLabFound";
import Lab from "./components/Lab";

//Widget
import Notification from "../../components/Notification";
//Debug
// import { stateComponentTraceUpdate } from "../../utilities/commonDebugFunction";

class LabTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            currentLabTemplate: null,
            expanded: false,
            loading: true,
            error: false
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
            this.props.fetchLabTemplatesAction(
                selectedVirtualDataUnit,
                searchTerm
            );
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
            labTemplates,
            selectedVirtualDataUnit,
            searchTerm
        } = this.props;
        // console.log("updated ");
        // stateComponentTraceUpdate(this, prevProps, prevState);
        const prevLabTemplates = prevProps.labTemplates;
        const prevLocationSelected = prevProps.selectedVirtualDataUnit;
        const prevSearchTerm = prevProps.searchTerm;

        /* If we get results from server then virtualDataUnitSpecific is not null (0,1,2 ...) */
        if (this.state.loading &&
            labTemplates.virtualDataUnitSpecific) {
            this.setState({ ...this.state, loading: false, error: false });
        }

        /* When there is a change in VDU */
        if (prevLocationSelected !== selectedVirtualDataUnit) {
            this.setState({ ...this.state, loading: true });
            this.props.fetchLabTemplatesAction(
                selectedVirtualDataUnit,
                searchTerm
            );
        }

        /* There is a change in lab location */
        if (
            labTemplates.virtualDataUnitSpecific &&
            !prevLabTemplates.virtualDataUnitSpecific
        ) {
            this.setState({ ...this.state, loading: true });
            this.props.fetchLabTemplatesAction(
                selectedVirtualDataUnit,
                searchTerm
            );
        }

        /* There is a change in  search term */
        if (searchTerm !== prevSearchTerm) {
            this.setState({ ...this.state, loading: true });
            this.props.fetchLabTemplatesAction(
                selectedVirtualDataUnit,
                searchTerm
            );
        }
    }

    /*
    Type: Member function
    Params: lab , panel 
    Return: None
    Functionality: Opnes dialog box prepopulate with selected Lab
*/
    handleClickOpen = (lab, panel = null) => {
        this.setState({
            ...this.state,
            open: true,
            currentLabTemplate: lab,
            expanded: panel
        });
    };

    /*
    Type: Member function
    Params: lab , panel 
    Return: None
    Functionality: Opnes dialog box prepopulate with selected Lab
    */
    expandPanel = (panel = null) => {
        this.setState({
            ...this.state,
            expanded: panel
        });
    };

    /*
    Type: Member function
    Params: lab , panel 
    Return: None
    Functionality: Opnes dialog box prepopulate with selected Lab
    */
    resetExpandedState = () => {
        this.setState({
            ...this.state,
            expanded: ""
        });
    };

    /*
    Type: Member function
    Params: None
    Return: None 
    Functionality: Close dialog box
*/
    handleClose = () => {
        this.setState({ ...this.state, open: false });
    };

    /*
    Type: Member function
    Params: virtualDataUnitSpecific, classes
    Return: Layout 
*/
    renderLabTemplates = (virtualDataUnitSpecific, classes) => {
        if (virtualDataUnitSpecific && virtualDataUnitSpecific.length) {
            return virtualDataUnitSpecific.map(lab => {
                const latestVersion = lab.versions[0];

                return (
                    <Lab
                        key={latestVersion.id}
                        classes={classes}
                        lab={lab}
                        handleClickOpen={this.handleClickOpen}
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
    Params: lab , panel 
    Return: None
    Functionality: Displays Create lab modal
*/
    
renderCreateLabModal = classes => {
        const { open, currentLabTemplate, expanded } = this.state;
        return (
            <CustomDialog
                open={open}
                maxWidth="md"
                actions={false}
                headerContentType="createLab"
                title={COPY_LAB_TEMPLATE.CREATE_LAB_MODEL_TITLE}
                handleClose={this.handleClose}
                expandPanel={this.expandPanel}
                className={classes.createLabModel}
                content={
                    <LabGenerator
                        lab={currentLabTemplate}
                        expanded={expanded}
                        resetPanel={this.resetExpandedState}
                    />
                }
            />
        );
    };

    render() {
        const { labTemplates, classes } = this.props;

        return (
            <>
                <PageTitle
                    title={WEBPAGE_LABEL.LABS}
                    className={"lab"}
                    buttonType="My Labs"
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
                                message={COPY_LAB_TEMPLATE.NO_VDUS}
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
                                {this.renderLabTemplates(
                                    labTemplates.virtualDataUnitSpecific,
                                    classes
                                )}
                            </Grid>
                        )}
                {/* Modal to create a lab */
                    this.renderCreateLabModal(classes)}
            </>
        );
    }
}

LabTemplate.propTypes = {
    //allLabs: PropTypes.oneOfType([() => null, PropTypes.object]).isRequired,
    classes: PropTypes.object.isRequired
};

LabTemplate.defaultProps = {
    open: false,
    expanded: "panel1"
};

const mapStateToProps = ({ labTemplates, virtualLocations, layout }) => {
    const { searchTerm } = layout;
    return {
        labTemplates,
        searchTerm,
        selectedVirtualDataUnit: virtualLocations
            ? virtualLocations.selectedVirtualDataUnit
            : ""
    };
};

export default connect(mapStateToProps, { fetchLabTemplatesAction, updateSearchTermAction })(
    withStyles(LabTemplate)
);
