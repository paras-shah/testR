import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";

// Material UI
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// SVG
import viewDetailSvg from "../../../images/icons/calendar-add.svg";

//  Custom
// Copy
import { COPY_COMMON, COPY_LAB_TEMPLATE } from "../../../copy/common";

//Component
import Widget from "../../../components/Widget/Widget";
import LabSpecs from "./LabSpecs";
import { Typography } from "../../../components/Wrappers/Wrappers";
import { LabBadge } from "../../../utilities";

const Lab = props => {
    const { classes, lab } = props;
    const latestVersion = lab.versions[0];
    const badgeType = false; // "leastCreationTime", "mostDeployed",  "highestRunTime"

    return (
        <Grid
            item
            lg={4}
            md={6}
            xs={12}
            key={latestVersion.id}
            className={classnames(classes.labBlock, {
                [classes.bookmark]: true
            })}
        >
            <Widget
                headerClass={classes.widgetHeader}
                header={
                    <>
                        {badgeType && (
                            <div>
                                <LabBadge badgeType={badgeType} />
                            </div>
                        )}

                        <header className={classes.labWidgetHeader}>

                            <div className={classes.labWidgetHeaderImage} >
                                <img src={latestVersion.logo} alt={lab.name}
                                    title={lab.name} />
                            </div>

                            <div className={classes.labWidgetHeaderText}>
                                <Typography variant="h5">{lab.name}</Typography>
                                {latestVersion.description &&
                                    latestVersion.description.short && (
                                        <Typography
                                            color="quinary"
                                            theme="main"
                                            className={
                                                classes.labBriefDescription
                                            }
                                        >
                                            {latestVersion.description.short}{" "}
                                        </Typography>
                                    )}
                            </div>

                            {badgeType &&
                                <List
                                    dense={true}
                                    className={classes.labWidgetHeaderDetails}
                                >
                                    <ListItem>
                                        <Typography
                                            color="quinary"
                                            theme="main"
                                            className={classes.labBriefDescription}
                                        >
                                            Creation
                                        <span className={classes.textSecondary}>-</span>
                                        </Typography>
                                    </ListItem>
                                    <ListItem>
                                        <Typography
                                            color="quinary"
                                            theme="main"
                                            className={classes.labBriefDescription}
                                        >
                                            Runtime
                                        <span className={classes.textSecondary}>-</span>
                                        </Typography>
                                    </ListItem>
                                </List>}
                        </header>
                    </>
                }
                disableWidgetMenu={false}
            >
                <LabSpecs
                    labStats={latestVersion.lab_stats}
                    classes={classes}
                    typography="body1"
                />
            </Widget>

            <div className="labHoverSection">
                <Link
                    to="/"
                    className={classes.labDetailLink}
                    title={COPY_LAB_TEMPLATE.LAB_PLAY_TITLE}
                    onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        props.handleClickOpen(lab, "panel1");
                    }}
                >
                    <img
                        src={viewDetailSvg}
                        alt={COPY_LAB_TEMPLATE.LAB_DETAIL}
                        title={COPY_LAB_TEMPLATE.LAB_DETAIL}
                    />
                    {COPY_LAB_TEMPLATE.LAB_DETAIL}
                </Link>

                <Button
                    classes={{
                        root: classes.createLabButton
                    }}
                    onClick={() => {
                        props.handleClickOpen(lab, "panel2");
                    }}
                    variant="contained"
                    color="primary"
                    size="large"
                >
                    {COPY_COMMON.CREATE_LAB}
                </Button>
            </div>
        </Grid>
    );
};

Lab.propTypes = {
    classes: PropTypes.object.isRequired,
    lab: PropTypes.object.isRequired,
    handleClickOpen: PropTypes.func.isRequired
};

export default Lab;
