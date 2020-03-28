import React from 'react';
/* import { useSelector } from 'react-redux'; */

import { Link } from 'react-router-dom';

import logo from '~/assets/logofastfeet.svg';
import logoUser from '~/assets/user.png';
import { Container, Content, Profile, NavLinkStyled } from './styles';

export default function Header() {
  /*  const profile = useSelector(state => state.user.profile); */

  return (
    <Container>
      <Content>
        <nav>
          <Link to="/dashboard">
            <img src={logo} alt="FastFeet" />
          </Link>
          <NavLinkStyled to="/encomendas">ENCOMENDAS</NavLinkStyled>
          <NavLinkStyled to="/entregadores">ENTREGADORES</NavLinkStyled>
          <NavLinkStyled to="/destinatarios">DESTINATÁRIOS</NavLinkStyled>
          <NavLinkStyled to="/problemas">PROBLEMAS</NavLinkStyled>
        </nav>
        <aside>
          {/* <Notifications /> */}
          <Profile>
            <div>
              {/* <strong>{profile.name}</strong> */}
              <strong>Tenclar Valus</strong>
              <Link to="/profile">Menu Perfil</Link>
            </div>
            <img alt="img perfil" src={logoUser} />
            {/*  <img
              src={
                profile.avatar.url ||
                'https://api.adorable.io/avatars/50/abott@adorable.png'
              } /> */}
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
