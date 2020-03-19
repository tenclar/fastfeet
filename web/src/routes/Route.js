import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';

import AuthLayout from '~/pages/_layouts/auth';
import DefaultLayout from '~/pages/_layouts/default';

/* import { store } from '~/store'; */

export default function routeWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  /* store.getState().auth; */
  const signed = true;
  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }
  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  const Layout = signed ? DefaultLayout : AuthLayout;

  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

routeWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};
routeWrapper.defaultProps = {
  isPrivate: false,
};
