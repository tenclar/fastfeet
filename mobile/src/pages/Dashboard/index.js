import React from 'react';

import PropTypes from 'prop-types';
import Header from './Header';
import TabView from './TabView';

import { Container } from './styles';

export default function Dashboard({ navigation }) {
  return (
    <Container>
      <Header />
      <TabView navigation={navigation} />
    </Container>
  );
}

Dashboard.navigationOptions = {
  headerShown: false,
};

Dashboard.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
};
