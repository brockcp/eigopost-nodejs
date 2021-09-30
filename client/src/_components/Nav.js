import React,{useRef, useState, useEffect} from 'react';
import {NavLink, Route, useLocation } from 'react-router-dom';
import {accountService} from '@/_services';
import {useOutsideClick, useOutsideClick2} from '../_helpers/hook-ref';
import {NavMobile} from './NavMobile';
import {ProfilePopover} from './ProfilePopover';
import {Role} from '@/_helpers';

function Nav(props) {
  const location = useLocation();
  const [user, setUser] = useState({});
  const ref = useRef();
  const ref2 = useRef();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  useEffect(() => {
    const subscription = accountService.user.subscribe(x => setUser(x));
    return subscription.unsubscribe;
  }, []);

  function profilePageCheck(){
    if(location.pathname == '/profile'){
      setPopoverOpen(false);
    }else{
      setPopoverOpen(true);
    }
  }

  useOutsideClick(ref, () =>{
    if(isModalOpen) setModalOpen(false);
  });
  useOutsideClick2(ref2, () =>{
    if(isPopoverOpen) setPopoverOpen(false);
  });

  return(
    <nav className="navbar navbar-expand-sm">
      <div className="container">
        <button id="menuButton"
                className='navbar-toggler'
                ref={ref}
                onClick={()=>setModalOpen(!isModalOpen)}>
          <div className={`one ${isModalOpen ? 'close' : ''}`}/>
          <div className={`two ${isModalOpen ? 'close' : ''}`}/>
          <div className={`three ${isModalOpen ? 'close' : ''}`}/>
        </button>
        <NavLink exact to="/" className="navbar-brand">EigoPost</NavLink>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <div className="navbar-nav mr-auto mt-lg-0">
            <NavLink to="/about" className="nav-item nav-link">About</NavLink>
            <NavLink to="/posts" className="nav-item nav-link">Posts</NavLink>
          </div>
          {user ? (
            <div className="navbar-nav ml-auto">
              <a className="nav-item nav-link"
                 onClick={profilePageCheck}>
                  {user.userName}
              </a>
              <ProfilePopover isPopOpen={isPopoverOpen}
                              setPopOpen={setPopoverOpen}
                              ref2={ref2}/>
              {user.role === Role.Admin &&
                <NavLink to="/admin" className="nav-item nav-link">Users</NavLink>
              }
              <a onClick={accountService.logout} className="nav-item nav-link">LogOut</a>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <NavLink exact to="/account/login" className="nav-item mr-auto nav-link">Login</NavLink>
              <NavLink exact to="/account/register" className="nav-item mr-auto nav-link">Sign Up</NavLink>
            </div>
          )}

        </div>
      </div>
      <NavMobile menuVis={isModalOpen}
                 user={user}
      />
    </nav>
  )
}
export {Nav};