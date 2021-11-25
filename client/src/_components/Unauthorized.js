import React from 'react';
import notFoundLogo from '../assets/img-logo-404.png';

const Unauthorized = () => {
  document.title = "Eigopost | Unauthorized"
  return (
    <div className="container unauthorized text-center fade-in">
        <img src={notFoundLogo}
             className="logo-404 fade-in"
             alt="logo"
        />
        <h3>You do not have permission to access that page.</h3>
    </div>
  );
}
export {Unauthorized};
