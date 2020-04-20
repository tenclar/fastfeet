import styled from 'styled-components/native';
import Buttonb from '~/components/ButtonBar';
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
  top: -90px;
  background: #fff;
  border-radius: 5px;
  margin: 10px 10px 0 10px;
  padding: 15px 15px 0 15px;
  border: 1px solid #eaeaea;
  box-shadow: 10px 2px 10px black;
  elevation: 4;
`;
export const CardHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;
export const CardHeaderTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #7d40e7;
  margin-left: 5px;
`;
export const CardBody = styled.View``;
export const PanelGroup = styled.View`
  flex: 1;
  flex-direction: column;
  align-content: center;
`;
export const PanelGrid = styled.View`
  flex-direction: row;
  align-content: space-around;
`;
export const TextLabel = styled.Text`
  color: #999999;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 2px;
`;
export const TextOutput = styled.Text`
  color: #666;
  margin-bottom: 12px;
  font-size: 14px;
`;
export const ButtonGroup = styled.View`
  top: -80px;
  margin: 10px;
  background: #f8f9fd;
  align-items: center;
  border-radius: 4px;
  flex-direction: row;
  align-content: space-around;
  /* border: 1px solid #0000001a; */

  /* box-shadow: 0px 18px 5px rgba(0, 0, 0, 0.6); */
  elevation: 4;
`;

export const ButtonBar = styled(Buttonb)`
  flex: 1;
`;

export const ButtonPickUp = styled(Button).attrs({
  background: '#7d40e7',
})`
  top: -65px;
  align-self: stretch;
  margin: 0 15px;
`;

export const Separator2000 = styled.View`
  width: 1px;
  background-color: #0000001a;
  align-self: stretch;
`;
