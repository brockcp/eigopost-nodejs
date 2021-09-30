import React from 'react';
import {NavLink, Link} from 'react-router-dom';

const Footer = () => {
  return(
    <footer>
      <div className="container-fluid bg-3d">
        <div className="row">
          <div className="col">
              <div className="d-flex pt-4">
                <ul className="mx-auto list-unstyled">
                  <Link to="/contact" className="color-3l-link d-block p-1">Contact</Link>
                  <Link to="/terms" className="color-3l-link d-block p-1">Terms</Link>
                </ul>
              </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-center color-2">
              <p className="pt-5 color-3l">© 2021 <strong><NavLink to="/" className="color-3l-link">EigoPost.com</NavLink></strong></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
export {Footer};
