import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Material UI
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

// Custom

// Copy
import { Typography } from "../../../components/Wrappers/Wrappers";
import { HtmlTooltip } from "../../../utilities";

// Styles
// import withStyles from "./styles";

/* 
  Component -  LabActionFields
  Type: Functional Component 
*/
const LabActionFields = (props) => {
    const { type } = props;

    if (typeof (type) === "string") {
        return (
            <TextBoxField {...props} />
        );
    } else {
        return null;
    }
}

const TextBoxField = (props) => {
    const { name, label, required, help, value, classes, onChange, helperText, error } = props;
    const requiredAttrib = required
        ? { required: true }
        : { required: false };

    return (
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
            value={value}
            onChange={onChange}
            placeholder={label}
            {...requiredAttrib}
            helperText={helperText}
            error={error}
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
    );
}

LabActionFields.propTypes = {
    classes: PropTypes.object.isRequired
};

export default LabActionFields;
