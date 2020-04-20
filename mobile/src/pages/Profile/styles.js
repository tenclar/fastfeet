import styled from 'styled-components/native';
import AvatarComponent from '~/components/Avatar';
import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 20px 0 30px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #333;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})`
  align-self: stretch;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const FormLabel = styled.Text`
  font-family: Verdana;
  flex: 1;
  color: #666;
  font-size: 16px;
  margin-bottom: 2px;
`;
export const FormText = styled.Text`
  flex: 1;
  font-size: 26px;
  font-weight: bold;
  margin-left: 5px;
  margin-bottom: 10px;
  color: #444;
`;

export const LogoutButton = styled(Button)`
  margin-top: 10px;
  background: #f64c75;
`;

export const AvatarContainer = styled.SafeAreaView`
  align-self: stretch;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;
export const Avatar = styled(AvatarComponent)``;
