import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import Iframe from "react-iframe";
// Material UI
import { Grid, CircularProgress } from "@material-ui/core";
// Icons sets
import "font-awesome/css/font-awesome.min.css";
// Redux
import { connect } from "react-redux";
import { fetchMySpecificLabAction } from "../../actions";

// Custom
// Styles
import withStyles from "./styles";
// Copy
import { COPY_MY_LAB_TEMPLATE } from "../../copy/common";
// Components
import PageTitle from "../../components/PageTitle/PageTitle";
import CustomDialog from "../../components/CustomDialog/CustomDialog";
//config
import { LAB_STATUS, CONSOLE_REFRESH_INTERVAL } from "../../apis/config";
//Widget
import Notification from "../../components/Notification/Notification";

class MyLabDetails extends React.Component {
    /*
        declare a member variable to hold the interval ID
        that we can reference later.
    */
    intervalId = null;

    constructor(props) {
        super(props);
        this.state = {
            selectedLabId: this.props.match.params.id,
            fullScreen: true,
            loading: true
        };
    }

    /*
    Type: Life cycle event
    Params: none 
    Return: None
    Functionality: Update all labs and labs specific to virtualLocations
    */
    componentDidMount() {
        const selectedLabId = this.props.match.params.id;
        this.props.fetchMySpecificLabAction(selectedLabId);

        /* Fetch lab data after certain intervals  */
        const _self = this;
        _self.intervalId = setInterval(function() {
            _self.props.fetchMySpecificLabAction(selectedLabId);
        }, CONSOLE_REFRESH_INTERVAL);

        window.addEventListener("resize", this.reload.bind(this));
    }

    /*
    Type: Function
    Params: none 
    Return: None
    Functionality: Reload iframe on window resize
    */
    reload() {
        window.location.reload(false);
    }

    /*
    Type: Life cycle event
    Params: prevProps 
    Return: None
    Functionality: Update labs specific to virtualLocations
    */
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { specificLab } = this.props;

        // If user comes from another page
        if (specificLab && this.state.loading) {
            this.setState({ ...this.state, loading: false });
        }

        if (
            specificLab &&
            (!specificLab ||
                specificLab.status !== LAB_STATUS.READY)
        ) {
            /* Clear repetitive calls once we fetch the data with no new labs */
            clearInterval(this.intervalId);
        }
    }

    /*
    Type: Member function
    Params: lab , panel 
    Return: None
    Functionality: Displays delete confirm modal
*/
    renderLabConsoleModal = (labConsoleURL, fullScreen, classes) => {
        return (
            <CustomDialog
                open={fullScreen}
                fullScreen={true}
                actions={false}
                headerContent={false}
                handleClose={this.toggleFullScreen}
                classes={classes}
                content={
                    <>
                        <Iframe
                            url={labConsoleURL}
                            width="100%"
                            height="100%"
                            loading="true"
                            id="iframeid"
                            className={classes.labDetailModalFrameBlock}
                            display="initial"
                            position="relative"
                        />
                    </>
                }
            />
        );
    };

    render() {
        const { specificLab, classes } = this.props;
        
        const { fullScreen } = this.state;

        return (
            <>
                {!specificLab ? (
                    <>
                        <PageTitle title={"Loading..."} />
                        <Grid container spacing={4}>
                            <CircularProgress
                                size={60}
                                className={classes.loaderIcon}
                            />
                        </Grid>
                    </>
                ) : (specificLab &&
                  specificLab.status === LAB_STATUS.READY ? (
                    <>
                        <PageTitle
                            title={
                                specificLab.params &&
                                specificLab.params.instance_name
                                    ? specificLab.params.instance_name
                                    : "<Lab Name>"
                            }
                        />

                        <Grid
                            container
                            spacing={3}
                            direction="row"
                            wrap="wrap"
                            className={classnames(classes.labDetailContainer)}
                        >
                            {/*
                            {this.showLabDetails(specificLab, classes)}
                            */}
                            {/* Modal to launch lab */
                            this.renderLabConsoleModal(
                                specificLab.lab_details.LabConsoleUrl,
                                fullScreen,
                                classes
                            )}
                        </Grid>
                    </>
                ) : (
                    <>
                        <PageTitle title={"Search Results... "} />
                        <Grid item md={4} sm={6} xs={12}>
                            <Notification
                                className={classes.notificationItem}
                                shadowless
                                type="message"
                                message={COPY_MY_LAB_TEMPLATE.NO_LAB}
                                variant="contained"
                                color="warning"
                            />
                        </Grid>
                    </>
                ))}
            </>
        );
    }
}

MyLabDetails.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ myLabs }) => {
    const { specificLab } = myLabs;
    return { specificLab };
};

export default connect(mapStateToProps, { fetchMySpecificLabAction })(
    withStyles(MyLabDetails)
);
