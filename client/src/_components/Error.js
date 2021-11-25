import React from 'react';
import notFoundLogo from '../assets/img-logo-404.png';

const Error= () => {
  document.title = "Eigopost | Error"
  return (
    <div className="container error text-center fade-in">
        <img src={notFoundLogo}
             className="logo-404 fade-in"
             alt="logo"
        />
        <h3>Oops! Please refresh your browser or go back.</h3>
    </div>
  );
}
export {Error};
