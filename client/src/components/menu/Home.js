import React, { useEffect, useContext, useState } from 'react';

import {LoginContext} from '../../contexts/login';
import catchError from '../../errors/error'
import SmallBlog from './SmallBlog'
import {Card, Col, Row, Tag} from 'antd';

import '../../styles/home.css'

const axios = require('axios')

const Home = () => {
  const [isLogin, setIsLogin] = useContext(LoginContext);
  const [data, setData] = useState([]);
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

    axios.get(`http://localhost:8080/blog`)
      .then((res)=>{
        let renderData =[];
        //console.log(res.data.data);
        for(const element of res.data.data){
          const obj ={
            id: element[0],
            title: element[1],
            heading: element[2],
            content1: element[3],
            content2: element[4],
            tag: element[5],
            img: element[6]
          }

          renderData.push(obj);
        }
        console.log(res.data.data);
        setData(renderData);
        console.log(data)
      })
      .catch((err)=>{
        throw err;
      })
  }, [])

  return (
    <div>
      {data.map((dat)=> <SmallBlog title = {dat.title} tag = {dat.tag} heading = {dat.heading} id = {dat.id}/>)}
    </div>
  );
}

export default Home;