import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Material UI
import { CircularProgress, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// styles
import withStyles from "./styles";

// Redux
import { connect } from "react-redux";
import { Formik, Form } from "formik";
// import * as Yup from "yup";

//  Custom
// Action
import {
    getHelpAction,
    MODULE_GET_HELP,
    NOTIFICATION_SUCCESS
} from "../../../actions";
// Copy

const GetHelpForm = props => {
    const {
        errors,
        touched,
        handleChange,
        setFieldTouched,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        classes
    } = props;

    const change = (name, e) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
    };

    return (
        <Form
            className="ui form error"
            name="createLabForm"
            onSubmit={values => {
                handleSubmit(values);
            }}
        >
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                flex="wrap"
            >
                <Grid item xs={12}>
                    <TextField
                        required={true}
                        margin="normal"
                        variant="outlined"
                        id="subject"
                        label="Subject"
                        name="subject"
                        error={touched["subject"] && Boolean(errors["subject"])}
                        onChange={change.bind(null, "subject")}
                        className={classes.textField}
                    />
                    <div className={classes.errorMessage}>
                        {errors.subject && touched.subject && errors.subject}
                    </div>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        id="message"
                        label="Message"
                        multiline
                        rows="4"
                        variant="outlined"
                        aria-label="Message"
                        placeholder="Message"
                        required={true}
                        margin="normal"
                        name="message"
                        error={touched["message"] && Boolean(errors["message"])}
                        onChange={change.bind(null, "message")}
                        className={classes.textAreaField}
                    />
                    <div className={classes.errorMessage}>
                        {errors.message && touched.message && errors.message}
                    </div>
                </Grid>

                <Grid item xs={12}>
                    <div className={classnames(classes.files)}>
                        <label htmlFor="uploadFile">
                            Attachments <br />
                        </label>
                        <input
                            id="uploadFile"
                            type="file"
                            name="attachment"
                            className="form-control"
                            multiple=""
                            onChange={event => {
                                setFieldValue(
                                    "attachment",
                                    event.currentTarget.files[0]
                                );
                            }}
                        />
                    </div>
                </Grid>
            </Grid>

            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                flex="wrap"
            >
                {isSubmitting ? (
                    <CircularProgress
                        size={26}
                        className={classes.loginLoader}
                    />
                ) : (
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={!errors}
                    >
                        {"Send"}
                    </Button>
                )}
            </Grid>
        </Form>
    );
};

/* 
  Component - CreateLabForm
  Type: Class Component 
*/
class GetHelp extends React.Component {
    onFormSubmit = formValues => {
        this.props.getHelpAction(formValues);
        return false;
    };

    render() {
        const { classes, message, type, module } = this.props;

        const notificationClass = classnames(
            classes.message,
            type === NOTIFICATION_SUCCESS ? "success" : "error"
        );

        return (
            <>
                {module === MODULE_GET_HELP && message !== null && (
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                        flex="wrap"
                    >
                        <Grid item xs={12}>
                            <p className={notificationClass}> {message}</p>
                        </Grid>
                    </Grid>
                )}

                <Formik
                    initialValues={{ subject: "", message: "", attachment: "" }}
                    validate={values => {
                        const errors = {};
                        if (!values.subject) {
                            errors.email = "Required";
                        } else if (!values.message) {
                            errors.message = "Required";
                        }
                        return errors;
                    }}
                    onSubmit={(values, actions) => {
                        this.onFormSubmit(values);
                        setTimeout(() => {
                            actions.setSubmitting(false);
                        }, 1000);
                    }}
                    enableReinitialize={true}
                    render={props => (
                        <GetHelpForm {...props} classes={classes} />
                    )}
                />
            </>
        );
    }
}

GetHelp.propTypes = {
    getHelpAction: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ notification }) => {
    const { message, type, module } = notification;
    return {
        message,
        type,
        module
    };
};

export default connect(mapStateToProps, { getHelpAction })(withStyles(GetHelp));
