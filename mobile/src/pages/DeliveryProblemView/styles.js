import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import LottieView from 'lottie-react-native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #fff;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin: 60px 0 30px 0;
`;

export const Header = styled.View`
  background: #7d40e7;
  margin-bottom: 10px;
  height: 150px;
`;

export const Card = styled.View`
  background: #fff;
  border-radius: 5px;
  margin: 10px;
  padding: 15px 15px 0 15px;
  border: 1px solid #eaeaea;
  box-shadow: 10px 2px 10px black;
  elevation: 4;
  height: 60px;
`;

export const PanelGroup = styled.View`
  flex: 1;
  justify-content: center;
`;
export const PanelGrid = styled.View`
  flex-direction: row;
  align-content: space-between;
`;
export const TextDate = styled.Text`
  color: #999999;
  font-size: 13px;
  text-align: right;
`;
export const TextOutput = styled.Text`
  color: #999999;
  font-weight: bold;
  font-size: 16px;
`;
export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;

export const ListProblems = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  top: -70px;
  flex-direction: column;
  flex: 1;
  margin-left: 2px;
  margin-right: 2px;
`;

export const Loading = styled(ActivityIndicator).attrs({
  size: 'large',
  color: '#7D40E7',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Empty = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Lottie = styled(LottieView)`
  width: 30px;
  height: 30px;
`;

export const EmptyLabel = styled.Text`
  color: #ddd;
  font-size: 14px;
  font-weight: bold;
  margin-top: 5px;
`;
