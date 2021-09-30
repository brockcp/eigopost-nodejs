import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {accountService} from '@/_services';

function PrivateRoute({component: Component, roles, ...rest}) {
  return (
    <Route {...rest} render={props => {
      const user = accountService.userValue;
      if (!user) {
        return <Redirect to={{ pathname: '/account/login'}} />
      }
      if (roles && roles.indexOf(user.role) === -1) {
        return <Redirect to={{ pathname: '/admin'}} />
      }
      // if authorized return component
      return <Component {...props} />
    }} />
  );
}
export {PrivateRoute};
