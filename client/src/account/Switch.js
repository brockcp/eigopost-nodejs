import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Login } from './Login';
import { Register } from './Register';
import { VerifyEmail } from './VerifyEmail';
import { ForgotPassword } from './ForgotPassword';
import { ResetPassword } from './ResetPassword';

function Account({ history, match }) {
  const { path } = match;
  const NotFoundRedirect = () => <Redirect to="/not-found" />
  return (
    <div className="accounts-form">
      <Switch>
        <Route path={`${path}/login`} component={Login} />
        <Route path={`${path}/register`} component={Register} />
        <Route path={`${path}/verify-email`} component={VerifyEmail} />
        <Route path={`${path}/forgot-password`} component={ForgotPassword} />
        <Route path={`${path}/reset-password`} component={ResetPassword} />
        <Route component={NotFoundRedirect} />
      </Switch>
    </div>
  );
}
export { Account };
