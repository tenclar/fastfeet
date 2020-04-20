import React, { useState } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { Alert } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';

import api from '~/services/api';
import { Container, Header, Card, InputText, ButtonSend } from './styles';

export default function DeliveryProblemInfo({ navigation }) {
  const id = navigation.getParam('id');
  const [loading, setLoading] = useState(false);
  const [problem, setProblem] = useState('');

  function navigationReset() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Dashboard' })],
    });
    navigation.dispatch(resetAction);
  }

  async function handleSubmit() {
    try {
      await api.post(`delivery/${id}/problems`, {
        description: problem,
      });
      Toast.show('Problema enviado');
      setLoading(false);
      navigationReset();
    } catch (err) {
      Alert.alert(
        'Erro ao registrar',
        'Não foi possível registrar este problema, tente novamente em alguns minutos.'
      );
      setLoading(false);
    }
  }

  const createButtonAlert = () =>
    Alert.alert(
      'Confirmação',
      'Deseja realmente enviar',
      [
        {
          text: 'Cancelar',
          onPress: () => console.tron.log('OK Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => handleSubmit() },
      ],
      { cancelable: false }
    );

  return (
    <Container>
      <Header />
      <Card>
        <InputText
          onChangeText={(e) => setProblem(e)}
          placeholder="inclua aqui o problema que ocorreu na entrega"
        />
      </Card>
      <ButtonSend loading={loading} onPress={createButtonAlert}>
        Enviar
      </ButtonSend>
    </Container>
  );
}

DeliveryProblemInfo.navigationOptions = () => ({
  title: 'Informar problema',
});
DeliveryProblemInfo.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};
