import React, { useEffect, useContext, Component} from 'react';
import { Link } from 'react-router-dom';

import {Card, Col, Row, Tag} from 'antd';
import logo from '../../healty.png';

import '../../styles/home.css'

class SmallBlog extends Component{
render(){
  return (
    <div>
        <div className='card'>
            <Card >
                <Row>
                    <Col span={8}>
                        <img src={logo} style={{maxWidth: "75%"}}/>
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