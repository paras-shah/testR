import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { withStyles } from "@material-ui/styles";

// SVG
import leastTimeSvg from "../../images/icons/clock.svg";
import mostDeployedSvg from "../../images/icons/run-time.svg";
import highestRunTimeSvg from "../../images/icons/clock-2.svg";

//  Custom
// Copy
import { COPY_BADGE } from "../../copy/common";

const LabBadge = props => {
    const { classes, badgeType } = props;

    return (
        <p className={classnames(classes.labBadge, badgeType, "smallText")}>
            {COPY_BADGE[badgeType]}
        </p>
    );
};

LabBadge.propTypes = {
    classes: PropTypes.object.isRequired,
    badgeType: PropTypes.string.isRequired,
};

export default withStyles(theme => ({
    labBadge: {
        "&:before": {
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            content: "''",
            display: "inline-block",
            width: theme.spacing(1.5),
            height: theme.spacing(1.625),
            marginRight: theme.spacing(0.5),
            position: "absolute",
            left: theme.spacing(0.5),
            top: theme.spacing(0.5)
        },

        "&.leastCreationTime:before": {
            backgroundImage: `url(${leastTimeSvg})`
        },
        "&.mostDeployed:before": {
            backgroundImage: `url(${mostDeployedSvg})`,
            width: theme.spacing(1.875)
        },
        "&.highestRunTime:before": {
            backgroundImage: `url(${highestRunTimeSvg})`,
            width: theme.spacing(1.75)
        },

        position: "relative",
        margin: 0,
        marginBottom: theme.spacing(1.5),
        width: theme.spacing(15),
        backgroundColor: theme.palette.background.grey_light,
        color: theme.palette.primary.main,
        borderRadius: theme.spacing(0.4),
        paddingLeft: theme.spacing(3),
        "&.smallText": {
            lineHeight: `${theme.spacing(2.5)}px`,
            display: "inline-block",
            marginRight: "10px"
        }
    },
}))(LabBadge);