import React from 'react';
import notFoundLogo from '../assets/img-404.svg';

const Unauthorized = () => {
  document.title = "Eigopost | Unauthorized"
  return (
    <div className="container text-center fade-in">
        <img src={notFoundLogo}
             className="logo-404 fade-in"
             alt="logo"
        />
        <p>You do not have permission to access that page.</p>
    </div>
  );
}
export {Unauthorized};
