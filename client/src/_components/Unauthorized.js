import React from 'react';
import notFoundLogo from '../assets/img-logo-404.png';

const Unauthorized = () => {
  document.title = "Eigopost | Unauthorized"
  return (
    <div className="container unauthorized text-center">
      <img src={notFoundLogo}
           className="logo-404 fade-in"
           alt="unauthorized-logo"
      />
      <h3>
      This page is only accessible to administrators.
      </h3>
    </div>
  );
}
export {Unauthorized};
