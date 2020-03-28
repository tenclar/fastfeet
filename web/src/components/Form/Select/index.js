/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from 'react';

import { useField } from '@unform/core';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';

const Select = ({ name, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'state.value',
      getValue: ref => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }

          return ref.state.value.map(option => option.value);
        }
        if (!ref.state.value) {
          return '';
        }

        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  const customStyles = {
    container: provided => ({
      ...provided,
      height: '42px',
      margin: '7px 0 18px 0',
    }),
    control: provided => ({
      ...provided,
      borderColor: '#ddd',
      boxShadow: '0 0 0 1px #eee',
      '&:active': 'border: 1px solid #bbb',
      '&:hover': 'border: 1px solid #bbb',
    }),
    valueContainer: provided => ({
      ...provided,
      height: '42px',
      position: 'initial',
    }),
  };

  return (
    <ReactSelect
      styles={customStyles}
      defaultValue={defaultValue}
      ref={selectRef}
      classNamePrefix="react-select"
      {...rest}
    />
  );
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Select;
