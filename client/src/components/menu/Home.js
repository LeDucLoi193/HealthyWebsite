import React, { useEffect, useContext } from 'react';

import {LoginContext} from '../../contexts/login';
import catchError from '../../errors/error'
const axios = require('axios')

const Home = () => {
  const [isLogin, setIsLogin] = useContext(LoginContext);
  useEffect( () => {
    axios.get(`http://localhost:8080/get-home`, 
    {
      withCredentials: true,
      credentials: 'include'
    })
    .then((res) => {
      setIsLogin(true)
    })
    .catch((err) => {
      console.log(err)
      catchError(err);
    })
  }, [])
  return (
    <div>
      <h1>Hello</h1>
    </div> 
  );
}

export default Home;