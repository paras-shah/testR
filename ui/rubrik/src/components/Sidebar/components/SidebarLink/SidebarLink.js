import React, { useState } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import {
    Collapse,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from "@material-ui/core";
import "font-awesome/css/font-awesome.min.css";
import { Inbox as InboxIcon } from "@material-ui/icons";

// Custom
// Styles
import useStyles from "./styles";
// Components
import Dot from "../Dot";
import {HtmlTooltip} from "../../../Widget/Widget";

export default function SidebarLink({
    link,
    icon,
    label,
    children,
    location,
    isSidebarOpened,
    nested,
    type,
    title,
    fontIcon
}) {
    var classes = useStyles();

    // local
    var [isOpen, setIsOpen] = useState(false);
    var isLinkActive =
        link &&
        (location.pathname === link || location.pathname.indexOf(link) !== -1);

    if (type === "title")
        return (
            <Typography
                className={classnames(classes.linkText, classes.sectionTitle, {
                    [classes.linkTextHidden]: !isSidebarOpened
                })}
            >
                {label}
            </Typography>
        );

    if (type === "divider") return <Divider className={classes.divider} />;

    if (!children)
        return (
            
                <ListItem
                    button
                    component={link && Link}
                    to={link}
                    className={classes.link}
                    classes={{
                        root: classnames(classes.linkRoot, {
                            [classes.linkActive]: isLinkActive && !nested,
                            [classes.linkNested]: nested
                        })
                    }}
                    disableRipple
                >
                    <HtmlTooltip
                title={
                    <React.Fragment>
                        <Typography className={classes.heading}>
                            {title}
                        </Typography>
                    </React.Fragment>
                }
                placement="bottom-start"
            >
                {fontIcon ? (
                        <ListItemIcon
                            className={classnames(
                                `${icon} ${classes.customLinkIcon}`,
                                {
                                    [classes.linkIconActive]: isLinkActive
                                }
                            )}
                        >
                            <span> </span>
                        </ListItemIcon>
                    ) : (
                        <ListItemIcon
                            className={classnames(classes.linkIcon, {
                                [classes.linkIconActive]: isLinkActive
                            })}
                        >
                            {nested ? (
                                <Dot color={isLinkActive && "primary"} />
                            ) : (
                                icon
                            )}
                        </ListItemIcon>
                    )}
            </HtmlTooltip>
                
                    <ListItemText
                        classes={{
                            primary: classnames(classes.linkText, {
                                [classes.linkTextActive]: isLinkActive,
                                [classes.linkTextHidden]: !isSidebarOpened
                            })
                        }}
                        primary={label}
                    />
                </ListItem>
          
        );

    return (
        <>
            <ListItem
                button
                component={link && Link}
                onClick={toggleCollapse}
                className={classes.link}
                to={link}
                disableRipple
            >
                <ListItemIcon
                    className={classnames(classes.linkIcon, {
                        [classes.linkIconActive]: isLinkActive
                    })}
                >
                    {icon ? icon : <InboxIcon />}
                </ListItemIcon>
                <ListItemText
                    classes={{
                        primary: classnames(classes.linkText, {
                            [classes.linkTextActive]: isLinkActive,
                            [classes.linkTextHidden]: !isSidebarOpened
                        })
                    }}
                    primary={label}
                />
            </ListItem>
            {children && (
                <Collapse
                    in={isOpen && isSidebarOpened}
                    timeout="auto"
                    unmountOnExit
                    className={classes.nestedList}
                >
                    <List component="div" disablePadding>
                        {children.map(childrenLink => (
                            <li key={childrenLink && childrenLink.link}
                            >
                            <SidebarLink
                                location={location}
                                isSidebarOpened={isSidebarOpened}
                                classes={classes}
                                nested
                                {...childrenLink}
                            />
                            </li>
                        ))}
                    </List>
                </Collapse>
            )}
        </>
    );

    // ###########################################################

    function toggleCollapse(e) {
        if (isSidebarOpened) {
            e.preventDefault();
            setIsOpen(!isOpen);
        }
    }
}
