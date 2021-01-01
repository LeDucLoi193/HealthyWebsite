import React, {Component} from 'react';

import Navbar from '../menu/Navbar';
import {Tag} from 'antd';

import '../../styles/blog.css';


const axios = require("axios");
class Blog extends Component{
  render(){
    console.log(this.props)
    return (
      <div>
        <div className='blog'>
            <h1 className='title'>{this.props.dataState[1]}</h1>
            <div><Tag color="#87d068">{this.props.dataState[5]}</Tag></div>
            <div className='heading'>{this.props.dataState[2]}</div>
            <p className='content'>{this.props.dataState[3]}</p>
            <img src='https://kenh14cdn.com/203336854389633024/2020/12/27/photo-1-16090803728421665652964.png'/>
            <p className='content'>{this.props.dataState[4]}</p>
        </div>
      </div>
    );
  }
}

export default Blog;