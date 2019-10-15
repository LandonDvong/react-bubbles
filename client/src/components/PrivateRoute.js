import React from 'react';
import  { Route, Redirect } from 'react-router-dom';
import Login from './Login';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('token') ? (
        <Component {...props} />
      ) : (
        <Redirect to='/Login' />
      )
    }
  />
);

export default PrivateRoute;