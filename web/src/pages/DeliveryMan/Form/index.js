import * as Yup from 'yup';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import history from '~/services/history';
import Input from '~/components/Form/Input';
import AvatarInput from './AvatarInput';

import { PanelForm, PanelHeader, PanelBody, Title } from '~/components/Panel';

import api from '~/services/api';

const schema = Yup.object().shape({
  id: Yup.number(),
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string().required('O emai é obrigatório'),
});

export default function Forms() {
  const [deliveryman, setDeliveryman] = useState({});

  const { id } = useParams();

  useEffect(() => {
    async function loadDeliveryman(i) {
      const response = await api.get(`deliverymans/${i}`);
      setDeliveryman(response.data);
    }
    if (id) {
      loadDeliveryman(id);
    }
  }, [id]);

  async function handleSubmit(data) {
    // if (id) console.tron.log(data);

    try {
      if (id) {
        await api.put(`deliverymans/${id}`, data);
        toast.success('Cadastro atualizado com sucesso');
      } else {
        await api.post('deliverymans', data);
        toast.success('Cadastro efetuado com sucesso');
      }
      return history.push('/entregadores');
    } catch (error) {
      return toast.error('Erro não foi possível efetuar o cadastro');
    }
  }
  return (
    <Form schema={schema} initialData={deliveryman} onSubmit={handleSubmit}>
      <Input name="id" type="hidden" />

      <PanelForm>
        <PanelHeader>
          <Title>Cadastro de Entregadores</Title>
          <Link to="/entregadores">
            <MdKeyboardArrowLeft size={24} />
            Voltar
          </Link>
          <button type="submit">
            <MdDone size={24} />
            Salvar
          </button>
        </PanelHeader>

        <PanelBody>
          <AvatarInput name="avatar_id" />
          <label htmlFor="name">Nome</label>
          <Input id="name" name="name" />
          <label htmlFor="email">E-Mail</label>
          <Input id="email" name="email" />
        </PanelBody>
      </PanelForm>
    </Form>
  );
}
