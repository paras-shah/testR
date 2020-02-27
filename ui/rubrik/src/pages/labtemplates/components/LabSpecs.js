import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// components
import Grid from "@material-ui/core/Grid";

import { Typography } from "../../../components/Wrappers/Wrappers";

//copy
import { COPY_SPECS } from "../../../copy/common";

/* 
  Function : renderLabInfoItem
*/
export function renderLabSpecItem(type, value, classes, typography, columnWidth = 3) {
    return (
        <Grid key={type} item xs={2*columnWidth} sm={columnWidth} className={classnames(classes.labItem)}>
            <div
                className={classnames(classes.labItemImage, type.toLowerCase())}
                aria-label={type}
            ></div>
            <Typography
                color="tertiary"
                colorBrightness="main"
                className={classnames(
                    classes.labVersionItemValue,
                )}
                variant={typography}
            >
                {value}
            </Typography>
            <Typography
                color="quaternary"
                colorBrightness="main"
                className={classnames(classes.labVersionItemType)}
                variant={typography}
            >
                {type}
            </Typography>
        </Grid>
    );
}

/* 
  Component : RenderLab
  Type: Functional Component 
*/
const LabSpecs = ({ labStats, classes, typography, columnWidth = 3 }) => {
    let labInfoKeys = Object.keys(labStats),
        labInfoValues = Object.values(labStats);
    return (
        <>
            <Grid
                container
                spacing={0}
                direction="row"
                justify="space-between"
                alignItems="stretch"
                className={classes.labDetailBlock}
            >
                {labStats &&
                    labInfoKeys.map((key, index) => {
                        return renderLabSpecItem(
                            COPY_SPECS[key],
                            labInfoValues[index],
                            classes,
                            typography, 
                            columnWidth
                        );
                    })}
            </Grid>
        </>
    );
};

LabSpecs.propTypes = {
    labStats: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

export default LabSpecs;