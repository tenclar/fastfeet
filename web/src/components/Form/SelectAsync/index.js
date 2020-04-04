/* eslint-disable react/forbid-prop-types */
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';

import { debounce } from 'lodash';

import { useField } from '@unform/core';

// import { Container } from './styles';

export default function ReactSelectAsync({
  name,
  multiple,
  options,
  asyncFunc,
  ...rest
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  function parseSelectValue(selectRef) {
    const selectValue = selectRef.props.value;
    if (!multiple) {
      return selectValue ? selectValue.id : '';
    }

    return selectValue ? selectValue.map(option => option.id) : [];
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.value.id',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  const loadValues = value => asyncFunc(value);

  const debouncedLoadOptions = debounce(loadValues, 500, {
    leading: true,
  });

  function getDefaultValue() {
    if (!defaultValue) return null;

    if (!multiple) {
      return options.find(option => option.id === defaultValue);
    }

    return options.filter(option => defaultValue.includes(option.id));
  }

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
    <>
      <AsyncSelect
        styles={customStyles}
        name={fieldName}
        aria-label={fieldName}
        loadOptions={inputValue => debouncedLoadOptions(inputValue)}
        options={options}
        isMulti={multiple}
        defaultValue={getDefaultValue()}
        getOptionValue={option => option.id}
        getOptionLabel={option => option.name}
        noOptionsMessage={() => 'Nenhum registro localizado'}
        loadingMessage={() => 'Carregando...'}
        placeholder="Selecione..."
        ref={ref}
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  );
}

ReactSelectAsync.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  multiple: PropTypes.bool,
  asyncFunc: PropTypes.func.isRequired,
};

ReactSelectAsync.defaultProps = {
  multiple: false,
};
