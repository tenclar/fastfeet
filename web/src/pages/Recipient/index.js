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

export default function Recipient() {
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [args, setArgs] = useState(null);

  useEffect(() => {
    async function loadRecipients() {
      try {
        setLoading(true);
        const response = args
          ? await api.get('recipients', {
              params: { args },
            })
          : await api.get('recipients');
        return setRecipients(response.data);
      } catch (err) {
        return toast.error('Erro na lista');
      } finally {
        setLoading(false);
      }
    }

    loadRecipients();
  }, [args]);

  function handleSearch(data) {
    setArgs(data.args);
  }

  return (
    <Panel>
      <Title>Gerenciamento de Destinatários</Title>

      <Form onSubmit={handleSearch}>
        <HeaderContent>
          <SearchInput>
            <MdSearch />
            <Input
              type="text"
              name="arg"
              placeholder="Buscar por Destinatário"
            />
          </SearchInput>
          <Link to="/destinatarios/novo">
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
            <th>Endereço</th>
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
          {recipients.length === 0 && (
            <tr>
              <td style={{ textAlign: 'center' }} colSpan="4">
                <h3>Não há dados</h3>
              </td>
            </tr>
          )}

          {recipients.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.name}</td>
              <td>{`${r.street}, nº ${r.number}, ${r.city} - ${r.state}. CEP: ${r.cep} `}</td>
              <td>
                <MenuEdit
                  toEdit={`/destinatarios/editar/${r.id}`}
                  toDel={`/destinatarios/exluir/${r.id}`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </TableStyle>
    </Panel>
  );
}
