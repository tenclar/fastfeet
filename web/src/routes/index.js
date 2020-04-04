import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import DeliveryManForm from '../pages/DeliveryMan/Form';
import DeliveryMan from '../pages/DeliveryMan';
import RecipientForm from '../pages/Recipient/Form';
import Recipient from '../pages/Recipient';
import Order from '../pages/Order';
import OrderForm from '../pages/Order/Form';
import Profile from '../pages/Profile';

import Problem from '../pages/Problem';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/dashboard" component={Dashboard} isPrivate />

      <Route
        path="/entregadores/editar/:id"
        component={DeliveryManForm}
        isPrivate
      />
      <Route path="/entregadores/novo" component={DeliveryManForm} isPrivate />
      <Route path="/entregadores" component={DeliveryMan} isPrivate />

      <Route
        path="/destinatarios/editar/:id"
        component={RecipientForm}
        isPrivate
      />
      <Route path="/destinatarios/novo" component={RecipientForm} isPrivate />
      <Route path="/destinatarios" component={Recipient} isPrivate />

      <Route path="/encomendas/editar/:id" component={OrderForm} isPrivate />
      <Route path="/encomendas/novo" component={OrderForm} isPrivate />
      <Route path="/encomendas" component={Order} isPrivate />

      <Route path="/problemas" component={Problem} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />

      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
