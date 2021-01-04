import React, {Component, useState, useEffect} from 'react';

import Blog from './Blog';
import {Tag} from 'antd';

import '../../styles/blog.css';


const axios = require("axios");
// var title, tag, heading, content1, content2;
// title="Ha Noi Dit Con Me May Luon";
// tag="BMI";
// heading="ha noi thu bay phai len do, len xem dan to via ben ho";
// content1="nguoui choi he phong minh xam tro, dang dua bi chot be len don,m a luio ngs ofabfl ahfuiads fuiewa ifeawu ifgi uaewf iuaw eaer uai rgf ui ae faer useggh seurg nguoui choi he phong minh xam tro, dang dua bi chot be len don,m a lu io ngso fa bfl ahfu ia ds fui ewa if eawu ifg iua ewf iu awea erua irgfuiae faer useggh seurg nguoui choi he phong minh xam tro, dang dua bi chot be len don,m a luio ngso fabfl ahfuiads fuie wa ifea wui fgiu aewf iua weaer uai rgfu iae faer useggh seurg nguoui choi he phong minh xam tro, dang dua bi chot be len don,m a luion gso fabfl ahfu iads fuiewa ife awui fgiu aew fiua wea eruai rgf uiae faer useggh seurg"
// content2="nguoui choi he phong minh xam tro, dang dua bi chot be len don,m a luio ngs ofabfl ahfuiads fuiewa ifeawu ifgi uaewf iuaw eaer uai rgf ui ae faer useggh seurg nguoui choi he phong minh xam tro, dang dua bi chot be len don,m a lu io ngso fa bfl ahfu ia ds fui ewa if eawu ifg iua ewf iu awea erua irgfuiae faer useggh seurg nguoui choi he phong minh xam tro, dang dua bi chot be len don,m a luio ngso fabfl ahfuiads fuie wa ifea wui fgiu aewf iua weaer uai rgfu iae faer useggh seurg nguoui choi he phong minh xam tro, dang dua bi chot be len don,m a luion gso fabfl ahfu iads fuiewa ife awui fgiu aew fiua wea eruai rgf uiae faer useggh seurg"

const ShowBlog = (props) =>{
  const [data, setData] = useState([]);

  //console.log(window.location.href);
  let link = window.location.href;
  let url = link.replace('3000', '8080');
  useEffect( () => {
    axios.get(url)
      .then((res)=>{
        let renderData =[];
          const obj ={
            id: res.data.data[0],
            title: res.data.data[1],
            heading: res.data.data[2],
            content1: res.data.data[3],
            content2: res.data.data[4],
            tag: res.data.data[5],
            img: res.data.data[6]
          }

        renderData.push(res);
        // }
        // // console.log(renderData);
        setData(res.data.data);
        console.log(res.data.data)
        console.log(data)
      })
      .catch((err)=>{
        throw err;
      })
  }, [])

    return (
      <div>
        <Blog dataState = {data}/>
      </div>
    );
  }

export default ShowBlog;