import React,{useState,useEffect} from 'react'
import {NavLink} from 'react-router-dom';

const NavGuestLinks = () => {
  const [show, setShow] = useState(false);
  useEffect(
    ()=>{
      let timer1 = setTimeout(() => {
        setShow(true);
      },1000);
      return () => {
      clearTimeout(timer1);
    };
    },
  []);

  if(!show) return null;
  return(
    <div className="navbar-nav ms-auto fade-in2">
      <NavLink exact="true" to="/account/login"
               className="nav-item mr-auto nav-link">
        Login
      </NavLink>
      <NavLink exact="true" to="/account/register"
               className="nav-item mr-auto nav-link">
        Sign Up
      </NavLink>
    </div>
  )
}
export default NavGuestLinks;
