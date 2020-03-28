/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select/async';
import { useField } from '@unform/core';

const SelectAsync = ({ name, funcAsync, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'select.state.value',
      getValue: ref => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }
          return ref.select.state.value.map(option => option.value);
        }
        if (!ref.select.state.value) {
          return '';
        }

        return ref.select.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  const loadValues = value => funcAsync(value);

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

  /* classNamePrefix="react-select" */

  return (
    <Select
      styles={customStyles}
      cacheOptions
      defaultValue={defaultValue}
      ref={selectRef}
      {...rest}
    />
  );
};

SelectAsync.propTypes = {
  name: PropTypes.string.isRequired,
  funcAsync: PropTypes.func.isRequired,
};

export default SelectAsync;
