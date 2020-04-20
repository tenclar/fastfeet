import styled from 'styled-components/native';
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
  top: -70px;
  background: #fff;
  border-radius: 5px;
  margin: 0 10px;
  padding: 0 15px;

  elevation: 4;
`;

export const InputText = styled.TextInput.attrs({
  placeholderTextColor: '#999',
  multiline: true,
  numberOfLines: 15,
})`
  flex: 1;
  font-size: 15px;
  color: #999;
  justify-content: flex-start;
  text-align-vertical: top;
`;

export const ButtonSend = styled(Button)`
  margin: 0 10px;
  top: -50px;
  background: #7d40e7;
`;
