import React, {createRef} from 'react';
import PropTypes from "prop-types";
import classnames from "classnames";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// styles
import {BootstrapInput, HeaderInput, useStyles} from "./styles";

export default function CustomizedSelects({label, name, selected = '', options, ...props}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(selected);

  const handleChange = event => {
    setValue(event.target.value);
    props.onChange(event.target.value);
  };

  React.useEffect( () => {
    setValue(selected);
  }, [selected]);

  const selectID = createRef();
  let inputElement;

  if(props.type==='headerSelect'){
    inputElement = <HeaderInput name={name} />;
  }else{
    inputElement = <BootstrapInput name={name} />;
  }
  const optionsHTML = options.map(({id, name}, key)=>{
    let listItem = '';
    if(id === '') 
      listItem =  <MenuItem key={id} disabled value={id} >{name}</MenuItem>;
    else if(id === selected) 
      listItem =  <MenuItem key={id} selected value={id} >{name}</MenuItem>;
    else
      listItem =  <MenuItem key={id} value={id} >{name}</MenuItem>;
    return listItem;
  });

  
  return (
    <div className={classnames(classes.root)} autoComplete="off">
      <FormControl fullwidth="true" >
        <InputLabel  htmlFor={selectID}>{label}</InputLabel>
        <Select
          className={props.selectClass}
          ref={selectID} 
          value={value}
          onChange={handleChange}
          input={inputElement}
        >
          {options && optionsHTML}
        </Select>
      </FormControl>
    </div>
  );
}

CustomizedSelects.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
