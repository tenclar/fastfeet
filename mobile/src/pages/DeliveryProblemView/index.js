import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import {
  Container,
  Title,
  Header,
  Card,
  PanelGrid,
  TextDate,
  TextOutput,
  PanelGroup,
  ListProblems,
  Loading,
  Empty,
  EmptyLabel,
  Lottie,
} from './styles';
import noVisibility from '~/assets/visibily-off.json';
import api from '~/services/api';

export default function DeliveryProblemView({ navigation }) {
  const id = navigation.getParam('id');
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadProblems() {
      try {
        setLoading(true);
        const response = await api.get(`/delivery/${id}/problems`);
        return setProblems(response.data);
      } catch (err) {
        return toast.error('Erro na lista');
      } finally {
        setLoading(false);
      }
    }
    loadProblems();
  }, [id]);

  return (
    <Container>
      <Header>
        <Title> Encomenda 0{id}</Title>
      </Header>

      {loading ? (
        <Loading />
      ) : (
        <>
          {problems.length > 0 ? (
            <>
              <ListProblems>
                {problems.map((p) => (
                  <Card key={p.createdAt}>
                    <PanelGrid>
                      <PanelGroup>
                        <TextOutput>{p.description}</TextOutput>
                      </PanelGroup>
                      <PanelGroup>
                        <TextDate>
                          {format(parseISO(p.createdAt), 'dd/MM/yyyy')}
                        </TextDate>
                      </PanelGroup>
                    </PanelGrid>
                  </Card>
                ))}
              </ListProblems>
            </>
          ) : (
            <Empty>
              <Lottie source={noVisibility} autoPlay loop />
              <EmptyLabel>Não há problemas</EmptyLabel>
            </Empty>
          )}
        </>
      )}
    </Container>
  );
}

DeliveryProblemView.navigationOptions = () => ({
  title: 'Visualizar problemas',
});

DeliveryProblemView.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};
