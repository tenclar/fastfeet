import styled from 'styled-components/native';
import AvatarComponent from '~/components/Avatar';

export const Container = styled.SafeAreaView`
  align-self: stretch;
  flex-direction: row;
  margin: 10px;
`;
export const HeaderContentTitle = styled.View`
  flex-direction: column;
  justify-content: center;
  margin-left: 12px;
`;
export const HeaderTitle = styled.Text`
  font-size: 12px;
  color: #666;
  align-self: center;
`;
export const DeliverymanName = styled.Text`
  font-size: 22px;
  color: #444444;
  font-weight: bold;
`;
export const LogoutContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
export const Avatar = styled(AvatarComponent)``;
