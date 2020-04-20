/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Title,
  Separator,
  Form,
  FormLabel,
  FormText,
  LogoutButton,
  AvatarContainer,
  Avatar,
} from './styles';

export default function Profile() {
  const profile = useSelector((store) => store.deliveryman.profile);

  const avatar = {
    url: `https://ui-avatars.com/api/?font-size=0.33&background=0D8ABC&color=fff&bold=true&name=${profile.name}`,
  };

  function handleLogout() {}

  return (
    <Container>
      <Title />
      <AvatarContainer>
        <Avatar size={136} avatar={avatar} />
      </AvatarContainer>
      <Form>
        <FormLabel>Nome completo</FormLabel>
        <FormText>{profile.name}</FormText>

        <FormLabel>E-mail</FormLabel>
        <FormText>{profile.email}</FormText>

        <FormLabel>Data de Cadastro</FormLabel>
        <FormText>10/10/2020</FormText>

        <Separator />

        <LogoutButton onPress={handleLogout}>Sair do FastFeet</LogoutButton>
      </Form>
    </Container>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
