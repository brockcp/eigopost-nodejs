import React from 'react';
import notFoundLogo from '../assets/img-404.svg';

const Error= () => {
  document.title = "Eigopost | Error"
  return (
    <div className="container text-center">
        <img src={notFoundLogo}
             className="logo-404 fade-in"
             alt="logo"
        />
        <h3 className="">Oops! Please try again or go back.</h3>
    </div>
  );
}
export {Error};
