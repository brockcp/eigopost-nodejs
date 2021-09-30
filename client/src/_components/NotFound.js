import React from 'react';
import notFoundLogo from '../assets/img-404.svg';

const NotFound = () => {
  document.title = "Eigopost | Not Found"
  return (
    <div className="container text-center">
        <img src={notFoundLogo}
             className="logo-404 fadein"
             alt="logo"
        />
        <p>Oh No... We Cannot find that page!!</p>
    </div>
  );
}
export {NotFound};
