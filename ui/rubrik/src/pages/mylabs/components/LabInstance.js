import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "datejs";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import YAML from "json2yaml";
import { connect } from "react-redux";

//import SyntaxHighlighter from "react-syntax-highlighter";
//import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

// Material UI
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// SVG
// import OpenInNew from "@material-ui/icons/OpenInNew";
// icons sets
import "font-awesome/css/font-awesome.min.css";

//  Custom
// Config
import { LAB_STATUS, WEBPAGE_URL, ACTION_TYPE } from "../../../apis/config";
// Copy
import { COPY_MY_LAB_TEMPLATE } from "../../../copy/common";

//Component
import Widget from "../../../components/Widget/Widget";
import LabSpecs from "../../labtemplates/components/LabSpecs";
import { TabPanel, a11yProps } from "./TabsPanel";
import CustomDialog from "../../../components/CustomDialog/CustomDialog";
import LabActions from "./LabActions";

// Action
import { performLabActions } from "../../../actions";


import { Typography } from "../../../components/Wrappers/Wrappers";
import {
    getDateFormat,
    getLabInstanceName,
    HtmlTooltip,
    displayLimitedCharacters,
    getUrl,
    getProtocolIcons,
    getBrowser
} from "../../../utilities";


/*
    Type: Member function
    Params: virtualDataUnitInstances, classes
    Return: Opens Lab in new tab - 
    */
function getLaunchIcon(lab, differentDomain = false, classes) {
    let labUrl = "#", launchLinkHtml;
    const isDisabled = lab.status.toLowerCase() !==
        LAB_STATUS.READY.toLowerCase()
        ? true
        : false;

    if (lab && lab.hasOwnProperty("lab_details") && lab.lab_details)
        labUrl = lab.lab_details.LabConsoleUrl;

    launchLinkHtml = (!isDisabled) ? (
        <HtmlTooltip
            title={
                <Typography className={classes.heading}>
                    {COPY_MY_LAB_TEMPLATE.LAB_LAUNCH_TITLE}
                </Typography>
            }
            placement="bottom-start"
        >
            <>
                {differentDomain && <a
                    href={labUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                    className={classnames(classes.launchButton)}
                >
                    Preview
            </a>}

                {!differentDomain && <Link title={COPY_MY_LAB_TEMPLATE.LAB_LAUNCH_TITLE} to={WEBPAGE_URL.MY_LAB_DETAILS + "/" + lab.id}>
                    <button />
                </Link >}
            </>
        </HtmlTooltip>
    ) : (
            <button
                disabled={isDisabled}
                className={classnames(classes.launchButton,
                    {
                        disabled: isDisabled
                    }
                )}
            >
                Preview
        </button>
        );
    return launchLinkHtml;



}

/*
    Type: Member function
    Params: lab, 
    Return: Lab Specs  from lab instance  
    */
function createLabSpecsForInstance(lab) {
    let labStats = {};
    labStats["created"] = `${getDateFormat(lab.created_date)}`;
    labStats["start_date"] = `${getDateFormat(lab.start_date)}`;
    labStats["end_date"] = `${getDateFormat(lab.end_date)}`;
    labStats["time_remaining"] = lab.time_remaining;
    return labStats;
}

/*
    Type: Function
    Functionality: To display end points in lab instances when ready
    Params: lab, classes
    Return: Layout 
    */
function displayEndPoints(lab, classes, handleClickDeleteModalOpen) {
    return (
        <>
            <header className={classes.endpointHeader}>
                {lab.lab_details
                    && lab.lab_details.Services &&
                    <div className={classes.allServiceLink}>
                        {copySiteText(
                            COPY_MY_LAB_TEMPLATE.ALL_ENDPOINTS,
                            `${YAML.stringify(lab.lab_details.Services)}`,
                            classes,
                            "Click to copy all services (in yaml)",
                            "tertiary"
                        )}
                    </div>
                }
            </header>

            <div className={classnames(classes.endPointDetails)}>
                <table>
                    <thead>
                        <tr>
                            <th width="25%"> <span>{COPY_MY_LAB_TEMPLATE.SERVICE}</span> </th>
                            <th width="15%"> {"Connect From "}</th>
                            <th width="30%"> <span>{"External Url"}</span> <hr />  <span>{"Internal Url"}</span></th>
                            <th width="30%"> <span>{"Username"}</span> <hr /> <span>{"Password"}</span> </th>
                        </tr>
                    </thead>
                    <tbody>{displayService(lab.lab_details, classes)}</tbody>
                </table>

                <div className={classnames("labHoverSection")}>
                    <Button
                        classes={{ root: classes.labStatusButton }}
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            handleClickDeleteModalOpen(lab);
                        }}
                    >
                        {LAB_STATUS[lab.status.toUpperCase()]}
                    </Button>
                </div>
            </div>
        </>
    );
}

/*
    Type: Member function
    Params: virtualDataUnitInstances, classes
    Return: Layout 
    */
function displayService(labDetails, classes) {
    if (!labDetails || !labDetails.Services) {
        return (
            <>
                <tr>
                    <td colSpan="4"> - </td>
                </tr>
                <tr>
                    <td colSpan="4"> - </td>
                </tr>
                <tr>
                    <td colSpan="4"> - </td>
                </tr>
                <tr>
                    <td colSpan="4"> - </td>
                </tr>
            </>

        );
    }

    const serviceKeys = Object.keys(labDetails.Services);
    const sortedServiceObject = {};

    serviceKeys.sort().forEach((key) => {
        sortedServiceObject[key] = labDetails.Services[key];
    })

    const services = Object.entries(sortedServiceObject);
    return services.map((service, index) => {
        let serviceDom = "", urlModified;
        if (service.length >= 0) {
            const serviceHost = service[0],
                serviceData = service[1];

            const { Protocol, Internal, External, Credentials } = serviceData;
            const { Username, Password } = Credentials;

            const serviceHostOnly = getServiceName(serviceHost, Protocol);

            urlModified = getUrl(Protocol, External.IP, External.Port);
            const externalUrlDisplayed = urlModified.urlDisplayed;
            const externalUrlCopied = urlModified.urlCopied;

            urlModified = getUrl(Protocol, Internal.IP, Internal.Port);
            const internalUrlDisplayed = urlModified.urlDisplayed;
            const internalUrlCopied = urlModified.urlCopied;

            serviceDom = (
                <tr key={index}>
                    <td>
                        {copySiteText(
                            displayLimitedCharacters(serviceHostOnly),
                            `${YAML.stringify(serviceData)}`,
                            classes,
                            `Click to copy ${serviceHostOnly} service (yaml format)`
                        )}
                        {getProtocols(Protocol, externalUrlCopied, classes)}
                    </td>
                    <td>
                        {getCommands(Protocol, External.IP, External.Port, Username, classes, externalUrlCopied)}
                    </td>
                    <td>
                        {copySiteText(
                            displayLimitedCharacters(`${externalUrlDisplayed}`),
                            externalUrlCopied,
                            classes,
                            "Click to copy external url"
                        )}
                        <hr />
                        {copySiteText(
                            displayLimitedCharacters(internalUrlDisplayed),
                            internalUrlCopied,
                            classes,
                            "Click to copy internal url"
                        )}
                    </td>
                    <td>
                        {copySiteText(
                            displayLimitedCharacters(Username),
                            Username,
                            classes,
                            "Click to copy username"
                        )}
                        <hr />
                        {copySiteText(
                            "******",
                            Password,
                            classes,
                            "Click to copy password"
                        )}
                    </td>
                    {/*
                        <div className={classes.codeContainer}>
                            <SyntaxHighlighter
                                className={classes.codeComponent}
                                language="javascript"
                                style={docco}
                            >
                                {jsonString}
                            </SyntaxHighlighter>
                        </div>
                        */}
                </tr>
            );
        }
        return serviceDom;
    });
}

/*
    Type: Member function
    Params: virtualDataUnitInstances, classes
    Return: Layout 
    */

function getServiceName(service, protocol) {
    let serviceName = '';
    const localService = service.toLowerCase(), localProtocol = protocol.toLowerCase(), existAt = localService.indexOf(localProtocol);
    if (existAt > 0) {
        let serviceLength = existAt;
        if (service[existAt - 1] === "-")
            serviceLength = existAt - 1;
        serviceName = service.substring(0, serviceLength)
    }
    return serviceName;
}

/*
    Type: Member function
    Params: virtualDataUnitInstances, classes
    Return: Layout 
    */
function copySiteText(labelText, copyText, classes, helperText = "Click to copy", color = "secondary") {
    return (
        <HtmlTooltip
            key={labelText}
            title={
                <Typography className={classes.heading}>
                    {helperText}
                </Typography>

            }
            placement="bottom-start"
        >
            <CopyToClipboard
                text={copyText}
                onCopy={() => {
                    toast.info(`copied`, {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                }}
            >
                <Typography
                    color={color}
                    className={classnames(classes.linkText, "smallText")}
                >
                    <span>{labelText}</span>
                </Typography>

            </CopyToClipboard>
        </HtmlTooltip>
    );
}

/*
    Type: Member function
    Params: virtualDataUnitInstances, classes
    Return: Layout 
    */
function getProtocols(protocol, externalUrlCopied, classes) {
    return protocol.toUpperCase()
}


/*
    Type: Member function
    Params: virtualDataUnitInstances, classes
    Return: Layout 
    */
function getCommands(protocol, ip, port, user, classes, externalUrlCopied) {
    const browserClass = `fa fa-${getBrowser()}`;

    if (protocol === "http" || protocol === "https") {
        return (<a
            href={externalUrlCopied}
            rel="noopener noreferrer"
            target="_blank"
            className={classnames(classes.linkProtocol)}
        >
            <HtmlTooltip
                title={
                    <Typography className={classes.heading}>
                        Click to open in new tab
                    </Typography>
                }
                placement="bottom-start"
            >
                <i className={browserClass} />
            </HtmlTooltip>

            {/* <OpenInNew className={classnames(classes.openInNewIcon)} /> */}
        </a>);

    } else {
        const commands = getProtocolIcons(protocol, ip, port, user, "Windows OS");
        const otherSystemCommands = getProtocolIcons(protocol, ip, port, user, "other");

        let html = <>
            <>
                {copySiteText(
                    <i className='fa fa-windows' />,
                    commands.copyText,
                    classes,
                    "Click to copy Windows command"
                )}
            </>
            <>
                {copySiteText(
                    <i className='fa fa-apple' />,
                    otherSystemCommands.copyText,
                    classes,
                    "Click to copy Mac command"
                )}
            </></>;

        return html;

    }
}


const LabInstance = props => {
    const { classes, lab, handleClickDeleteModalOpen, performLabActions } = props;
    const labSpecs = createLabSpecsForInstance(lab);
    const [currentTab, setCurrentTab] = React.useState(0);
    const [openParamsModal, setOpenParamsModal] = React.useState(false);

    const [params, setParams] = React.useState(null);
    const [actionType, setActionType] = React.useState(ACTION_TYPE.LAB);
    const [actionName, setActionName] = React.useState(null);
    const [resourceId, setResourceId] = React.useState(null);
    const [resourceName, setResourceName] = React.useState(null);


    const handleChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    /*
        Type: Member function
        Params: virtualDataUnitInstances, classes
        Return: Layout 
        */
    const displayLabActions = () => {
        /// remove it later 
        const labActions = lab["lab-actions"];
        const resources = lab["resources"];

        return (
            <>
                {labActions && labActions.length >= 0 && <section className={classes.serviceActionsHeader}>
                    <h5 className={classes.actionHeader}>Lab Actions</h5>
                    <ul className={classes.labActionList}>
                        {labActions.length >= 0 && labActions.map((action, index) => {
                            const { action_name, action_params, action_help } = action;
                            return (<li key={index}>
                                <Button
                                    title={action_help}
                                    classes={{ root: classes.button }}
                                    color="primary"
                                    variant="outlined" onClick={(e) => {
                                        setOpenParamsModal(true);
                                        setParams(action_params);
                                        setActionType(ACTION_TYPE.LAB);
                                        setActionName(action_name);
                                        setResourceId(null);
                                        setResourceName(null);
                                    }}> {action_name}</Button>
                            </li>)
                        })}
                    </ul>
                </section>}

                { <section className={classes.serviceActionsHeader}>
                    <h5 className={classes.actionHeader}> Resources</h5>
                    <div className={classnames(classes.endPointDetails)}>
                        <table>
                            <thead>
                                <tr>
                                    <th width="25%"> <span>Resource</span> </th>
                                    <th width="75%"> <span>Actions</span></th>
                                </tr>
                            </thead>
                            <tbody>{displayResourceAction(resources)}</tbody>
                        </table>
                    </div>
                </section>}

            </>);
    }

    /*
    Type: Member function
    Params: virtualDataUnitInstances, classes
    Return: Layout 
    */
    const displayResourceAction = (resources) => {
        if (!resources) {
            return ([ "No resoruces available", "-"].map((value, index) => {
                return (<tr key={index}>
                    <td colSpan="2">{value}</td>
                </tr>);
            }));
        }

        return resources.map((resource, index) => {
            let resourceActionDom = "";
            const resourceName = resource.name;
            const resourceId = resource.id;
            const actions = resource.actions;

            resourceActionDom = (
                <tr key={index}>
                    <td>
                        {resourceName}
                    </td>
                    <td>
                        <ul className={classnames(classes.labActionList, classes.resourceActionList)}>
                            {actions.map((action, index) => {
                                const { action_name, action_params, action_help } = action;
                                return (<li key={index}>
                                    <Button
                                        title={action_help}
                                        classes={{ root: classes.button }}
                                        color="primary"
                                        variant="outlined"
                                        onClick={(e) => {
                                            //params, label, help, id;
                                            setParams(params);

                                            setOpenParamsModal(true);
                                            setParams(action_params);
                                            setActionType(ACTION_TYPE.RESOURCE);
                                            setActionName(action_name);
                                            setResourceId(resourceId);
                                            setResourceName(resourceName);
                                        }}> {action_name}</Button>
                                </li>)
                            })}
                        </ul>
                    </td>
                </tr>
            );

            return resourceActionDom;
        });
    }


    /*
        Type: Member function
        Params: lab , panel 
        Return: None
        Functionality: Displays Create lab modal
    */

    const RenderActionParamsModal = () => {
        const labInstance = lab;
        return (
            <CustomDialog
                open={openParamsModal}
                maxWidth="lg"
                classes={classes}
                headerContent={false}
                actions={!params}
                actionLabel="Proceed"
                cancelLabel="Cancel"
                handleAction={(formValues) => {
                    performLabActions(actionType, actionName, lab.id, resourceId, formValues);
                }}
                handleClose={() => setOpenParamsModal(false)}
                className={classes.actionBox}
                content={
                    <Grid
                        container
                        display="flex"
                        direction="row"
                        justify="flex-start"
                    >
                        <Grid item xs={12}
                            className={classes.deleteConfirmationBox}
                        >
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
                            </header>

                            {params && <LabActions
                                params={params}
                                classes={classes}
                                handleAction={(formValues) => {
                                    performLabActions(actionType, actionName, lab.id, resourceId, formValues);
                                }}
                            />}

                            {!params &&
                                <Typography variant="h5" weight="medium">
                                    Are you sure to perform "{actionName}" at
                                    "{actionType} level" on
                                     "{actionType === ACTION_TYPE.LAB ?
                                        getLabInstanceName(labInstance) :
                                        resourceName}" ?
                                </Typography>}

                        </Grid>
                    </Grid>

                }
            />
        );
    };


    return (
        <Grid
            item
            lg={6}
            xs={12}
            className={classnames(classes.labInstanceBlock,
                lab.status ? lab.status.toLowerCase() : 'processing')}
        >
            <Widget
                headerClass={classnames(classes.widgetHeader)}
                header={
                    <>
                        <header className={classes.labWidgetHeader}>
                            <div className={classes.labInstanceHeaderImage} >
                                <img src={lab.lab_template_logo} alt={lab.lab_template_name}
                                    title={lab.lab_template_name} />
                            </div>

                            <div className={classes.labWidgetHeaderText}>
                                <Typography variant="h5">
                                    <HtmlTooltip
                                        title={
                                            <Typography className={classes.heading}>
                                                {LAB_STATUS[lab.status.toUpperCase()]}
                                            </Typography>

                                        }
                                        placement="bottom-start"
                                    >
                                        <i
                                            className={classnames(
                                                classes.myLabHeaderIcon
                                            )}
                                        />
                                    </HtmlTooltip>
                                    {getLabInstanceName(lab)}
                                </Typography>
                                <Typography
                                    className={classes.labBriefDescription}
                                    color="quinary"
                                    theme="main"
                                >
                                    {lab.lab_template_name}
                                    {"@"}
                                    {lab.lab_template_version}
                                </Typography>
                            </div>

                            <div className={classes.labWidgetHeaderDetails}>
                                <List
                                    dense={true}
                                    className={classes.labOptions}
                                >
                                    <ListItem
                                        className={classnames(classes.labOptionsItem)}
                                    >
                                        {getLaunchIcon(lab, true, classes)}
                                    </ListItem>

                                    <ListItem
                                        className={classnames(
                                            classes.labOptionsItem,
                                        )}
                                    >
                                        <HtmlTooltip
                                            title={
                                                <Typography className={classes.heading}>
                                                    Remove lab
                                                </Typography>

                                            }
                                            placement="bottom-start"
                                        >
                                            <button
                                                className={classnames(classes.deleteButton)}
                                                onClick={() => {
                                                    handleClickDeleteModalOpen(lab);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </HtmlTooltip>

                                    </ListItem>
                                </List>
                            </div>
                        </header>
                    </>
                }
                disableWidgetMenu={false}
            >
                <div className={classes.widgetLabInstanceDetail}>
                    <LabSpecs
                        labStats={labSpecs}
                        classes={classes}
                        typography="body1"
                        columnWidth={3}
                    />

                    <Tabs value={currentTab} onChange={handleChange} aria-label="Lab Instance Details ">
                        <Tab label="Services" {...a11yProps(0)} />
                        <Tab label="Actions" {...a11yProps(1)} />
                    </Tabs>

                    <TabPanel value={currentTab} index={0}>
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            justify="flex-start"
                            alignItems="stretch"
                            className={classes.labServicesBlock}
                        >
                            {displayEndPoints(lab, classes, handleClickDeleteModalOpen)}
                        </Grid>
                    </TabPanel>

                    <TabPanel value={currentTab} index={1}>
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            justify="flex-start"
                            alignItems="stretch"
                            className={classes.labActionsBlock}
                        >
                            {displayLabActions(lab)}
                        </Grid>
                    </TabPanel>


                    <RenderActionParamsModal />


                </div>
            </Widget>
        </Grid >
    );
};

LabInstance.propTypes = {
    classes: PropTypes.object.isRequired,
    lab: PropTypes.object.isRequired,
    handleClickDeleteModalOpen: PropTypes.func.isRequired
};

export default connect(null, { performLabActions })(LabInstance);
