import React from 'react';
import { MdSearch, MdAdd } from 'react-icons/md';
import { Form } from '@unform/web';
import Title from '~/styles/Title';
import { SearchInput, SearchContent } from '~/styles/SearchInput';
import Input from '~/components/Input';
import { Panel } from '~/components/Panel';

export default function Order() {
  return (
    <Panel>
      <Title>Gerenciamento de encomendas</Title>

      <Form>
        <SearchContent>
          <SearchInput>
            <MdSearch />
            <Input name="arg" placeholder="Buscar por encomendas" />
          </SearchInput>
          <button type="submit">
            <MdAdd size={16} />
            Cadastrar
          </button>
        </SearchContent>
      </Form>
    </Panel>
  );
}
