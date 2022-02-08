import React,{useState, useEffect} from 'react';
import {accountService} from '@/_services';
import {Navigate} from 'react-router-dom';
import {Loader} from '../_components/Loader';

const AuthCheck = () => {
  const user = accountService.userValue;
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
      let timer1 = setTimeout(() => {
        setLoading(false);
      },5000);
      return () => {
      clearTimeout(timer1);
    };
    },
  []);
  if(loading){
    return <Loader/>
  }
  if(!loading && !user){
    return <Navigate to='/account/login' />
  }
  return null;
}

export default AuthCheck;
