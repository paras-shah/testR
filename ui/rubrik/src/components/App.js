import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

//Custom
// Components
import Layout from "./Layout";
// Pages
import Error from "../pages/error";
import Login from "../pages/login";
import EventLogin from "../pages/login/EventLogin";
import MyLabConsole from "../pages/mylabs/MyLabConsole";
//Config
import { PAGE_LANDING_URL, WEBPAGE_URL, LOCAL_STORAGE } from "../apis/config";
import withStyles from "./styles";
import { getUrlParameters } from "../utilities/";
// Actions
import { validateTokenAction, clearNotificationAction } from "../actions";

function App(props) {
    // global
    let isAuthenticated = props.isAuthenticated;

    const validateTokenAction = props.validateTokenAction;
    const clearNotificationAction = props.clearNotificationAction;

    /* On page refresh check if any session in browser */
    if (!isAuthenticated) {
        if (localStorage.getItem(LOCAL_STORAGE.SESSION)){
            validateTokenAction(localStorage.getItem(LOCAL_STORAGE.SESSION));
            isAuthenticated = true;// We have token in local-storage, which we can verify async,till then user wont need to see login page     
        }
    }

    return (
        <HashRouter>
            <Switch>
                <Route
                    exact
                    path="/"
                    render={() => <Redirect to={PAGE_LANDING_URL} />}
                />
                <Route
                    exact
                    path="/app"
                    render={() => <Redirect to="/app/" />}
                />
                <PrivateRoute
                    exact
                    path={WEBPAGE_URL.MY_LAB_DETAILS + "/old/:id"}
                    component={MyLabConsole}
                />
                <PrivateRoute path="/app" component={Layout} />
                <PublicRoute path="/login" component={Login} />
                <PublicRoute path="/eventlogin" component={EventLogin} />
                <Route component={Error} />
            </Switch>
        </HashRouter>
    );

    // #######################################################################

    function PrivateRoute({ component: Component, location, ...rest }) {
        return (
            <Route
                {...rest}
                render={props => {
                    if (isAuthenticated) {
                        // return React.createElement(component, [clearNotification=clearNotification,...props]);
                        return (
                            <Component
                                clearNotificationAction={
                                    clearNotificationAction
                                }
                                {...props}
                            />
                        );
                    } else {
                        localStorage.setItem(
                            LOCAL_STORAGE.REDIRECT_URL,
                            location.pathname
                        );
                        /* Not authenticated */
                        return (
                            <Redirect
                                to={{
                                    pathname: "/login",
                                    state: {
                                        from: props.location
                                    }
                                }}
                            />
                        );
                    }
                }}
            />
        );
    }

    function PublicRoute({ component, ...rest }) {
        return (
            <Route
                {...rest}
                render={props => {
                    if (isAuthenticated) {
                        const redirectURL = localStorage.getItem(
                            LOCAL_STORAGE.REDIRECT_URL
                        );
                        return (
                            <Redirect
                                to={{
                                    pathname: redirectURL ? redirectURL : "/"
                                }}
                            />
                        );
                    } else {
                        const token = getUrlParameters(
                            props.location,
                            "token_url"
                        );
                        if (token) {
                            validateTokenAction(token);
                        } else {
                            return React.createElement(component, props);
                        }
                    }
                }}
            />
        );
    }
}

const mapStateToProps = ({ user }) => {
    const { username, isAuthenticated, errorMessage } = user;
    return { username, isAuthenticated, errorMessage };
};

export default connect(mapStateToProps, {
    validateTokenAction,
    clearNotificationAction
})(withStyles(App));
