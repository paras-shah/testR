import React, { useState, useEffect } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { Typography } from "../../components/Wrappers/Wrappers";

/* 
  Component -  CustomExpansionPanel
  Type: Functional Component 
*/
const CustomExpansionPanel = ({
    panel,
    heading,
    subHeading,
    classes,
    children,
    expandedDefault,
    keepExpanded,
    headingClass,
    ...props
}) => {
    if (keepExpanded) expandedDefault = true;

    const [expanded, setExpanded] = useState(expandedDefault);

    useEffect(() => {
        setExpanded(expandedDefault);
    }, [expandedDefault]);

    const handleChange = event => {
        if (keepExpanded) {
            setExpanded(keepExpanded);
        } else {
            setExpanded(!expanded);
            props.resetPanel();
        }
    };

    const expandIcon = !keepExpanded ? <ExpandMoreIcon color="primary" /> : "";

    return (
        <ExpansionPanel
            className={classnames(classes.expansionPanel)}
            expanded={expanded}
            onChange={event => handleChange(event)}
        >
            <ExpansionPanelSummary
                expandIcon={expandIcon}
                aria-controls={panel + "bh-content"}
                id={panel + "bh-header"}
                className={headingClass?classes.expansionHeading:''}
            >
                <Typography variant="h5" className={classes.heading}>{heading}</Typography>
                <Typography className={classes.secondaryHeading}>
                    {subHeading}
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.detailedDescription}>
                {children}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

CustomExpansionPanel.propTypes = {
    panel: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired,
    expandedDefault: PropTypes.bool
};

CustomExpansionPanel.defaultProps = {
    expandedDefault: false
};

export default CustomExpansionPanel;