import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { Container, Text } from './styles';

export default function Button({ children, icon, color, ...rest }) {
  return (
    <Container {...rest}>
      <Icon size={25} name={icon} color={color} />

      <Text>{children}</Text>
    </Container>
  );
}
Button.propTypes = {
  children: PropTypes.string.isRequired,
  icon: PropTypes.string,
  color: PropTypes.string,
};
Button.defaultProps = {
  icon: '',
  color: '',
};
