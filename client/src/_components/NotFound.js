import React from 'react';
import notFoundLogo from '../assets/img-404.svg';

const NotFound = () => {
  document.title = "Eigopost | Not Found"
  return (
    <div className="container not-found text-center fade-in">
        <img src={notFoundLogo}
             className="logo-404 fade-in"
             alt="logo"
        />
        <h3 className="">Oh 404! We cannot find that page!</h3>
    </div>
  );
}
export {NotFound};
