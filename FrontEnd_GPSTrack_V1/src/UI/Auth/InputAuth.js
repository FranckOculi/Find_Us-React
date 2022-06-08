import React, { useEffect, useState, forwardRef } from 'react';
import TextField from '@mui/material/TextField';
import AppTheme from '../../theme/AppTheme';

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

const Input = forwardRef(
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
    const theme = getTheme('Auth');
    const [currentValue, setCurrentValue] = useState(value || '');

    useEffect(() => {
      setCurrentValue(value || '');
    }, [value]);

    const personalStyle = () => {
      let textStyle = null;
      let labelStyle = null;
      if (type === 'password') {
        textStyle = theme.inputTextPassword;
        labelStyle = theme.inputLabel;
      } else if (type === 'email' || id === 'firstName') {
        textStyle = theme.inputTextEmail;
        labelStyle = theme.inputLabel;
      }
      return { textStyle, labelStyle };
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
      />
    );
  },
);

Input.defaultProps = defaultProps;

export default Input;
