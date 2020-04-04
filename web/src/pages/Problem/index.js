import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';

import MenuEditProb from '~/components/MenuEditProb';
import Title from '~/components/Title';

import { TableStyle } from '~/components/Table';

import { Panel } from '~/components/Panel';
import Modal from '~/components/Dialog';

import loadingGif from '~/assets/ajax-loader.gif';
import api from '~/services/api';

export default function Problems() {
  const [problem, setProblem] = useState({});
  const [visible, setVisible] = useState();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadProblems() {
      try {
        setLoading(true);
        const response = await api.get('delivery/problems');
        return setProblems(response.data);
      } catch (err) {
        return toast.error('Erro na lista');
      } finally {
        setLoading(false);
      }
    }

    loadProblems();
  }, []);

  function handleView(id) {
    console.tron.log(id);
    async function loadProblem(i) {
      const response = await api.get(`delivery/${i}/problem`);
      setProblem(response.data);
    }
    if (id) {
      loadProblem(id);
    }
    setVisible(!visible);
  }

  return (
    <>
      <Panel>
        <Title>Problemas na entrega</Title>

        <TableStyle>
          <thead>
            <tr>
              <th style={{ width: '150px' }}>Pedido</th>
              <th>Problema</th>
              <th style={{ width: '50px' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="4">
                  Carregando <img src={loadingGif} alt="Loading" />
                </td>
              </tr>
            )}
            {problems.length === 0 && (
              <tr>
                <td style={{ textAlign: 'center' }} colSpan="4">
                  <h3>Não há dados</h3>
                </td>
              </tr>
            )}

            {problems.map(p => (
              <tr key={p.id}>
                <td>#0{p.order_id}</td>
                <td>{p.description.substring(0, 100)}...</td>
                <td>
                  <MenuEditProb
                    onClick={() => handleView(p.id)}
                    toDel={`/encomendas/cancelar/${p.id}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </TableStyle>
      </Panel>
      <Modal visible={visible} onClick={() => handleView()}>
        {problem && (
          <>
            <h3> Visualizar Problema </h3>
            <p>{problem.description}</p>
          </>
        )}
      </Modal>
    </>
  );
}
