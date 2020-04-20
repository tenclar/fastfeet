import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';

import { Alert } from 'react-native';
import { format, parseISO } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StackActions, NavigationActions } from 'react-navigation';
import api from '~/services/api';
import {
  Container,
  Header,
  Card,
  CardHeader,
  CardHeaderTitle,
  CardBody,
  TextLabel,
  TextOutput,
  PanelGroup,
  PanelGrid,
  ButtonGroup,
  ButtonBar,
  ButtonPickUp,
  Separator2000,
} from './styles';

export default function DeliveryDetail({ navigation }) {
  const [loading, setLoading] = useState(false);
  const {
    id,
    deliveryman_id,
    product,
    recipient,
    start_date,
    end_date,
    status,
  } = navigation.getParam('delivery');

  const StartDateFormat = start_date
    ? format(parseISO(start_date), 'dd/MM/yyyy')
    : '-- / -- / --';

  const EndDateFormat = end_date
    ? format(parseISO(end_date), 'dd/MM/yyyy')
    : '-- / -- / --';

  function navigationReset() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Dashboard' })],
    });
    navigation.dispatch(resetAction);
  }

  async function handleTakeout() {
    setLoading(true);
    try {
      await api.put(`/orders/${id}/pickup/${deliveryman_id}`);
      setLoading(false);
      Toast.show('Encomenda retirada');
      navigationReset();
    } catch (err) {
      Alert.alert(
        'ERRO - DEU RUIM',
        'Não foi possível retirar a entrega, tente novamente mais tarde'
      );
    }
    setLoading(false);
  }

  function handleInfoProblem() {
    navigation.navigate('DeliveryProblemInfo', { id });
  }
  function handleViewProblem() {
    navigation.navigate('DeliveryProblemView', { id });
  }
  function handleConfirmDelivery() {
    navigation.navigate('DeliveryConfirm');
  }
  return (
    <Container>
      <Header />
      <Card>
        <CardHeader>
          <Icon size={25} name="local-shipping" color="#7D40E7" />
          <CardHeaderTitle>Informações da Entrega</CardHeaderTitle>
        </CardHeader>
        <CardBody>
          <TextLabel>DESTINATÁRIO</TextLabel>
          <TextOutput>{recipient.name}</TextOutput>

          <TextLabel>ENDEREÇO DE ENTREGA</TextLabel>
          <TextOutput>{`${recipient.street}, ${recipient.number}. ${recipient.complement}.  ${recipient.city} - ${recipient.state}`}</TextOutput>

          <TextLabel>PRODUTO</TextLabel>
          <TextOutput>{product}</TextOutput>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <Icon size={25} name="event" color="#7D40E7" />
          <CardHeaderTitle>Situação da Entrega</CardHeaderTitle>
        </CardHeader>
        <CardBody>
          <TextLabel>STATUS</TextLabel>
          <TextOutput>{status}</TextOutput>

          <PanelGrid>
            <PanelGroup>
              <TextLabel>DATA DE RETIRADA</TextLabel>
              <TextOutput>{StartDateFormat}</TextOutput>
            </PanelGroup>
            <PanelGroup>
              <TextLabel>DATA DE ENTREGA</TextLabel>
              <TextOutput>{EndDateFormat}</TextOutput>
            </PanelGroup>
          </PanelGrid>
        </CardBody>
      </Card>
      {status === 'PENDENTE' ? (
        <ButtonPickUp loading={loading} onPress={handleTakeout}>
          Efetuar Retirada
        </ButtonPickUp>
      ) : (
        <ButtonGroup>
          <ButtonBar
            onPress={handleInfoProblem}
            icon="highlight-off"
            color="#E74040">
            Informar Problema
          </ButtonBar>
          <Separator2000 />
          <ButtonBar
            onPress={handleViewProblem}
            icon="info-outline"
            color="#E7BA40">
            Visualizar Problemas
          </ButtonBar>
          <Separator2000 />
          <ButtonBar
            onPress={handleConfirmDelivery}
            icon="alarm-on"
            color="#7D40E7">
            Confirmar Entrega
          </ButtonBar>
        </ButtonGroup>
      )}
    </Container>
  );
}
DeliveryDetail.propTypes = {
  /*  delivery: PropTypes.shape({
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    recipient: PropTypes.shape({
      city: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired, */
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

DeliveryDetail.navigationOptions = () => ({
  title: 'Detalhe da Entrega',
});
