import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'react-native';
// import PropTypes from 'prop-types';
import logo from '~/assets/fastfeet-logo-white.png';
import Background from '~/components/Background';
import { Container, Form, FormInput, SubmitButton, ErrorText } from './styles';
import { signInRequest } from '~/store/modules/auth/actions';

export default function SignIn() {
  const [id, setId] = useState('');
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const loading = useSelector((store) => store.auth.loading);

  function handleSumbit() {
    if (!id) setError(true);
    else dispatch(signInRequest(id));
  }

  useEffect(() => {
    setError(false);
  }, [id]);

  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            icon="apps"
            keyboardType="number-pad"
            autoCorrect={false}
            returnKeyType="send"
            placeholder="Informe seu ID"
            value={id}
            onChangeText={setId}
            onSubmitEditing={handleSumbit}
          />
          {error && <ErrorText>Campo obrigatório</ErrorText>}
          <SubmitButton loading={loading} onPress={handleSumbit}>
            Entrar no sistema
          </SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}
/* 
SignIn.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

SignIn.defaultProps = {
  navigation: {},
}; */
