import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return(
    <footer>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
              <div className="footer-links">
                <ul>
                  <Link to="/contact">Contact</Link>
                  <Link to="/terms-of-use">Terms of Use</Link>
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </ul>
              </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="footer-copyright">
              <p className="">© 2022
                <strong>
                  <NavLink to="/">
                    EigoPost.com
                  </NavLink>
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
export {Footer};
