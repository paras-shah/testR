import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import Iframe from "react-iframe";
import ReactMarkdown from "react-markdown";
import {
    Fullscreen as FullscreenIcon,
    FullscreenExit as FullscreenExitIcon
} from "@material-ui/icons";

// Material UI
import { Grid, CircularProgress, Paper } from "@material-ui/core";
// icons sets
import "font-awesome/css/font-awesome.min.css";

// Redux
import { connect } from "react-redux";
import { fetchMySpecificLabAction } from "../../actions";

// Custom
// Styles
import withStyles from "./styles";
// Config
import { WEBPAGE_URL, FONT_AWESOME } from "../../apis/config";
// Copy
import { COPY_MY_LAB_TEMPLATE } from "../../copy/common";
// Components
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Typography } from "../../components/Wrappers/Wrappers";
//Widget
import Notification from "../../components/Notification/Notification";
import { getDateFormat } from "../../utilities/";

class MyLabDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedLabId: this.props.match.params.id,
            fullScreen: false
        };

        this.iframeRef = React.createRef();
    }

    /*
    Type: Function
    Params: Tab Id
    Return: None
    Functionality: To set TAb stare
    */
    toggleFullScreen = id => {
        this.setState(state => {
            return { ...state, fullScreen: !state.fullScreen };
        });
        this.focusOnIframe();
    };

    /*
    Type: Function
    Params: Tab Id
    Return: None
    Functionality: To set TAb stare
    */
    focusOnIframe = () => {
        document.getElementById("myId").contentWindow.focus();
    };

    /*
    Type: Life cycle event
    Params: none 
    Return: None
    Functionality: Update all labs and labs specific to locations
    */
    componentDidMount() {
        const selectedLabId = this.props.match.params.id;
        this.props.fetchMySpecificLabAction(selectedLabId);
    }

    /*
    Type: Member function
    Params: locationLabs, classes
    Return: Layout 
    */
    renderIndividualInfo = (classes, label, value) => {
        value = value ? value : "-";
        return (
            <div className={classes.labPanelItems} key={label} display="flex">
                <Typography
                    color="text"
                    className={classnames(classes.labPanelLeftItem)}
                    colorBrightness="primary"
                >
                    {label}:
                </Typography>
                <Typography color="text" colorBrightness="primary">
                    {value}
                </Typography>
            </div>
        );
    };

    /*
    Type: Member function
    Params: locationLabs, classes
    Return: Layout 
    */
    showLabDetails = (fullScreen, specificLab, classes) => {
        const labName =
            specificLab.params && specificLab.params.instance_name
                ? specificLab.params.instance_name
                : "<Lab Name>";

        return (
            <>
                <Grid
                    item
                    xs={12}
                    md={fullScreen ? 12 : 9}
                    className={classnames(classes.labConsoleLeftSection)}
                >
                    <Paper
                        className={classnames(
                            classes.labPanelContainer,
                            classes.leftContainer
                        )}
                    >
                        <div
                            className={classes.iframeIconDiv}
                            onClick={this.toggleFullScreen}
                        >
                            {!fullScreen && (
                                <FullscreenIcon
                                    className={classes.iframeIcon}
                                    color="secondary"
                                    titleAccess="Full Screen Mode"
                                />
                            )}
                            {fullScreen && (
                                <FullscreenExitIcon
                                    className={classes.iframeIcon}
                                    color="secondary"
                                    titleAccess="Exit Full Screen Mode"
                                />
                            )}
                        </div>

                        <Iframe
                            url={specificLab.lab_details.lab_console_url}
                            width="100%"
                            height="100%"
                            loading="true"
                            ref={this.iframeRef}
                            id="myId"
                            onLoad={() => {
                                setTimeout(function() {
                                    document
                                        .getElementById("myId")
                                        .contentWindow.focus();
                                }, 1000);
                            }}
                            onMouseOver={() => {
                                document
                                    .getElementById("myId")
                                    .contentWindow.focus();
                            }}
                            className={classes.iframeBlock}
                            display="initial"
                            position="relative"
                        />
                    </Paper>
                </Grid>
                {!fullScreen && (
                    <Grid
                        item
                        xs={12}
                        md={3}
                        className={classnames(
                            classes.labConsoleRightSection,
                            classes.rightSection
                        )}
                    >
                        <Widget
                            title={labName}
                            widgetMainHeadingClass={classnames(
                                classes.labHeader
                            )}
                            headerIconUsingClasses={classnames(
                                classes.labHeaderIcon,
                                FONT_AWESOME.MY_LAB
                            )}
                            upperTitle
                            disableWidgetMenu={true}
                            className={classnames(
                                classes.labPanelTopRightContainer,
                                classes.labPanelContainer
                            )}
                            moreLink={[
                                {
                                    text: "Back to main site",
                                    type: "Link",
                                    url: WEBPAGE_URL.MY_LABS
                                }
                            ]}
                        >
                            <Grid
                                container
                                spacing={2}
                                direction="row"
                                justify="space-between"
                                alignItems="stretch"
                            >
                                <Grid item xs={2}></Grid>
                                <Grid item xs={10}>
                                    {this.renderIndividualInfo(
                                        classes,
                                        COPY_MY_LAB_TEMPLATE.LAB,
                                        `${specificLab.lab_template_name}@${specificLab.lab_template_version}`
                                    )}
                                    {this.renderIndividualInfo(
                                        classes,
                                        COPY_MY_LAB_TEMPLATE.END_DATE,
                                        getDateFormat(specificLab.end_date)
                                    )}
                                </Grid>
                            </Grid>
                        </Widget>

                        <Paper
                            className={classnames(
                                classes.labPanelBottomRightContainer,
                                classes.labPanelContainer
                            )}
                        >
                            <ReactMarkdown
                                source={specificLab.description.long}
                                escapeHtml={true}
                                className={classnames(
                                    classes.markDownContainer
                                )}
                            />
                        </Paper>
                    </Grid>
                )}
            </>
        );
    };

    render() {
        const { myLabs, classes } = this.props;
        const { specificLab } = myLabs;
        const { fullScreen } = this.state;

        return (
            <Grid
                container
                spacing={1}
                direction="column"
                wrap="wrap"
                className={classnames(classes.labConsoleContainer)}
            >
                {!specificLab ? (
                    <Grid className={classes.labConsole} item xs={12}>
                        <Paper
                            className={classnames(
                                classes.labPanelContainer,
                                classes.noLabContainer
                            )}
                        >
                            <PageTitle title={"Loading..."} />
                            <Grid container spacing={4}>
                                <CircularProgress
                                    size={60}
                                    className={classes.loaderIcon}
                                />
                            </Grid>
                        </Paper>
                    </Grid>
                ) : specificLab.length ? (
                    <>
                        {this.showLabDetails(
                            fullScreen,
                            specificLab[0],
                            classes
                        )}
                    </>
                ) : (
                    <Grid className={classes.tab} item xs={12}>
                        <Paper
                            className={classnames(
                                classes.labPanelContainer,
                                classes.noLabContainer
                            )}
                        >
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
                        </Paper>
                    </Grid>
                )}
            </Grid>
        );
    }
}

MyLabDetails.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ myLabs }) => {
    return { myLabs };
};

export default connect(
    mapStateToProps,
    { fetchMySpecificLabAction }
)(withStyles(MyLabDetails));
