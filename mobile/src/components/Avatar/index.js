import React from 'react';
import PropTypes from 'prop-types';
import { Container, Image } from './styles';

export default function Avatar({ size, avatar }) {
  return (
    <Container size={size}>
      {avatar && avatar.url && (
        <Image size={size} source={{ uri: avatar.url }} />
      )}
    </Container>
  );
}

Avatar.defaultProps = {
  avatar: undefined,
};

Avatar.propTypes = {
  size: PropTypes.number.isRequired,
  avatar: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }),
};
