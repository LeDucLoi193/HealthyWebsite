import React, { useState } from 'react';

import { Form, Modal, Button, Select, InputNumber, Input } from 'antd';
import catchError from '../../errors/error'

import '../../styles/home.css'

const axios = require('axios')

const { Option } = Select;
const layout = {
  labelCol: {
    span: 4,
    offset: 4
  },
  wrapperCol: {
    span: 8
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const ViemPhoi = () => {
  const [form] = Form.useForm();
  
  const onFinish = (values) => {
    axios.post('http://localhost:8080/input-data/viem-phoi', {
      data: {...values},
    }, 
    {
      withCredentials: true,
      credentials: 'include'
    })
    .then((res) => {
      if (res.status === 200) {
        window.location.href = '/input-data/viem-phoi-xn';
      }
    })
    .catch((err) => {
      console.log(err);
      catchError(err);
    })
  } 

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div>
      <Form {...layout} form={form} name="control-hooks" onFinish={(values) => onFinish(values)}>
        <Form.Item
          name="Gender"
          label="Giới tính"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Nam/Nữ"
            allowClear
          >
            <Option value="male">Nam</Option>
            <Option value="female">Nữ</Option>
          </Select>
        </Form.Item>
        <h2>Chỉ số chung</h2>
        <Form.Item
          name="HuyetAp"
          label="Huyết áp"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Eg. 120/80 (mmHg)" />
        </Form.Item>

        <Form.Item
          name="BMI"
          label="BMI"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber placeholder="Eg. 25.6" />
        </Form.Item>

        <Form.Item
          name="NhipTim"
          label="Nhịp Tim"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber placeholder="Eg. 90 (nhip/phut)" />
        </Form.Item>

        <Form.Item
          name="NhipTho"
          label="Nhịp Thở"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber placeholder="Eg. 19 (lần/phút)" />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ViemPhoi;