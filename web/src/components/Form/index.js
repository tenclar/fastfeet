import React from 'react';
import PropTypes from 'prop-types';

import { Panel } from './styles';

const FormCustom = ({ children }) => <Panel>{children}</Panel>;

FormCustom.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default FormCustom;
