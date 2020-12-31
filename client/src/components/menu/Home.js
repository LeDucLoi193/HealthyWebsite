import React from 'react';

import Navbar from './Navbar'
import {Card, Col, Row, Tag} from 'antd';

import '../../styles/home.css'

const Home = () => {
  return (
    <div>
        <Navbar />
        <div className='card'>
            <Card >
                <Row>
                    <Col span={8}>
                        <img src='https://instagram.fhan2-2.fna.fbcdn.net/v/t51.2885-19/s150x150/117195083_755618295255467_5728603688931707662_n.jpg?_nc_ht=instagram.fhan2-2.fna.fbcdn.net&_nc_ohc=l9h32ec5E4QAX9z5Mop&tp=1&oh=74f02c6ddd198a96682006b362c76510&oe=60109833'/>
                    </Col>
                    <Col span={16}>
                        <h1> Chi so co ban cua BMI CHi so bmi thi tu di ma tinh</h1>
                        <hr/>
                        <div><Tag color="#87d068">BMI</Tag></div>
                        <span>CHi so bmi thi tu di ma tinh, bat tao tinh con cu CHi so bmi thi tu di ma tinh, bat tao tinh con cu CHi so bmi thi tu di ma tinh, bat tao tinh con cu </span>
                    </Col>
                </Row>
            </Card>
        </div>
        <div className='card'>
            <Card >
                <Row>
                    <Col span={8}>
                        <img src='https://instagram.fhan2-2.fna.fbcdn.net/v/t51.2885-19/s150x150/117195083_755618295255467_5728603688931707662_n.jpg?_nc_ht=instagram.fhan2-2.fna.fbcdn.net&_nc_ohc=l9h32ec5E4QAX9z5Mop&tp=1&oh=74f02c6ddd198a96682006b362c76510&oe=60109833'/>
                    </Col>
                    <Col span={16}>
                        <h1> Chi so co ban cua BMI CHi so bmi thi tu di ma tinh</h1>
                        <hr/>
                        <div><Tag color="#87d068">LoangXuong</Tag> <Tag color="#2db7f5">Gout</Tag></div>
                        <span>CHi so bmi thi tu di ma tinh, bat tao tinh con cu CHi so bmi thi tu di ma tinh, bat tao tinh con cu CHi so bmi thi tu di ma tinh, bat tao tinh con cu </span>
                    </Col>
                </Row>
            </Card>
        </div>
      </div>
  );
}

export default Home;