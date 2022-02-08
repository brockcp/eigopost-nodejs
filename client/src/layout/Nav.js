import React,{useRef, useState, useEffect, useLayoutEffect} from 'react';
import {NavLink, Route, useLocation, useNavigate} from 'react-router-dom';
import {accountService} from '@/_services';
import {useOutsideClick, useOutsideClick2} from '../_helpers/HookRef';
import {Toggle} from '../_components/ThemeToggle';
import NavGuestLinks from './NavGuestLinks';
import {NavMobile} from './NavMobile';
import {PopoverProfile} from '../_components/PopoverProfile';
import {Role} from '@/_helpers';
import './Nav.css';

function Nav(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const user = accountService.userValue;
  const ref = useRef();
  const ref2 = useRef();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  function profilePageCheck(){
    if(location.pathname == '/profile'){
      setPopoverOpen(false);
    }else{
      setPopoverOpen(true);
    }
  }
  function logOut(){
    accountService.logout()
    navigate('/account/login');
  }
  useOutsideClick(ref, () =>{
    if(isModalOpen) setModalOpen(false);
  });
  useOutsideClick2(ref2, () =>{
    if(isPopoverOpen) setPopoverOpen(false);
  });

  return(
    <nav className="navbar navbar-expand-sm red">
      <div className="container">
        <button id="menuButton"
                className='navbar-toggler'
                ref={ref}
                onClick={()=>setModalOpen(!isModalOpen)}>
          <div className={`one ${isModalOpen ? 'close' : ''}`}/>
          <div className={`two ${isModalOpen ? 'close' : ''}`}/>
          <div className={`three ${isModalOpen ? 'close' : ''}`}/>
        </button>
        <NavLink exact="true" to="/"
                 className="navbar-brand">
          EigoPost
        </NavLink>
        <div className="collapse navbar-collapse">
          <div className="navbar-nav me-lg-auto mt-lg-0">
            <NavLink to="/about"
                     className="nav-item nav-link">
              About
            </NavLink>
            <NavLink to="/posts"
                     className="nav-item nav-link">
              Posts
            </NavLink>
          </div>
          {user &&
            <div className="navbar-nav ms-auto">
              {user.role === Role.User &&
                <div>
                <a className="nav-item nav-link user-link fade-in"
                   onClick={profilePageCheck}>
                    {user.userName}
                </a>
                <PopoverProfile isPopOpen={isPopoverOpen}
                                setPopOpen={setPopoverOpen}
                                popoverStyle={"popover-profile"}
                                popoverMessage={"profile & activity"}
                                ref2={ref2}
                />
                </div>
              }
              {user.role === Role.Admin &&
                <NavLink to="/admin"
                         className="nav-item nav-link fade-in">
                  Admin
                </NavLink>
              }
              <a onClick={logOut}
                 className="nav-item nav-link fade-in">
                LogOut
              </a>
            </div>
          }
          {!user &&
            <NavGuestLinks/>
          }
        </div>{/* END navbar-collapse */}
        <div className="themeToggle-container">
          <Toggle />
        </div>
      </div>{/* END container */}
      <NavMobile menuVis={isModalOpen}
                 user={user}
      />
    </nav>
  )
}
export {Nav};
