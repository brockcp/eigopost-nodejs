import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import {Toggle} from './ThemeToggle';

const Footer = () => {
  return(
    <footer>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
              <div className="d-flex pt-4">
                <ul className="mx-auto list-unstyled">
                  <Link to="/contact" className="d-block p-1">Contact</Link>
                  <Link to="/terms" className="d-block p-1">Terms</Link>
                </ul>
              </div>
              <Toggle />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-center">
              <p className="pt-5">© 2021 <strong><NavLink to="/" className="">EigoPost.com</NavLink></strong></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
export {Footer};
