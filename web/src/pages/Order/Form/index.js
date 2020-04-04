import * as Yup from 'yup';
import React, { useState, useEffect } from 'react';
import { Form } from '@unform/web';
import { useParams, Link } from 'react-router-dom';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { toast } from 'react-toastify';
import Input from '~/components/Form/Input';
import history from '~/services/history';

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
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [recipients, setRecipients] = useState([]);
  const [deliverymans, setDeliverymans] = useState([]);

  const [recipientselected, setRecipientselected] = useState(null);
  const [deliverymanselected, setDeliverymanselected] = useState(null);

  const schema = Yup.object().shape({
    id: Yup.number(),
    deliveryman_id: Yup.number().required('O Entregador é obrigatório'),
    recipient_id: Yup.number().required('O Destinatério é obrigatório'),
    product: Yup.string().required('O produto é obrigatório'),
  });

  async function loadRecipients(value) {
    try {
      const response = value
        ? await api.get('recipients', {
            params: { q: value },
          })
        : await api.get('recipients');
      const { data } = response;
      setRecipients(data);
      return new Promise(resolve => {
        resolve(data);
      });
    } catch (err) {
      return toast.error('Erro na lista Recipients');
    }
  }

  async function loadDeliverymans(value) {
    try {
      const response = value
        ? await api.get('deliverymans', {
            params: { q: value },
          })
        : await api.get('deliverymans');

      const { data } = response;

      setDeliverymans(data);
      return new Promise(resolve => {
        resolve(data);
      });
    } catch (err) {
      return toast.error('Erro na lista Deliverymans');
    }
  }

  useEffect(() => {
    loadRecipients();
    loadDeliverymans();
  }, []);

  useEffect(() => {
    async function loadOrder(i) {
      const response = await api.get(`orders/${i}`);
      setOrder(response.data);
      setRecipientselected(response.data.recipient);
      setDeliverymanselected(response.data.deliveryman);
    }
    if (id) {
      loadOrder(id);
    }
  }, [id]);

  async function handleSubmit(data) {
    try {
      if (id) {
        await api.put(`orders/${id}`, data);
        toast.success('Cadastro atualizado com sucesso');
      } else {
        await api.post('orders', data);
        toast.success('Cadastro efetuado com sucesso');
      }
      return history.push('/encomendas');
    } catch (error) {
      return toast.error('Erro não foi possível efetuar o cadastro');
    }
  }

  return (
    <Form schema={schema} initialData={order} onSubmit={handleSubmit}>
      <PanelForm>
        <PanelHeader>
          <Title>Cadastro de Encomendas</Title>
          <Link to="/encomendas">
            <MdKeyboardArrowLeft size={24} />
            Voltar
          </Link>
          <button type="submit">
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
                isClearable
                value={recipientselected}
                onChange={e => setRecipientselected(e)}
                asyncFunc={loadRecipients}
              />
            </PanelGroup>
            <PanelGroup>
              <label htmlFor="deliveryman">Entregador</label>
              <SelectAsync
                options={deliverymans}
                id="deliveryman"
                name="deliveryman_id"
                isClearable
                value={deliverymanselected}
                onChange={e => setDeliverymanselected(e)}
                asyncFunc={loadDeliverymans}
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
