import React, {useState} from 'react';

import Navbar from '../menu/Navbar';
import {Tag} from 'antd';

import '../../styles/blog.css';

var title, tag, heading, content1, content2;
title="Ha Noi Dit Con Me May Luon";
tag="BMI";
heading="ha noi thu bay phai len do, len xem dan to via ben ho";
content1="nguoui choi he phong minh xam tro, dang dua bi chot be len don,m a luio ngs ofabfl ahfuiads fuiewa ifeawu ifgi uaewf iuaw eaer uai rgf ui ae faer useggh seurg nguoui choi he phong minh xam tro, dang dua bi chot be len don,m a lu io ngso fa bfl ahfu ia ds fui ewa if eawu ifg iua ewf iu awea erua irgfuiae faer useggh seurg nguoui choi he phong minh xam tro, dang dua bi chot be len don,m a luio ngso fabfl ahfuiads fuie wa ifea wui fgiu aewf iua weaer uai rgfu iae faer useggh seurg nguoui choi he phong minh xam tro, dang dua bi chot be len don,m a luion gso fabfl ahfu iads fuiewa ife awui fgiu aew fiua wea eruai rgf uiae faer useggh seurg"
content2="nguoui choi he phong minh xam tro, dang dua bi chot be len don,m a luio ngs ofabfl ahfuiads fuiewa ifeawu ifgi uaewf iuaw eaer uai rgf ui ae faer useggh seurg nguoui choi he phong minh xam tro, dang dua bi chot be len don,m a lu io ngso fa bfl ahfu ia ds fui ewa if eawu ifg iua ewf iu awea erua irgfuiae faer useggh seurg nguoui choi he phong minh xam tro, dang dua bi chot be len don,m a luio ngso fabfl ahfuiads fuie wa ifea wui fgiu aewf iua weaer uai rgfu iae faer useggh seurg nguoui choi he phong minh xam tro, dang dua bi chot be len don,m a luion gso fabfl ahfu iads fuiewa ife awui fgiu aew fiua wea eruai rgf uiae faer useggh seurg"

const Blog = () => {
    return (
      <div>
        <Navbar />
        <div className='blog'>
            <h1 className='title'>{title}</h1>
            <div><Tag color="#87d068">{tag}</Tag> <Tag color="#334466">{tag}</Tag></div>
            <div className='heading'>{heading}</div>
            <p className='content'>{content1}</p>
            <img src='https://kenh14cdn.com/203336854389633024/2020/12/27/photo-1-16090803728421665652964.png'/>
            <p className='content'>{content2}</p>
        </div>
      </div>
    );
  }
  

export default Blog;