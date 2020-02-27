import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";

// Material UI
import {
    Grid,
    CircularProgress,
    Typography,
    Button,
    TextField,
    Fade
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

// Custom
// Styles
import useStyles from "./styles";
// Logo
import rubrikLogo from "../../images/Rubrik-Snowflake-small.png";
// Copy
import { COPY_SITE, COPY_LOGIN } from "../../copy/common";

// Actions
import {
    signUpAction,
    resetAuthErrorMessageAction
} from "../../actions";

function EventLogin({ errorMessage, ...props }) {
    var classes = useStyles();

    // local
    var [isLoading, setIsLoading] = useState(false);
    var [emailValue, setEmailValue] = useState("");
    var [eventCode, setEventCode] = useState("");

    const error = errorMessage ? true : false;

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <Grid container className={classes.loginContainer} spacing={3}>
                    <Grid item xs={12} md={4} className={classes.logotypeContainer}>
                        <Grid
                            container
                            spacing={4}
                            direction="row"
                            justify="space-around"
                            alignItems="center"
                            className={classes.logoBlock}
                        >
                            <Grid item xs={12} className={classes.logoLeft}>
                                <Link to="/" >
                                    <img
                                        src={rubrikLogo}
                                        alt={COPY_SITE.NAME}
                                        crossOrigin="Anonymous"
                                        className={classes.logotypeImage}

                                    />
                                </Link>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                className={classes.logoCopyRight}
                            >
                                <Link to="/" >
                                    <p className={classes.welcomeText}>
                                        {COPY_LOGIN.WELCOME_TO}
                                    </p>
                                    <p className={classes.logotypeText}>
                                        {COPY_SITE.NAME}
                                    </p>
                                    <p className={classes.logotypeText}>
                                    {COPY_SITE.EVENTS}
                                    </p>
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4} className={classes.formContainer}>
                        <div className={classes.formBlock}>
                            <React.Fragment>
                                <Fade in={error}>
                                    <Typography
                                        color="error"
                                        className={classes.errorMessage}
                                    >
                                        {errorMessage}
                                    </Typography>
                                </Fade>

                                <form>
                                    <TextField
                                        type="text"
                                        label="Email"
                                        margin="normal"
                                        fullWidth
                                        variant="outlined"
                                        id="email"
                                        value={emailValue}
                                        onChange={e => {
                                            setEmailValue(e.target.value);
                                            setIsLoading(false);
                                        }}
                                        placeholder={COPY_LOGIN.EMAIL}
                                    />

                                    <TextField
                                        type="text"
                                        label="Event Code"
                                        margin="normal"
                                        fullWidth
                                        variant="outlined"
                                        className={classnames(
                                            "lastTextField"
                                        )}
                                        id="eventCode"
                                        value={eventCode}
                                        onChange={e => {
                                            setEventCode(e.target.value);
                                            setIsLoading(false);
                                        }}
                                        placeholder={COPY_LOGIN.EVENT_CODE}
                                    />

                                    <div className={classes.formButtons}>
                                        {isLoading ? (
                                            <CircularProgress
                                                size={26}
                                                className={
                                                    classes.loginLoader
                                                }
                                            />
                                        ) : (
                                                <Button
                                                    type="submit"
                                                    disabled={
                                                        emailValue.length ===
                                                        0 ||
                                                        eventCode.length ===
                                                        0
                                                    }
                                                    classes={{
                                                        root:
                                                            classes.muiLoginButton
                                                    }}
                                                    onClick={event => {
                                                        event.preventDefault();
                                                        setIsLoading(true);
                                                        props.resetAuthErrorMessageAction();
                                                        props.signUpAction(
                                                            emailValue,
                                                            eventCode
                                                        );
                                                    }}
                                                    variant="contained"
                                                    color="primary"
                                                    size="large"
                                                >
                                                    {COPY_LOGIN.SIGN_UP}
                                                </Button>
                                            )}
                                    </div>
                                </form>
                                
                               </React.Fragment>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

const mapStateToProps = ({ user }) => {
    const { errorMessage } = user;
    return { errorMessage };
};

export default connect(mapStateToProps, {
    signUpAction,
    resetAuthErrorMessageAction
})(withRouter(EventLogin));
