/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { MdSearch, MdAdd } from 'react-icons/md';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import MenuEdit from '~/components/MenuEdit';
import Title from '~/components/Title';
import { SearchInput, HeaderContent } from '~/components/SearchInput';
import { TableStyle } from '~/components/Table';
import Input from '~/components/Form/Input';
import { Panel } from '~/components/Panel';

import loadingGif from '~/assets/ajax-loader.gif';
import api from '~/services/api';

export default function Deliveryman() {
  const [deliverymans, setDeliverymans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [args, setArgs] = useState(null);

  useEffect(() => {
    async function loadDeliverymans() {
      try {
        setLoading(true);
        const response = args
          ? await api.get('deliverymans', {
              params: { args },
            })
          : await api.get('deliverymans');
        return setDeliverymans(response.data);
      } catch (err) {
        return toast.error('Erro na lista');
      } finally {
        setLoading(false);
      }
    }

    loadDeliverymans();
  }, [args]);

  function handleSearch(data) {
    setArgs(data.args);
  }

  return (
    <Panel>
      <Title>Gerenciamento de Entregadores</Title>
      <Form onSubmit={handleSearch}>
        <HeaderContent>
          <SearchInput>
            <MdSearch />
            <Input type="text" name="arg" placeholder="Buscar por Entregador" />
          </SearchInput>
          <Link to="/entregadores/novo">
            <MdAdd size={16} />
            Cadastrar
          </Link>
        </HeaderContent>
      </Form>
      <TableStyle>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-Mail</th>
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
          {deliverymans.length === 0 && (
            <tr>
              <td style={{ textAlign: 'center' }} colSpan="4">
                <h3>Não há dados</h3>
              </td>
            </tr>
          )}

          {deliverymans.map(d => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.email}</td>
              <td>
                <MenuEdit
                  toEdit={`/entregadores/editar/${d.id}`}
                  toDel={`/entregadores/exluir/${d.id}`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </TableStyle>
    </Panel>
  );
}
