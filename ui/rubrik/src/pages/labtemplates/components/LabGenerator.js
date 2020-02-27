import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import ReactMarkdown from "react-markdown";
// Material UI
import { Grid } from "@material-ui/core";

// Custom
// Copy
import { COPY_FORM, COPY_LAB_TEMPLATE } from "../../../copy/common";
import { Typography } from "../../../components/Wrappers/Wrappers";
import CustomSelect from "../../../components/CustomSelect/CustomSelect";
import LabSpecs from "./LabSpecs";
import { CustomExpansionPanel } from "../../../utilities";

import CreateLabForm from "./CreateLabForm";
// Styles
import withStyles from "./styles";

/* 
  Component -  LabGenerator
  Type: Functional Component 
*/
class LabGenerator extends React.Component {
    constructor(props) {
        super(props);
        const lab = props.lab;
        this.state = {
            versionDetails: this.getVersionIDs(
                lab.versions
            ) /* To get version drop-downs */,
            versionSelected: lab.versions[0].id /* selected version on lab */,
            labVersionDetails: lab.versions[0]
            /* selected version details - should point to latest when dialog appears */
        };
    }

    getVersionIDs = versions => {
        const labVersionIDs = versions.map(version => {
            return { id: version.id, name: version.version };
        });
        labVersionIDs.unshift({ id: "", name: COPY_FORM.SELECT_VERSION });
        return labVersionIDs;
    };

    getVersionDetails = (versions, id) => {
        const labVersionDetails = versions.filter(version => {
            return version.id === id;
        });
        return labVersionDetails[0];
    };

    render() {
        const { classes, lab } = this.props;

        const {
            versionDetails,
            versionSelected,
            labVersionDetails
        } = this.state;
        return (
            <>
                <Grid
                    container
                    display="flex"
                    direction="row"
                    justify="flex-start"
                >
                    <Grid item xs={12}>
                        <Grid container direction="row" justify="flex-start">
                            <Grid
                                item
                                xs={9}
                                className={classnames(
                                    classes.createLabHeader,
                                    "createLab"
                                )}
                            >
                                <div className={classes.createLabWidgetHeaderImage} >
                                    <img src={labVersionDetails.logo} alt={lab.name}
                                        title={lab.name} />
                                </div>

                                <div className={classes.createLabHeaderText}>
                                    <Typography variant="h2">
                                        {lab.name}
                                    </Typography>

                                    {labVersionDetails.description &&
                                        labVersionDetails.description.short && (
                                            <Typography
                                                variant="h3"
                                                color="text"
                                                brightness="main"
                                                gutterBottom
                                            >
                                                {
                                                    labVersionDetails
                                                        .description.short
                                                }
                                            </Typography>
                                        )}
                                </div>
                            </Grid>

                            <Grid item xs={3}>
                                <CustomSelect
                                    options={versionDetails}
                                    label=""
                                    name="version"
                                    selected={versionSelected}
                                    className={"lightTheme"}
                                    onChange={version_id => {
                                        const labVersionDetails = this.getVersionDetails(
                                            lab.versions,
                                            version_id
                                        );
                                        this.setState({
                                            labVersionDetails,
                                            versionSelected: version_id
                                        });
                                    }}
                                    type="pageSelect"
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <LabSpecs
                                labStats={labVersionDetails.lab_stats}
                                classes={classes}
                                typography="h5"
                            />
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            className={classes.labGeneratorDescription}
                        >
                            <CustomExpansionPanel
                                heading={COPY_LAB_TEMPLATE.DETAILED_DESCRIPTION}
                                subHeading=""
                                panel="panel1"
                                classes={classes}
                                headingClass={true}
                                resetPanel={this.props.resetPanel}
                                expandedDefault={
                                    this.props.expanded === "panel1"
                                        ? true
                                        : false
                                }
                            >
                                <ReactMarkdown
                                    source={
                                        this.state.labVersionDetails.description
                                            .long
                                    }
                                    escapeHtml={true}
                                />
                            </CustomExpansionPanel>

                            <CustomExpansionPanel
                                heading={COPY_LAB_TEMPLATE.CONFIG_OPTIONS}
                                subHeading=""
                                panel="panel2"
                                classes={classes}
                                className={classes.configurationPanel}
                                resetPanel={this.props.resetPanel}
                                expandedDefault={
                                    this.props.expanded === "panel2"
                                        ? true
                                        : false
                                }
                                keepExpanded={true}
                            >
                                <CreateLabForm
                                    classes={classes}
                                    labVersionDetails={labVersionDetails}
                                    versionSelected={versionSelected}
                                />
                            </CustomExpansionPanel>
                        </Grid>
                    </Grid>
                </Grid>
            </>
        );
    }
}

LabGenerator.propTypes = {
    lab: PropTypes.oneOfType([() => null, PropTypes.object]).isRequired,
    classes: PropTypes.object.isRequired,
    expanded: PropTypes.string.isRequired
};

export default withStyles(LabGenerator);
