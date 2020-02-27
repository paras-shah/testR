import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Other libraries - Redux, Formik
import { Formik, Form } from "formik";

// Material UI
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// Custom
// Component 
import LabActionFields from "./LabActionFields";
import { Typography } from "../../../components/Wrappers/Wrappers";

// Copy
import { COPY_LAB_TEMPLATE } from "../../../copy/common";
// import CustomSelect from "../../../components/CustomSelect/CustomSelect";

// Styles
// import withStyles from "./styles";

/* 
  Component -  LabGenerator
  Type: Functional Component 
*/
class LabActions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            labInstance: props.labInstance,
            params: props.params
        };
    }

    onFormSubmit = formValues => {
        console.log(formValues);
        this.props.handleAction(formValues);
        return false;
    };

    render() {
        const { classes, params } = this.props;
        
        return (
            <>

                {params && <>
                    <Typography
                        color="text"
                        colorBrightness="main"
                        className={classnames("smallText", classes.performActionText)}
                    >
                        Pleae enter following params
                                    </Typography>

                    <Formik
                        onSubmit={values => {
                            this.onFormSubmit(values);
                        }}
                        enableReinitialize={true}
                        render={props => (
                            <LabActionsForm
                                classes={classes}
                                params={params}
                                {...props}
                            />

                        )}
                    />
                </>
                }
            </>
        );
    }
}

LabActions.propTypes = {
    classes: PropTypes.object.isRequired
};

export default LabActions;



// Action Form
const LabActionsForm = props => {
    const {
        values,
        isValid,
        errors,
        touched,
        handleChange,
        setFieldTouched,
        params,
        handleSubmit,
        classes
    } = props;

    // local
    var [loading, setLoading] = React.useState(false);

    const change = (name, e) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
    };
       
    return (
        <Form
            className="ui form error"
            name="performLabActions"
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
                {/* <TextField
                    required={true}
                    type="hidden"
                    id="lab_template"
                    name="lab_template"
                    value={""}
                    onChange={handleChange}
                    className={"hidden"}
                /> */}

                {params && params.map(
                    ({ help, name, label, value, required  }, key) => {
                        return (
                            <Grid item xs={12} key={key}>
                                <LabActionFields
                                    label={label}
                                    id={name}
                                    name={name}
                                    type={value}
                                    required={required}
                                    help={help}
                                    value={values[name] || ""}
                                    classes={classes}
                                    onChange={
                                        // setIsLoading(false);
                                        change.bind(null, name)
                                    }
                                    helperText={
                                        touched[name] ? errors[name] : ""
                                    }
                                    error={
                                        touched[name] && Boolean(errors[name])
                                    }
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

