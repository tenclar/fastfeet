import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { signOut } from '~/store/modules/auth/actions';
import {
  Container,
  Avatar,
  HeaderContentTitle,
  HeaderTitle,
  DeliverymanName,
  LogoutContainer,
} from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector((store) => store.deliveryman.profile);
  const { name } = profile;
  const avatar = {
    url: `https://ui-avatars.com/api/?font-size=0.33&background=0D8ABC&color=fff&bold=true&name=${name}`,
  };

  function logout() {
    console.tron.log('saiu');
    dispatch(signOut());
  }
  return (
    <Container>
      <Avatar size={68} avatar={avatar} />
      <HeaderContentTitle>
        <HeaderTitle>Bem Vindo de volta,</HeaderTitle>
        <DeliverymanName>{name}</DeliverymanName>
      </HeaderContentTitle>
      <LogoutContainer>
        <TouchableOpacity onPress={logout}>
          <Icon name="exit-to-app" size={25} color="#E74040" />
        </TouchableOpacity>
      </LogoutContainer>
    </Container>
  );
}
