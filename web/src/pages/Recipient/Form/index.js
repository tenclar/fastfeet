import * as Yup from 'yup';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import history from '~/services/history';
import Input from '~/components/Form/Input';

import {
  PanelForm,
  PanelHeader,
  PanelBody,
  PanelGrid,
  PanelGroup,
  Title,
} from '~/components/Panel';

import api from '~/services/api';

const schema = Yup.object().shape({
  id: Yup.number(),
  name: Yup.string().required('O nome é obrigatório'),
  street: Yup.string().required('A rua é obrigatória'),
  number: Yup.string().required('O número é obrigatório'),
  city: Yup.string().required('a cidade é obrigatória'),
  state: Yup.string().required('O estado é obrigatório'),
  cep: Yup.string().required('O CEP é obrigatório'),
  complement: Yup.string(),
});

export default function Forms() {
  const [recipient, setRecipient] = useState({});

  const { id } = useParams();

  useEffect(() => {
    async function loadRecipient(i) {
      const response = await api.get(`recipients/${i}`);
      setRecipient(response.data);
    }
    if (id) {
      loadRecipient(id);
    }
  }, [id]);

  async function handleSubmit(data) {
    // if (id) console.tron.log(data);

    try {
      if (id) {
        await api.put(`recipients/${id}`, data);
        toast.success('Cadastro atualizado com sucesso');
      } else {
        await api.post('recipients', data);
        toast.success('Cadastro efetuado com sucesso');
      }
      return history.push('/destinatarios');
    } catch (error) {
      return toast.error('Erro não foi possível efetuar o cadastro');
    }
  }
  return (
    <Form schema={schema} initialData={recipient} onSubmit={handleSubmit}>
      <Input name="id" type="hidden" />
      <PanelForm>
        <PanelHeader>
          <Title>Cadastro de Encomendas</Title>
          <Link to="/destinatarios">
            <MdKeyboardArrowLeft size={24} />
            Voltar
          </Link>
          <button type="submit">
            <MdDone size={24} />
            Salvar
          </button>
        </PanelHeader>

        <PanelBody>
          <label htmlFor="name">Nome</label>
          <Input id="name" name="name" />
          <PanelGrid>
            <PanelGroup style={{ marginRight: '20px' }}>
              <label htmlFor="street">Rua</label>
              <Input id="street" name="street" />
            </PanelGroup>
            <PanelGroup style={{ width: '60px', marginRight: '20px' }}>
              <label htmlFor="number">Número</label>
              <Input id="number" name="number" />
            </PanelGroup>
            <PanelGroup style={{ width: '200px' }}>
              <label htmlFor="complement">Complemento</label>
              <Input id="complement" name="complement" />
            </PanelGroup>
          </PanelGrid>
          <PanelGrid>
            <PanelGroup style={{ marginRight: '20px' }}>
              <label htmlFor="city">Cidade</label>
              <Input id="city" name="city" />
            </PanelGroup>
            <PanelGroup style={{ marginRight: '20px' }}>
              <label htmlFor="state">Estado</label>
              <Input id="state" name="state" />
            </PanelGroup>
            <PanelGroup>
              <label htmlFor="cep">CEP</label>
              <Input id="cep" name="cep" />
            </PanelGroup>
          </PanelGrid>
        </PanelBody>
      </PanelForm>
    </Form>
  );
}
