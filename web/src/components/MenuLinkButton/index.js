import React from 'react';
import PropTypes from 'prop-types';
import { LinkButtonStyled } from './styles';

export default function LinkButton({ children, to, color, ...rest }) {
  return (
    <LinkButtonStyled to={to} color={color} {...rest}>
      <span>{children}</span>
    </LinkButtonStyled>
  );
}

LinkButton.defaultProps = {
  color: '#000',
};

LinkButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
  to: PropTypes.string.isRequired,
  color: PropTypes.string,
};
