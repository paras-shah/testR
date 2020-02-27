import React, { useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Material UI
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";

// Redux
import { connect } from "react-redux";
import { Formik, Form } from "formik";
// import * as Yup from "yup";

//  Custom
// Action
import { createLabAction } from "../../../actions";
// Copy
import { COPY_LAB_TEMPLATE, COPY_COMMON } from "../../../copy/common";
import { Typography } from "../../../components/Wrappers/Wrappers";
import { HtmlTooltip } from "../../../utilities";

const LabForm = props => {
    const {
        values,
        isValid,
        errors,
        touched,
        handleChange,
        setFieldTouched,
        labVersionDetails,
        handleSubmit,
        classes
    } = props;

    // local
    var [loading, setLoading] = useState(false);

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
                setLoading(true);
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
                <TextField
                    required={true}
                    type="hidden"
                    id="lab_template"
                    name="lab_template"
                    value={values.lab_template}
                    onChange={handleChange}
                    className={"hidden"}
                />

                {labVersionDetails.lab_params.map(
                    ({ name, label, required, help }, key) => {
                        const requiredAttrib = required
                            ? { required: true }
                            : { required: false };
                        return (
                            <Grid item xs={12} key={key}>
                                <TextField
                                    type="text"
                                    label={label}
                                    margin="normal"
                                    fullWidth
                                    variant="outlined"
                                    id={name}
                                    name={name}
                                    className={classnames(
                                        "createLabInput",
                                        "lightTheme"
                                    )}
                                    value={values[name] || ""}
                                    onChange={
                                        // setIsLoading(false);
                                        change.bind(null, name)
                                    }
                                    placeholder={label}
                                    {...requiredAttrib}
                                    helperText={
                                        touched[name] ? errors[name] : ""
                                    }
                                    error={
                                        touched[name] && Boolean(errors[name])
                                    }
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <HtmlTooltip
                                                    title={
                                                        <React.Fragment>
                                                            <Typography
                                                                className={
                                                                    classes.heading
                                                                }
                                                            >
                                                                {help}
                                                            </Typography>
                                                        </React.Fragment>
                                                    }
                                                    placement="left-start"
                                                >
                                                    <div
                                                        className={
                                                            classes.helpIcon
                                                        }
                                                    />
                                                </HtmlTooltip>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                        );
                    }
                )}
            </Grid>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
            >
                {loading ? (
                    <CircularProgress
                        size={26}
                        className={classes.loginLoader}
                    />
                ) : (
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.createLabButton}
                        disabled={
                            (!isValid && !loading) || (isValid && loading)
                        }
                    >
                        {COPY_LAB_TEMPLATE.CREATE_LAB}
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
class CreateLabForm extends React.Component {
    onFormSubmit = formValues => {
        this.props.createLabAction(formValues);
        return false;
    };

    render() {
        /* const validationSchema = Yup.object({
            name: Yup.string("Enter a name for your lab").required(
                "Name is required"
            )
        }); */
        const { labVersionDetails, versionSelected, classes } = this.props;

        if (!labVersionDetails || !versionSelected) return COPY_COMMON.LOADING;

        return (
            <Formik
                initialValues={{ lab_template: versionSelected }}
                onSubmit={values => {
                    this.onFormSubmit(values);
                }}
                enableReinitialize={true}
                render={props => (
                    <LabForm
                        {...props}
                        labVersionDetails={labVersionDetails}
                        classes={classes}
                    />
                )}
            />
        );
    }
}

CreateLabForm.propTypes = {
    labVersionDetails: PropTypes.object.isRequired,
    versionSelected: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
};

export default connect(null, { createLabAction })(CreateLabForm);
