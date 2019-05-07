import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TokenService from '../services/token-service';
import Nav from '../Components/Nav';

export default function PrivateRoute({ component, ...props }) {
  const Component = component;
  return (
    <Route
    {...props}
    render={componentProps =>
      TokenService.hasAuthToken() ? (
        <>
        <Nav {...componentProps} />
          <Component {...componentProps} />
          </>
        ) : (
          <Redirect
            to={{
              pathname: '/', //this will change when we decide where splash screen will live
              state: { from: componentProps.location }
            }}
          />
        )
      }
    />
  );
}