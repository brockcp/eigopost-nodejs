import React from 'react';
import {NavLink} from 'react-router-dom';
import {accountService} from '@/_services';

const NavMobile = (props) => {
  const {user, menuVis} = props;
  let visibility = "hide";
  if (menuVis) {
    visibility = "show";
  }
  return (
    <div id="slideMenu"
         className={visibility}>
      <div>
         <NavLink to="/about"
                  className="nav-item nav-link">
            About
         </NavLink>
         <NavLink to="/posts"
                  className="nav-item nav-link">
            Posts
         </NavLink>
      </div>
      {user ? (
         <div>
            <NavLink to="/profile"
                     className="nav-item nav-link">
              {user.userName}
            </NavLink>
            <a onClick={accountService.logout}
               className="nav-item nav-link">
             LogOut
            </a>
         </div>
         ) : (
         <div>
            <NavLink exact to="/account/login"
                     className="nav-item mr-auto nav-link">
              Login
            </NavLink>
            <NavLink exact to="/account/register"
                     className="nav-item mr-auto nav-link">
              Sign Up
            </NavLink>
         </div>
      )}
    </div>
  );
}
export {NavMobile};
