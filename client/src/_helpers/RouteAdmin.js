import React,{useState,useEffect} from 'react';
import {Route, Navigate} from 'react-router-dom';
import {accountService} from '@/_services';
import {Loader} from '../_components/Loader';

function RouteAdmin({children, roles}){
  const user = accountService.userValue;
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

  if(!show){
    return <Loader/>
  }
  if (show && !user) {
    return <Navigate to='/account/login' />
  }
  if (show && roles && roles.indexOf(user.role) === -1) {
    return <Navigate to='/unauthorized' />
  }
  return children
}
export {RouteAdmin};
