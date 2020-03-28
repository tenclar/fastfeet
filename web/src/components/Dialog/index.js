import React from 'react';
import PropTypes from 'prop-types';

import { DialogBox, Container, Content } from './styles';

const Modal = ({ children, visible, onClick, size }) => (
  <DialogBox visible={visible}>
    <Container onClick={onClick}>
      <Content size={size}>{children}</Content>
    </Container>
  </DialogBox>
);

Modal.defaultProps = {
  size: 'default',
  visible: false,
};

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  size: PropTypes.string,
  visible: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default Modal;
