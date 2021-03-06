import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  MdMoreHoriz,
  MdVisibility,
  MdCreate,
  MdDeleteForever,
} from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Container, Badge, MenuItem, MenuList } from './styles';

export default function Menu({ toEdit, toDel, onClick, ...rest }) {
  const [visible, setVisible] = useState();

  function handleToggleVisible() {
    setVisible(!visible);
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible}>
        <MdMoreHoriz size={16} />
      </Badge>
      <MenuList visible={visible} {...rest}>
        <MenuItem onClick={handleToggleVisible}>
          <MdVisibility size={16} color="#8E5BE8" />
          <button type="button" onClick={onClick}>
            Visualizar
          </button>
        </MenuItem>
        <hr />
        <MenuItem onClick={handleToggleVisible}>
          <MdCreate size={16} color="#4D85EE" />
          <Link to={toEdit}>Editar</Link>
        </MenuItem>
        <hr />
        <MenuItem onClick={handleToggleVisible}>
          <MdDeleteForever size={16} color="#DE3B3B" />
          <Link to={toDel}>Deletar</Link>
        </MenuItem>
      </MenuList>
    </Container>
  );
}
Menu.propTypes = {
  toEdit: PropTypes.string.isRequired,
  toDel: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
