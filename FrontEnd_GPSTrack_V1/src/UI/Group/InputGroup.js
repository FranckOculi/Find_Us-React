import React, { useEffect, useState, forwardRef } from 'react';
import TextField from '@mui/material/TextField';
import AppTheme from '../../theme/AppTheme';
import InputAdornment from '@mui/material/InputAdornment';

const defaultProps = {
  required: false,
  type: 'text',
  id: '',
  label: null,
  name: '',
  autoComplete: false,
  onChange: () => {},
  onKeyPress: null,
  value: '',
  preventEnter: false,
};

const InputGroup = forwardRef(
  (
    {
      required,
      type,
      id,
      label,
      name,
      autoComplete,
      onChange,
      onKeyPress,
      value,
      preventEnter,
    },
    ref,
  ) => {
    const { getTheme } = AppTheme();
    const theme = getTheme('GroupForm');
    const [currentValue, setCurrentValue] = useState(value || '');

    useEffect(() => {
      setCurrentValue(value || '');
    }, [value]);

    const personalStyle = () => {
      let textStyle = null;
      let labelStyle = null;
      let endAdornmentStyle = null;
      if (id === 'groupName') {
        textStyle = theme.inputTextName;
        labelStyle = theme.inputLabel;
        endAdornmentStyle = (
          <InputAdornment position='end' sx={{ ml: 3.6, fontSize: '10px' }}>
            {25 - currentValue.length}
          </InputAdornment>
        );
      } else if (id === 'groupDescription') {
        textStyle = theme.inputTextDescription;
        labelStyle = theme.inputLabel;
        endAdornmentStyle = (
          <InputAdornment position='end' sx={{ ml: 3, fontSize: '10px' }}>
            {200 - currentValue.length}
          </InputAdornment>
        );
      }
      return { textStyle, labelStyle, endAdornmentStyle };
    };

    const handleChange = (event) => {
      setCurrentValue(event.target.value || '');
      onChange(event);
    };

    const preventEnterKeyPress = (e) => {
      if (preventEnter && ['Enter', 'NumpadEnter'].includes(e.code)) {
        e.preventDefault();
      }
      if (onKeyPress) onKeyPress(e);
    };

    return (
      <TextField
        required={required}
        type={type}
        id={id}
        label={label}
        name={name}
        autoComplete={autoComplete}
        value={currentValue}
        onKeyPress={preventEnterKeyPress}
        onChange={handleChange}
        ref={ref}
        inputProps={{
          style: personalStyle().textStyle,
        }}
        InputLabelProps={{
          style: personalStyle().labelStyle,
        }}
        InputProps={{ endAdornment: personalStyle().endAdornmentStyle }}
      />
    );
  },
);

InputGroup.defaultProps = defaultProps;

export default InputGroup;
