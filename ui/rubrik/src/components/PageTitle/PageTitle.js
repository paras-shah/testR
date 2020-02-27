import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classNames from "classnames";

// Material ui
import { Search as SearchIcon } from "@material-ui/icons";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";


//Config
import { PAGE_LANDING_URL, WEBPAGE_URL, LOCAL_STORAGE } from "../../apis/config";

// styles
import useStyles from "./styles";

// components
import { Typography } from "../Wrappers";

export default function PageTitle(props) {
    var classes = useStyles();

    // local
    var [isSearchOpen, setSearchOpen] = React.useState(true);
    const vduId = localStorage.getItem(
        LOCAL_STORAGE.SELECTED_VDU
    );

    const buttonLinkUrl = props.buttonType
        ? props.buttonType === "Dashboard"
            ? PAGE_LANDING_URL
            : props.buttonType === "Labs"
                ? WEBPAGE_URL.LABS + `/${vduId}`
                : props.buttonType === "My Labs"
                    ? WEBPAGE_URL.MY_LABS + `/${vduId}`
                    : PAGE_LANDING_URL
        : "";

    return (
        <div
            className={classNames(classes.pageTitleContainer, props.className)}
        >
            <Typography
                className={classNames(classes.pageTitle, props.className)}
                variant="h1"
                component="h2"
            >
                {props.title}
            </Typography>

            {props.buttonType && (
                <Link to={buttonLinkUrl} onClick={() => {
                    props.emptySearch("")
                }}>
                    <Button
                        classes={{ root: classes.button }}
                        color="primary"
                        variant="outlined"
                    >
                        {props.buttonType}
                    </Button>
                </Link>
            )}

            <div
                className={classNames(classes.search, {
                    [classes.searchFocused]: isSearchOpen
                })}
            >
                <div
                    className={classNames(classes.searchIcon, {
                        [classes.searchIconOpened]: isSearchOpen
                    })}
                    onClick={() => setSearchOpen(!isSearchOpen)}
                >
                    <SearchIcon classes={{ root: classes.headerIcon }} />
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput
                    }}
                />
            </div>
        </div>
    );
}

PageTitle.propTypes = {
    buttonType: PropTypes.string.isRequired
};
