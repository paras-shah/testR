import React from "react";
import { Link } from "react-router-dom";

//import classNames from "classnames";

// Material UI
import Menu from "@material-ui/core/Menu";
import PropTypes from "prop-types";

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AccountIcon from "@material-ui/icons/Person";

// Config
import { COPY_HEADER } from "../../copy/common";
import { LOCAL_STORAGE } from "../../apis/config";


export const ProfileMenu = ({ classes, open, anchorElement, setProfileMenu, signOutAction, ...props }) => {
    const email = localStorage.getItem(
        LOCAL_STORAGE.USERNAME
    );
    const username = email? email.split("@"):'';

    return (
        <Menu
            id="profile-menu"
            open={open}
            anchorEl={anchorElement}
            onClose={() => setProfileMenu(null)}
            className={classes.headerMenu}
            classes={{ paper: classes.profileMenu }}
            disableAutoFocusItem
        >
            <ListItem>
                <ListItemAvatar >
                    <Avatar className={classes.avatarIcon}
                    >
                        <AccountIcon
                            classes={{ root: classes.profileIcon }}
                        />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={email} secondary={username[0]} />
            </ListItem>

            <ListItem className={classes.linkItem}>
                <Link onClick={() => signOutAction()} to="#"
                >
                    {COPY_HEADER.SIGN_OUT}
                </Link>
            </ListItem>
        </Menu >
    );
}

ProfileMenu.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    // anchorElement: PropTypes.oneOfType([()=> null, PropTypes.object]).isRequired,
    setProfileMenu: PropTypes.func.isRequired,
    signOutAction: PropTypes.func.isRequired,
};
