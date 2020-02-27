import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import classnames from "classnames";

// Custom
// Styles
import useStyles from "./styles";
// Components
import Header from "../Header";
// import Sidebar from "../Sidebar";
import CustomDialog from "../../components/CustomDialog/CustomDialog";
import GetHelp from "./components/GetHelpForm";

// Pages
import LabTemplates from "../../pages/labtemplates/Labtemplates";
import MyLabs from "../../pages/mylabs/MyLabs";
import MyLabDetails from "../../pages/mylabs/MyLabDetails";
// Copy/config
import history from "../../history";
import { WEBPAGE_URL } from "../../apis/config";

function Layout({ layout, clearNotificationAction, ...props }) {
    const [getHelp, setGetHelp] = React.useState(false);

    var classes = useStyles();
    return (
        <div className={classes.container}>
            <Header
                history={history}
                layout={layout}
                onGetHelpClick={setGetHelp}
                layoutClasses={classes}
                {...props}
            />
            {
                /*
                    <Sidebar />
                */
            }

            <div className={classes.fakeToolbar} />

            <div
                className={classnames(classes.wrapper, classes.wrapperBody, {
                    [classes.contentShift]: false
                })}
            >
                <div
                    className={
                        classnames(classes.contentContainer, classes.contentBody)
                    }
                >
                    <Switch>
                        <Route
                            path={WEBPAGE_URL.LABS}
                            render={props => {
                                return <LabTemplates {...props} />
                            }}
                            exact
                        />
                        <Route
                            path={WEBPAGE_URL.LABS + "/:id"}
                            render={props => {
                                return <LabTemplates {...props} />
                            }}
                            exact
                        />

                        <Route
                            path={WEBPAGE_URL.MY_LABS}
                            render={props => {
                                return <MyLabs {...props} />
                            }}
                            exact
                        />
                        <Route
                            path={WEBPAGE_URL.MY_LABS + "/:id"}
                            render={props => {
                                return <MyLabs {...props} />
                            }}
                            exact
                        />

                        <Route
                            path={WEBPAGE_URL.MY_LAB_DETAILS + "/:id"}
                            component={MyLabDetails}
                            exact
                        />


                        <Route
                            exact
                            path="/app/ui"
                            render={() => <Redirect to="/app/ui/icons" />}
                        />

                    </Switch>
                </div>
            </div>
            <CustomDialog
                open={getHelp}
                maxWidth="md"
                actions={false}
                title={"How can we help you?"}
                handleClose={() => {
                    clearNotificationAction();
                    setGetHelp(false);
                }}
                content={<GetHelp />}
            />
        </div>
    );
}

export default withRouter(Layout);
