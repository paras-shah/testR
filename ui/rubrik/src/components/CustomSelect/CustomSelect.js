import React, { createRef } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

// icons sets
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";

// styles
import { HeaderInput, useStyles } from "./styles";

export default function CustomizedSelects({
    label,
    name,
    selected = "",
    options,
    disabled,
    type,
    native,
    displayEmpty,
    renderValue,
    ...props
}) {
    const classes = useStyles();
    const [value, setValue] = React.useState(selected);

    const handleChange = event => {
        setValue(event.target.value);
        props.onChange(event.target.value);
    };

    React.useEffect(() => {
        setValue(selected);
    }, [selected]);

    const selectID = createRef();
    let inputElement = <HeaderInput name={name} />;

    const optionsHTML =
        options &&
        options.map(({ id, name }, key) => {
            let listItem = "";
            if (id === "")
                listItem = (
                    <MenuItem key={id} disabled value={id}>
                        {name}
                    </MenuItem>
                );
            else if (id === selected)
                listItem = (
                    <MenuItem key={id} selected value={id}>
                        {name}
                    </MenuItem>
                );
            else
                listItem = (
                    <MenuItem key={id} value={id}>
                        {name}
                    </MenuItem>
                );
            return listItem;
        });

    return (
        <div
            className={classnames(classes.root, 
                classes.headerDropDown, {
                "pageSelect": type === "pageSelect" ? true : false
            })}
            autoComplete="off"
        >

            <FormControl className={classes.formControl}>
                <InputLabel htmlFor={selectID}>{label}</InputLabel>
                <Select
                    className={props.selectClass}
                    ref={selectID}
                    value={value}
                    onChange={handleChange}
                    input={inputElement}
                    IconComponent={KeyboardArrowDown}
                    disabled={disabled ? true : false}
                    native={native}
                    displayEmpty={displayEmpty}
                    renderValue={renderValue}
                >
                    {options && optionsHTML}
                </Select>
            </FormControl>
        </div>
    );
}

CustomizedSelects.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};
