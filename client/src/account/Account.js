import React from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { Login } from './Login';
import { Register } from './Register';
import { VerifyEmail } from './VerifyEmail';
import { ForgotPassword } from './ForgotPassword';
import { ResetPassword } from './ResetPassword';

function Account() {
  const NotFoundRedirect = () => <Navigate replace to="/not-found" />
  return (
    <div className="accounts-form">
      <Routes>
        <Route path='login' element={<Login/>} />
        <Route path='register' element={<Register/>} />
        <Route path='verify-email' element={<VerifyEmail/>} />
        <Route path='forgot-password' element={<ForgotPassword/>} />
        <Route path='reset-password' element={<ResetPassword/>} />
        <Route element={<NotFoundRedirect/>} />
      </Routes>
    </div>
  );
}
export { Account };
