import React, { useRef } from 'react';

const axios = require('axios');

const Home = () => {
  const pRef = useRef('Bye');
  const sendHello = () => {
    axios.get('http://localhost:8080/get-home', {
      withCredentials: true
    })
    .then((res) => {
      console.log(res)
      pRef.current.textContent = res.data;
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <div>
      <h1>Login successfully.</h1>
      <button onClick={() => sendHello()}>Hello</button>
      <p ref={pRef}>{pRef.current}</p>
    </div>
  );
}

export default Home;