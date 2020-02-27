import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// Redux
import { connect } from "react-redux";

// Material UI
import { useTheme } from "@material-ui/styles";
import { Drawer, IconButton, List } from "@material-ui/core";
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";
// icons sets
import "font-awesome/css/font-awesome.min.css";

// Custom
// Styles
import useStyles from "./styles";
// Components
import SidebarLink from "./components/SidebarLink/SidebarLink";
// Actions
import { toggleSidebarAction } from "../../actions";

// Copy/config
import {
    WEBPAGE_URL,
    WEBPAGE_LABEL,
    WEBPAGE_HINT,
    FONT_AWESOME
} from "../../apis/config";

const structure = [
    /* {
        id: 0,
        fontIcon: false,
        title: WEBPAGE_HINT.LABS,
        link: WEBPAGE_URL.LABS,
        label: WEBPAGE_LABEL.LABS,
        icon: <AppsIcon />
    }, */
    {
        id: 0,
        fontIcon: true,
        title: WEBPAGE_HINT.LABS,
        link: WEBPAGE_URL.LABS,
        label: WEBPAGE_LABEL.LABS,
        icon: FONT_AWESOME.LAB
    },
    {
        id: 1,
        fontIcon: true,
        title: WEBPAGE_HINT.MY_LABS,
        link: WEBPAGE_URL.MY_LABS,
        label: WEBPAGE_LABEL.MY_LABS,
        icon: FONT_AWESOME.MY_LAB
    }
];

function Sidebar({ isSidebarOpened, toggleSidebarAction, location, ...props }) {
    var classes = useStyles();
    var theme = useTheme();

    // local
    var [isPermanent, setPermanent] = useState(true);

    useEffect(function() {
        window.addEventListener("resize", handleWindowWidthChange);
        handleWindowWidthChange();
        return function cleanup() {
            window.removeEventListener("resize", handleWindowWidthChange);
        };
    });

    return (
        <Drawer
            variant={isPermanent ? "permanent" : "temporary"}
            className={classNames(classes.drawer, 
                classes.hide,
                {
                [classes.drawerOpen]: isSidebarOpened,
                [classes.drawerClose]: !isSidebarOpened
            })}
            classes={{
                paper: classNames({
                    [classes.drawerOpen]: isSidebarOpened,
                    [classes.drawerClose]: !isSidebarOpened
                })
            }}
            open={isSidebarOpened}
        >
            <div className={classes.toolbar} />
            <div className={classes.mobileBackButton}>
                <IconButton
                    onClick={() => toggleSidebarAction(isSidebarOpened)}
                >
                    <ArrowBackIcon
                        classes={{
                            root: classNames(
                                classes.headerIcon,
                                classes.headerIconCollapse
                            )
                        }}
                    />
                </IconButton>
            </div>
            <List className={classes.sidebarList}>
                {structure.map(link => (
                    <SidebarLink
                        key={link.id}
                        location={location}
                        isSidebarOpened={isSidebarOpened}
                        {...link}
                    />
                ))}
            </List>
        </Drawer>
    );

    // ##################################################################
    function handleWindowWidthChange() {
        var windowWidth = window.innerWidth;
        var breakpointWidth = theme.breakpoints.values.md;
        var isSmallScreen = windowWidth < breakpointWidth;

        if (isSmallScreen && isPermanent) {
            setPermanent(false);
        } else if (!isSmallScreen && !isPermanent) {
            setPermanent(true);
        }
    }
}

const mapStateToProps = ({layout}) => {
    const {isSidebarOpened} = layout;
    return { isSidebarOpened};
};

export default connect(mapStateToProps, { toggleSidebarAction })(
    withRouter(Sidebar)
);
