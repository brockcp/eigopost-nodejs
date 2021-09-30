import React from 'react';
import notFoundLogo from '../assets/img-404.svg';

const Error= () => {
  document.title = "Eigopost | Error"
  return (
    <div className="container text-center">
        <img src={notFoundLogo}
             className="logo-404 fadein"
             alt="logo"
        />
        <p>Oops! Please try again or go back.</p>
    </div>
  );
}
export {Error};
