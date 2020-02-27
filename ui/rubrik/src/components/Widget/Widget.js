import React, { useState } from "react";
import { Link } from "react-router-dom";

import classnames from "classnames";
import {
    Paper,
    IconButton,
    Menu,
    MenuItem,
    Typography
} from "@material-ui/core";
import { MoreVert as MoreIcon } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";

// styles
import { useStyles, ToolTipStyle } from "./styles";

/* 
  Component - HtmlTooltip
  Type: Function Component 
*/
export const HtmlTooltip = ToolTipStyle(Tooltip);

/* 
  Component - Widget
  Type: Function Component 
*/
export default function Widget({
    children,
    title,
    noBodyPadding,
    headerClass,
    bodyClass,
    disableWidgetMenu,
    header,
    widgetMainHeadingClass,
    widgetAppIconClass,
    moreLink,
    ...props
}) {
    var classes = useStyles();

    // local
    var [moreButtonRef, setMoreButtonRef] = useState(null);
    var [isMoreMenuOpen, setMoreMenuOpen] = useState(false);

    return (
        <div className={classnames(classes.widgetWrapper, props.className)}>
            <Paper
                className={classes.paper}
                classes={{ root: classes.widgetRoot }}
            >
                <div className={headerClass}>
                    {header ? (
                        header
                    ) : (
                        <React.Fragment>
                            <Typography
                                variant="h5"
                                color="textSecondary"
                                className={classnames(widgetMainHeadingClass)}
                            >
                                {props.HeaderIcon && (
                                    <props.HeaderIcon
                                        className={classnames(
                                            widgetAppIconClass
                                        )}
                                    />
                                )}
                                {props.headerIconUsingClasses && (
                                    <i
                                        className={classnames(
                                            props.headerIconUsingClasses
                                        )}
                                    />
                                )}
                                {title}
                            </Typography>

                            {disableWidgetMenu && (
                                <IconButton
                                    color="primary"
                                    classes={{ root: classes.moreButton }}
                                    aria-owns="widget-menu"
                                    aria-haspopup="true"
                                    onClick={() => setMoreMenuOpen(true)}
                                    buttonRef={setMoreButtonRef}
                                >
                                    <MoreIcon />
                                </IconButton>
                            )}
                        </React.Fragment>
                    )}
                </div>
                <div
                    className={classnames(classes.widgetBody, {
                        [classes.noPadding]: noBodyPadding,
                        [bodyClass]: bodyClass
                    })}
                >
                    {children}
                </div>
            </Paper>
            <Menu
                id="widget-menu"
                open={isMoreMenuOpen}
                anchorEl={moreButtonRef}
                onClose={() => setMoreMenuOpen(false)}
                disableAutoFocusItem
            >
                {moreLink &&
                    moreLink.map((link, id) => {
                        const { url, type, text } = link;
                        if (type === "Link")
                            return (
                                <MenuItem key={id}>
                                    <Link to={url} className={classnames(classes.widgetLink)}>{text}</Link>
                                </MenuItem>
                            );
                        else 
                            return null; 
                    })}
            </Menu>
        </div>
    );
}