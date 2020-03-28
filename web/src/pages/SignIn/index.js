import React from 'react';

/* import { useDispatch, useSelector } from 'react-redux'; */
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import ImgComp from '~/components/Img';
import Input from '~/components/Form/Input';
/* import { signInRequest } from '~/store/modules/auth/actions'; */

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail')
    .required('O e-email é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function Signin() {
  /* const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading); */
  const loading = false;
  function handleSubmit({ email, password }) {
    console.tron.log(`email: ${email}, password: ${password}`);
    /* dispatch(signInRequest(email, password)); */
  }

  return (
    <>
      <ImgComp />
      <Form noValidate schema={schema} onSubmit={handleSubmit}>
        <label htmlFor="email">SEU E-MAIL</label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="exemplo@xxx.com"
        />
        <label htmlFor="password">SUA SENHA</label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="******"
        />

        <button type="submit">{loading ? 'Carregando...' : 'Acessar'}</button>

        <Link to="/register">Criar conta gratuita</Link>
      </Form>
    </>
  );
}
