import styled from 'styled-components';

import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  height: 80px;
  background: #f8f9fd;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
`;

export const Text = styled.Text`
  color: #999999;
  width: 70px;
  font-size: 14px;
  text-align: center;
`;
