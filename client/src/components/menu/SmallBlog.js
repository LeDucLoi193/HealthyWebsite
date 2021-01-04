import React, { useEffect, useContext, Component} from 'react';
import { Link } from 'react-router-dom';

import {Card, Col, Row, Tag} from 'antd';

import '../../styles/home.css'

class SmallBlog extends Component{
render(){
  return (
    <div>
        <div className='card'>
            <Card >
                <Row>
                    <Col span={8}>
                        <img src='https://instagram.fhan2-2.fna.fbcdn.net/v/t51.2885-19/s150x150/117195083_755618295255467_5728603688931707662_n.jpg?_nc_ht=instagram.fhan2-2.fna.fbcdn.net&_nc_ohc=l9h32ec5E4QAX9z5Mop&tp=1&oh=74f02c6ddd198a96682006b362c76510&oe=60109833'/>
                    </Col>
                    <Col span={16}>
                        <h1><Link to ={`/blog/${this.props.id}`}>{this.props.title}</Link></h1>
                        <hr/>
                        <div><Tag color="#87d068">{this.props.tag}</Tag></div>
                        <span>{this.props.heading}</span>
                    </Col>
                </Row>
            </Card>
        </div>
      </div>
  );
}
}

export default SmallBlog;