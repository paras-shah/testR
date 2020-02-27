import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";
// Material UI
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";

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
// Config
import { REGEX } from "../../apis/config";

// Actions
import {
    signInAction,
    magicLinkAction,
    resetAuthErrorMessageAction
} from "../../actions";

function Login({ errorMessage, ...props }) {
    var classes = useStyles();

    // local
    var [isLoading, setIsLoading] = useState(false);
    var [loginValue, setLoginValue] = useState("");
    var [passwordValue, setPasswordValue] = useState("");
    var [emailValue, setEmailValue] = useState("");
    var [isMagicLinkLoading, setIsMagicLinkLoading] = useState(false);
    var [activeTabId, setActiveTabId] = useState(true);
    var [showPassword, setShowPassword] = useState(false);

    const error = errorMessage ? true : false;

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

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

                                {!activeTabId && (
                                    <form>
                                        <TextField
                                            type="text"
                                            label="Username"
                                            margin="normal"
                                            fullWidth
                                            variant="outlined"
                                            id="username"
                                            value={loginValue}
                                            onChange={e => {
                                                setIsLoading(false);
                                                setLoginValue(e.target.value);
                                            }}
                                            placeholder={COPY_LOGIN.USERNAME}
                                        />

                                        <FormControl
                                            className={classnames(
                                                "MuiTextField-root",
                                                "lastTextField"
                                            )}
                                            variant="outlined"
                                        >
                                            <InputLabel htmlFor="password">
                                                Password
                                            </InputLabel>
                                            <OutlinedInput
                                                id="password"
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                value={passwordValue}
                                                onChange={e => {
                                                    setIsLoading(false);
                                                    setPasswordValue(
                                                        e.target.value
                                                    );
                                                }}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={
                                                                handleClickShowPassword
                                                            }
                                                            onMouseDown={
                                                                handleMouseDownPassword
                                                            }
                                                            edge="end"
                                                        >
                                                            {showPassword ? (
                                                                <Visibility />
                                                            ) : (
                                                                    <VisibilityOff />
                                                                )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                labelWidth={90}
                                            />
                                        </FormControl>

                                        <Link
                                            to="#forgotPassword"
                                            onClick={e => {
                                                e.preventDefault();
                                                setActiveTabId(true);
                                            }}
                                            className={classes.linkText}
                                        >
                                            Forgot Password?
                                        </Link>

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
                                                            loginValue.length ===
                                                            0 ||
                                                            passwordValue.length ===
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
                                                            props.signInAction(
                                                                loginValue,
                                                                passwordValue
                                                            );
                                                        }}
                                                        variant="contained"
                                                        color="primary"
                                                        size="large"
                                                    >
                                                        {COPY_LOGIN.NAME}
                                                    </Button>
                                                )}
                                        </div>
                                    </form>
                                )}

                                {/*<div className={classes.formDividerContainer}>
                                    <div className={classes.formDivider} />
                                    <Typography
                                        className={classes.formDividerWord}
                                    >
                                        or
                                    </Typography>
                                    <div className={classes.formDivider} />
                                </div>
                                */}

                                {activeTabId && (
                                    <form>
                                        <TextField
                                            type="text"
                                            label="Email"
                                            margin="normal"
                                            fullWidth
                                            variant="outlined"
                                            className={classnames(
                                                "lastTextField"
                                            )}
                                            id="email"
                                            value={emailValue}
                                            onChange={e => {
                                                setEmailValue(e.target.value);
                                                setIsMagicLinkLoading(false);
                                            }}
                                            placeholder={COPY_LOGIN.EMAIL}
                                        />

                                        <Link to="#username"
                                            onClick={e => {
                                                setActiveTabId(false);
                                            }}
                                            className={classes.linkText}
                                        >
                                            Try Username / Password?
                                        </Link>

                                        <div className={classes.formButtons}>
                                            {isMagicLinkLoading ? (
                                                <CircularProgress
                                                    size={26}
                                                    className={
                                                        classes.loginLoader
                                                    }
                                                />
                                            ) : (
                                                    <Button
                                                        type="submit"
                                                        classes={{
                                                            root:
                                                                classes.muiLoginButton
                                                        }}
                                                        disabled={
                                                            emailValue.length ===
                                                            0 ||
                                                            !REGEX.EMAIL.test(
                                                                emailValue
                                                            )
                                                        }
                                                        onClick={event => {
                                                            event.preventDefault();
                                                            setIsMagicLinkLoading(
                                                                true
                                                            );
                                                            props.resetAuthErrorMessageAction();
                                                            props.magicLinkAction(
                                                                emailValue
                                                            );
                                                        }}
                                                        variant="contained"
                                                        color="primary"
                                                        size="large"
                                                    >
                                                        {COPY_LOGIN.SEND_MAGIC_LINK}
                                                    </Button>
                                                )}
                                        </div>
                                    </form>
                                )}
                            </React.Fragment>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

const mapStateToProps = ({ user }) => {
    const { username, isAuthenticated, errorMessage } = user;
    return { username, isAuthenticated, errorMessage };
};

export default connect(mapStateToProps, {
    signInAction,
    magicLinkAction,
    resetAuthErrorMessageAction
})(withRouter(Login));
