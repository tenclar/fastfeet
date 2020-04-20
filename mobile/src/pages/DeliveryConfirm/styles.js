import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';
import { TouchableOpacity } from 'react-native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #fff;
`;

export const Header = styled.View`
  background: #7d40e7;
  margin-bottom: 10px;
  height: 150px;
`;

export const Card = styled.View`
  flex: 1;

  top: -80px;
  background: #fff;
  border-radius: 5px;
  margin: 0 20px;
  padding: 50px;

  elevation: 4;
`;

export const Camera = styled(RNCamera)`
  flex: 1;

  align-items: center;
`;
export const Preview = styled.Image`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const CloseButton = styled(TouchableOpacity)`
  height: 50px;
  width: 50px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
`;

export const SnapButton = styled(TouchableOpacity)`
  margin-top: auto;
  background: #0000004d;
  height: 62px;
  width: 62px;
  border-radius: 31px;
  justify-content: center;
  align-items: center;
`;

export const ButtonSend = styled(Button)`
  margin: 0 10px;
  top: -20px;
  background: #7d40e7;
`;
