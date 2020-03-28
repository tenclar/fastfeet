import React, { useState, useEffect } from 'react';
import { Form } from '@unform/web';
import { Link } from 'react-router-dom';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { toast } from 'react-toastify';
import Input from '~/components/Form/Input';
import SelectReact from '~/components/Form/Select';
import SelectAsync from '~/components/Form/SelectAsync';
import {
  PanelForm,
  PanelHeader,
  PanelBody,
  PanelGrid,
  PanelGroup,
  Title,
} from '~/components/Panel';
import api from '~/services/api';

export default function Forms() {
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    async function loadRecipients() {
      try {
        const response = await api.get('recipients');
        return setRecipients(response.data);
      } catch (err) {
        return toast.error('Erro na lista');
      }
    }

    loadRecipients();
  }, []);

  const options = [
    {
      value: 1,
      label: 'Entregador 1',
    },
    {
      value: 2,
      label: 'Entregador 2',
    },
  ];
  function handleSubmit(data) {
    console.tron.log(data);
  }
  return (
    <Form onSubmit={handleSubmit}>
      <PanelForm>
        <PanelHeader>
          <Title>Cadastro de Encomendas</Title>
          <Link to="/encomendas">
            <MdKeyboardArrowLeft size={24} />
            Voltar
          </Link>
          <button type="button">
            <MdDone size={24} />
            Salvar
          </button>
        </PanelHeader>

        <PanelBody>
          <PanelGrid>
            <PanelGroup style={{ marginRight: '20px' }}>
              <label htmlFor="recipient">Destinatário</label>
              <SelectAsync
                options={recipients}
                id="recipient"
                name="recipient_id"
                getOptionValue={option => option.id}
                getOptionLabel={option => option.title}
              />
            </PanelGroup>
            <PanelGroup>
              <label htmlFor="deliveryman">Entregador</label>
              <SelectReact
                options={options}
                id="deliveryman"
                name="deliveryman"
              />
            </PanelGroup>
          </PanelGrid>

          <label htmlFor="product">Produto</label>
          <Input id="product" name="product" />
        </PanelBody>
      </PanelForm>
    </Form>
  );
}
