import React, { useState } from 'react';
import { MdSearch, MdAdd, MdMoreHoriz } from 'react-icons/md';
import { Form } from '@unform/web';
import RandomColor from 'randomcolor';
import { Link } from 'react-router-dom';
import Menu from '~/components/Menu';
import Title from '~/components/Title';
import { SearchInput, HeaderContent } from '~/components/SearchInput';
import { TableStyle, TableImg } from '~/components/Table';
import Input from '~/components/Form/Input';
import { Panel } from '~/components/Panel';
import Modal from '~/components/Dialog';
import assinatura from '~/assets/assinatura.png';

export default function Order() {
  const [visible, setVisible] = useState();

  const coresl = RandomColor({
    count: 5,
    luminosity: 'light',
    hue: 'blue',
  }).map(v => v.replace('#', ''));

  const coresd = RandomColor({
    count: 5,
    luminosity: 'dark',
    hue: 'blue',
  }).map(v => v.replace('#', ''));

  function handleView() {
    setVisible(!visible);
  }

  // setCores(listacores);

  // console.tron.log(listacores[0]);

  return (
    <>
      <Panel>
        <Title>Gerenciamento de encomendas</Title>

        <Form>
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
            <tr>
              <td>1</td>
              <td>Ludwin van Beethover</td>
              <td>
                <TableImg>
                  <img
                    alt="Gaspar Antunes"
                    src={`https://ui-avatars.com/api/?font-size=0.33&color=${coresd[0]}&background=${coresl[0]}&bold=true&rounded=true&name=Gaspar Antunes`}
                  />
                  <span>Jonh Doe</span>
                </TableImg>
              </td>
              <td>Rio do Sul</td>
              <td>Santa Catarina</td>
              <td>Entregue</td>
              <td>
                <Menu
                  onClick={handleView}
                  toEdit="/encomendas/editar/id"
                  toDel="/encomendas/exluir/id"
                />
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Wolfgang Amadeus</td>
              <td>
                <TableImg>
                  <img
                    alt="Gaspar Antunes"
                    src={`https://ui-avatars.com/api/?font-size=0.33&color=${coresd[1]}&background=${coresl[1]}&bold=true&rounded=true&name=Gaspar Antunes`}
                  />
                  <span>Gaspar Antunes</span>
                </TableImg>
              </td>
              <td>Rio do Sul</td>
              <td>Santa Catarina</td>
              <td>Pendente</td>
              <td>
                <MdMoreHoriz size={16} />
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Johann Sebastian Bach</td>
              <td>
                <TableImg>
                  <img
                    alt="Gaspar Antunes"
                    src={`https://ui-avatars.com/api/?font-size=0.33&color=${coresd[2]}&background=${coresl[2]}&bold=true&rounded=true&name=Gaspar Antunes`}
                  />
                  <span>Dai Jiang</span>
                </TableImg>
              </td>
              <td>Rio Branco</td>
              <td>Acre</td>
              <td>Retirada</td>
              <td>
                <MdMoreHoriz size={16} />
              </td>
            </tr>
          </tbody>
        </TableStyle>
      </Panel>
      <Modal visible={visible} onClick={handleView}>
        <h3> Informações da Encomenda </h3>

        <p>Rua Bethoven, 1729</p>
        <p>Diadema -SP</p>
        <p>69919-688</p>
        <hr />
        <h3> datas </h3>
        <p>
          <strong>Retirada:</strong> 25/1/2020
        </p>
        <p>
          <strong>Entrega:</strong> 25/1/2020
        </p>
        <hr />
        <h3> Assinatura do Destinatário </h3>
        <img src={assinatura} alt="assinatura" />
      </Modal>
    </>
  );
}
