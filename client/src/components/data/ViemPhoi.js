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
          label="Gender"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select a option and change input text above"
            allowClear
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </Form.Item>
        <h2>Chi so chung</h2>
        <Form.Item
          name="HuyetAp"
          label="Huyet ap"
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
          label="Nhip Tim"
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
          label="Nhip Tho"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber placeholder="Eg. 19 (lan/phut)" />
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