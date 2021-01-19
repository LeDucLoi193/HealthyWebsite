import React, {Component} from 'react';

import {Tag} from 'antd';

import '../../styles/blog.css';
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
            <img src='https://prod.static9.net.au/_/media/Network/Images/2018/04/04/13/08/180404_coach_bmi.jpg' style ={{maxWidth: "100%"}}/>
            <p className='content'>{this.props.dataState[4]}</p>
        </div>
      </div>
    );
  }
}

export default Blog;