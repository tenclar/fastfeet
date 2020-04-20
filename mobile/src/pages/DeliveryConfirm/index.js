import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StackActions, NavigationActions } from 'react-navigation';

import {
  Container,
  Header,
  Camera,
  ButtonSend,
  Card,
  Preview,
  CloseButton,
  SnapButton,
} from './styles';
import api from '~/services/api';

/* utilizar link https://blog.rocketseat.com.br/react-native-camera/ */

export default function DeliveryConfirm({ navigation }) {
  const id = navigation.getParam('id');
  const deliverymanId = useSelector((store) => store.deliveryman.profile.id);

  const [signature, setSignature] = useState(null);
  const [loading, setLoading] = useState(false);

  const camera = useRef(null);

  function navigationReset() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Dashboard' })],
    });
    navigation.dispatch(resetAction);
  }

  async function takePicture() {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.current.takePictureAsync(options);
      console.tron.log(data.uri);
      setSignature(data.uri);
    }
  }

  function handleCancel() {
    setSignature(null);
  }

  async function handleSubmit() {
    setLoading(true);

    try {
      console.tron.log('add arquivo');
      console.tron.log(signature);
      // eslint-disable-next-line no-undef
      const data = new FormData();
      data.append('file', {
        type: 'image/jpeg',
        uri: signature,
        name: signature.split('/').pop(),
      });
      console.tron.log('nome do arquivo');
      console.tron.log(data.uri);
      const response = await api.post('/files', data);

      const signature_id = response.data.id;

      await api.put(`/orders/${id}/delivery/${deliverymanId}`, {
        signature_id,
      });

      Toast.show('Entrega finalizada');
      setLoading(false);
      navigationReset();
    } catch (error) {
      console.tron.log({ error });
      Alert.alert(
        'Erro ao confirmar entrega',
        'Não foi possível confirmar a entrega'
      );
      setLoading(false);
    }
  }

  const createButtonAlert = () =>
    Alert.alert(
      'Confirmação',
      'Deseja realmente enviar?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.tron.log('OK Pressed'),
          style: 'cancel',
        },
        { text: 'Sim', onPress: () => handleSubmit() },
      ],
      { cancelable: false }
    );
  return (
    <Container>
      <Header />
      <Card>
        {signature ? (
          <>
            <Preview source={{ uri: signature }} />
            <CloseButton onPress={handleCancel}>
              <Icon color="#FFFFFF" size={26} name="close" />
            </CloseButton>
          </>
        ) : (
          <Camera
            ref={camera}
            captureAudio={false}
            type={Camera.Constants.Type.back}
            flashMode={Camera.Constants.FlashMode.off}
            androidCameraPermissionOptions={{
              title: 'Permissão para ativar Camera',
              message: 'solicitação de autorização de acesso a camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancelar',
            }}>
            <SnapButton onPress={takePicture}>
              <Icon color="#FFFFFF" size={26} name="camera-alt" />
            </SnapButton>
          </Camera>
        )}
      </Card>
      <ButtonSend
        enabled={!!signature}
        loading={loading}
        onPress={createButtonAlert}>
        Enviar
      </ButtonSend>
    </Container>
  );
}

DeliveryConfirm.navigationOptions = () => ({
  title: 'Confirmar Entrega',
});
DeliveryConfirm.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
    popToTop: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};
