import React from "react";
import classNames from "classnames";
import { Link, matchPath } from "react-router-dom";
import { debounce } from "underscore";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

// Redux
import { connect } from "react-redux";

// Material UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import AccountIcon from "@material-ui/icons/Person";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

// Styles
import withStyles from "./styles";

// Components
import { Typography } from "../Wrappers/Wrappers";
import CustomSelect from "../CustomSelect/CustomSelect";
import { ProfileMenu } from "./HeaderMenu";

// Actions
import {
    selectVirtualDataUnitAction,
    fetchVirtualDataUnitAction,
    signOutAction,
    updateSearchTermAction,
    clearNotificationAction,
    NOTIFICATION_ERROR,
    NOTIFICATION_SUCCESS
} from "../../actions";

// Config
import { WEBPAGE_URL } from "../../apis/config";
import { COPY_SITE, COPY_HEADER } from "../../copy/common";

//Debug
// import { stateComponentTraceUpdate } from "../../utilities/commonDebugFunction";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileMenu: null,
            isSearchOpen: true,
            searchTextValue: props.searchTerm
        };

        // this.onSearchChange = this.onSearchChange.bind(this); No need; just made it arrow
        this.updateSearchTermDebounce = debounce(
            this.props.updateSearchTermAction,
            500
        );
    }

    componentDidMount() {
        /* get VDU on Load */
        let vduID = this.props.match && this.props.match.params ? this.props.match.params.id : null;
        const url = this.props.location.pathname;

        if (!vduID) {
            // to check for page refresh
            const currentPage = (url.indexOf("labtemplates") >= 0) ? "labtemplates"
                : ((url.indexOf("mylabs") >= 0) ? "mylabs" : '');

            const match = matchPath(url, {
                path: `/app/${currentPage}/:id`,
                exact: true,
                strict: false
            });
            if (match)
                vduID = match.params.id;
        }
        this.props.fetchVirtualDataUnitAction(true, vduID, url);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // stateComponentTraceUpdate(this, prevProps, prevState);
        if (
            prevProps.searchTerm &&
            this.props.searchTerm &&
            prevProps.searchTerm !== this.props.searchTerm
        ) {
            this.setState({ ...this.state, searchTextValue: this.props.searchTerm });
        }

        // !"" - gives true, !"a" - gives false
        // So if we had a string but now its blank
        if (!!prevProps.searchTerm && !this.props.searchTerm) {
            this.setState({ ...this.state, searchTextValue: this.props.searchTerm });
        }

        if (prevProps.message !== this.props.message) {
            if (this.props.messageType === NOTIFICATION_ERROR) {
                toast.info(this.props.message , {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            } else if (this.props.messageType === NOTIFICATION_SUCCESS) {
                toast.success(this.props.message , {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
            this.props.clearNotificationAction();
        }



    }

    setProfileMenu(value) {
        this.setState((prevState, props) => {
            return {
                profileMenu: value
            };
        });
    }

    onSearchChange = e => {
        this.setState({ searchTextValue: e.target.value }, () => {
            this.updateSearchTermDebounce(this.state.searchTextValue);
        });
    };

    setSearch = e => {
        this.setState({ searchTextValue: e.target.value }, () => {
            this.updateSearchTermDebounce(this.state.searchTextValue);
        });
    };

    render() {
        /*  const classes = useStyles();
            Used with makeStyles in css as hooks but hooks can be used only in function component
        */

        const { isSearchOpen, profileMenu } = this.state;
        const {
            virtualDataUnits,
            selectedVirtualDataUnit,
            isSidebarOpened,
            classes,
            selectVirtualDataUnitAction,
            signOutAction,
            layoutClasses,
        } = this.props;

        return (
            <AppBar position="fixed" className={classes.appBar}>
                <ToastContainer
                    autoClose={1000}
                    className={classes.toastsContainer}
                    closeOnClick={false}
                    progressClassName={classes.notificationProgress}
                />
                <div className={layoutClasses.wrapper}>
                    <Toolbar
                        className={classNames(
                            layoutClasses.contentContainer,
                            classes.toolbar
                        )}
                    >
                        <Grid
                            container
                            spacing={4}
                            direction="row"
                            justify="flex-start"
                            alignItems="center"
                        >
                            <Grid item xs={12} className={classes.topHeader}>

                                <div className={classes.siteLogo}>
                                    {isSidebarOpened ? (
                                        <ArrowBackIcon
                                            classes={{
                                                root: classNames(
                                                    classes.headerIcon,
                                                    classes.headerIconCollapse
                                                )
                                            }}
                                        />
                                    ) : (
                                            <Link
                                                to="/"
                                                className={classes.noDecoration}
                                            >
                                                <Typography
                                                    variant="h1"
                                                    component="h1"
                                                    className={classes.logotype}
                                                >
                                                    {COPY_SITE.NAME}
                                                </Typography>
                                            </Link>
                                        )}
                                </div>

                                <div
                                    className={classNames(classes.search, {
                                        [classes.searchFocused]: isSearchOpen
                                    })}
                                >
                                    <div
                                        className={classNames(
                                            classes.searchButton
                                        )}
                                        onClick={e => this.setSearch(e)}
                                    >
                                        <SearchIcon
                                            classes={{
                                                root: classes.searchIcon
                                            }}
                                        />
                                    </div>
                                    <InputBase
                                        placeholder={COPY_HEADER.SEARCH}
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.searchInput
                                        }}
                                        value={this.state.searchTextValue}
                                        onChange={this.onSearchChange}
                                    />
                                </div>

                                <div className={classes.vduSelect}>
                                    <CustomSelect
                                        options={virtualDataUnits}
                                        type="headerSelect"
                                        label="Virtual Data Unit"
                                        name="virtualDataUnitSelect"
                                        selected={selectedVirtualDataUnit}
                                        onChange={virtualDataUnitId => {
                                            selectVirtualDataUnitAction(
                                                virtualDataUnitId
                                            );

                                            if (this.props.location.pathname.indexOf(WEBPAGE_URL.LABS) > -1) {
                                                this.props.history.push(`${WEBPAGE_URL.LABS}/${virtualDataUnitId}`);
                                            } else if (this.props.location.pathname.indexOf(WEBPAGE_URL.MY_LABS) > -1) {
                                                this.props.history.push(`${WEBPAGE_URL.MY_LABS}/${virtualDataUnitId}`);
                                            }

                                        }}
                                    />
                                </div>

                                {false &&
                                    <CustomSelect
                                        className={classes.headerDropDown}
                                        disabled={true}
                                        displayEmpty={true}
                                        label=""
                                        name="myView"
                                        native={false}
                                        options={[{ id: "-", name: "My View" }]}
                                        renderValue={() => {
                                            return "My View";
                                        }}
                                        type="headerSelect"
                                    />
                                }



                                {/* User Profile */}
                                <div className={classes.userOption}>
                                    <span aria-haspopup="true"
                                        color="inherit"
                                        className={classNames(classes.helpIcon, 'disabled')}
                                        aria-controls={COPY_HEADER.GET_HELP}
                                    //  onClick={() => this.props.onGetHelpClick(true)}
                                    >
                                    </span>


                                    <IconButton
                                        aria-haspopup="true"
                                        color="inherit"
                                        className={classes.headerMenuButton}
                                        aria-controls="profile-menu"
                                        onClick={e =>
                                            this.setProfileMenu(e.currentTarget)
                                        }

                                    >
                                        <AccountIcon
                                            classes={{ root: classes.headerIcon }}
                                        />
                                    </IconButton>

                                    <ProfileMenu
                                        classes={classes}
                                        open={Boolean(profileMenu)}
                                        anchorElement={profileMenu}
                                        setProfileMenu={() => this.setProfileMenu(null)}
                                        signOutAction={() =>
                                            signOutAction(
                                                this.props.history
                                            )
                                        }
                                    />
                                </div>

                                {/*<div className={classes.grow}></div>*/}


                            </Grid>
                        </Grid>
                    </Toolbar>
                </div >
            </AppBar >
        );
    }
}

const mapStatTopProps = ({ user, virtualLocations, layout, notification }) => {
    const { virtualDataUnits, selectedVirtualDataUnit } = virtualLocations;
    const { isSidebarOpened, searchTerm } = layout;
    const { isAuthenticated } = user;
    const { message, messageType } = notification;

    return {
        virtualDataUnits,
        selectedVirtualDataUnit,
        isSidebarOpened,
        isAuthenticated,
        searchTerm,
        message,
        messageType
    };
};

export default connect(mapStatTopProps, {
    selectVirtualDataUnitAction,
    fetchVirtualDataUnitAction,
    signOutAction,
    updateSearchTermAction,
    clearNotificationAction
})(withStyles(Header));
