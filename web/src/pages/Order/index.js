import React, { useState, useEffect } from 'react';
import { MdSearch, MdAdd, MdLens } from 'react-icons/md';
import { format } from 'date-fns';
import { Form } from '@unform/web';
import RandomColor from 'randomcolor';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ptBr from 'date-fns/locale/pt-BR';
import Menu from '~/components/Menu';
import Title from '~/components/Title';
import { SearchInput, HeaderContent } from '~/components/SearchInput';
import { TableStyle, TableImg, ColumnStatus } from '~/components/Table';
import Input from '~/components/Form/Input';
import { Panel } from '~/components/Panel';
import Modal from '~/components/Dialog';
import assinatura from '~/assets/assinatura.png';
import loadingGif from '~/assets/ajax-loader.gif';
import api from '~/services/api';

export default function Order() {
  const [visible, setVisible] = useState();
  const [order, setOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [args, setArgs] = useState(null);

  useEffect(() => {
    async function loadOrders() {
      try {
        setLoading(true);
        const response = args
          ? await api.get('orders', {
              params: { args },
            })
          : await api.get('orders');

        return setOrders(response.data);
      } catch (err) {
        return toast.error('Erro na lista');
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, [args]);

  function handleSearch(data) {
    setArgs(data.args);
  }

  const coresl = RandomColor({
    count: 200,
    luminosity: 'light',
    hue: 'blue',
  }).map(v => v.replace('#', ''));

  const coresd = RandomColor({
    count: 200,
    luminosity: 'dark',
    hue: 'blue',
  }).map(v => v.replace('#', ''));

  function handleView(id) {
    console.tron.log(id);
    async function loadOrder(i) {
      const response = await api.get(`orders/${i}`);
      setOrder(response.data);
    }
    if (id) {
      loadOrder(id);
    }
    setVisible(!visible);
  }

  // setCores(listacores);

  // console.tron.log(listacores[0]);

  return (
    <>
      <Panel>
        <Title>Gerenciamento de encomendas</Title>

        <Form onSubmit={handleSearch}>
          <HeaderContent>
            <SearchInput>
              <MdSearch />
              <Input
                type="text"
                name="arg"
                placeholder="Buscar por encomendas"
              />
            </SearchInput>
            <Link to="/encomendas/novo">
              <MdAdd size={16} />
              Cadastrar
            </Link>
          </HeaderContent>
        </Form>
        <TableStyle>
          <thead>
            <tr>
              <th>ID</th>
              <th>Destinatário</th>
              <th>Entregador</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>status</th>
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
            {orders.length === 0 && (
              <tr>
                <td style={{ textAlign: 'center' }} colSpan="4">
                  <h3>Não há dados</h3>
                </td>
              </tr>
            )}
            {orders.map(o => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.recipient.name}</td>
                <td>
                  <TableImg>
                    <img
                      alt={o.deliveryman.name}
                      src={`https://ui-avatars.com/api/?font-size=0.33&&name=${
                        o.deliveryman.name
                      }&color=${coresd[o.id]}&background=${
                        coresl[o.id]
                      }&bold=true&rounded=true`}
                    />
                    <span>{o.deliveryman.name}</span>
                  </TableImg>
                </td>

                <td>{o.recipient.city}</td>
                <td>{o.recipient.state}</td>
                <td>
                  <ColumnStatus
                    isCancel={o.status === 'CANCELADA'}
                    isEntrege={o.status === 'ENTREGE'}
                    isRetirada={o.status === 'RETIRADA'}
                  >
                    <MdLens size={16} style={{ marginRight: '5px' }} />
                    {o.status}
                  </ColumnStatus>
                </td>
                <td>
                  <Menu
                    onClick={() => handleView(o.id)}
                    toEdit={`/encomendas/editar/${o.id}`}
                    toDel={`/encomendas/exluir/${o.id}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </TableStyle>
      </Panel>
      <Modal visible={visible} onClick={() => handleView()}>
        {order && (
          <>
            <h3> Informações da Encomenda </h3>
            <p>{`${order.recipient.street}, ${order.recipient.number}`}</p>
            <p>{`${order.recipient.city}-${order.recipient.state}`}</p>

            <p>{`${order.recipient.cep}`}</p>
            <hr />
            <h3> datas </h3>
            <p>
              <strong>Retirada:</strong>
              {order.recipient.date_start && (
                <>
                  {`${format(
                    order.recipient.date_start,
                    "d '/' MMMM '/' YYYY",
                    {
                      locale: ptBr,
                    }
                  )}`}
                </>
              )}
            </p>
            <p>
              <strong>Entrega:</strong>
              {order.recipient.date_and && (
                <>
                  {`${format(order.recipient.date_and, "d '/' MMMM '/' YYYY", {
                    locale: ptBr,
                  })}`}
                </>
              )}
            </p>
            <hr />
            <h3> Assinatura do Destinatário </h3>
            <img src={assinatura} alt="assinatura" />
          </>
        )}
      </Modal>
    </>
  );
}
