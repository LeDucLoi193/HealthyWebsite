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
  const [loading, setLoading] = useState(false);
  
  const onFinish = (values) => {
    setLoading(true)
    axios.post('http://localhost:8080/input-data/viem-phoi', {
      data: {...values},
    }, 
    {
      withCredentials: true,
      credentials: 'include'
    })
    .then((res) => {
      if (res.status === 200) {
        setLoading(false)
        window.location.href = '/input-data/viem-phoi-xn';
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading(false)
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
            placeholder="Chọn giới tính"
            allowClear
          >
            <Option value="male">Nam</Option>
            <Option value="female">Nữ</Option>
          </Select>
        </Form.Item>
        <h2>Chỉ số chung</h2>
        <Form.Item
          name="HuyetAp"
          label="Huyết áp"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="VD. 120/80 (mmHg)" />
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
          <InputNumber placeholder="VD. 25.6" />
        </Form.Item>

        <Form.Item
          name="NhipTim"
          label="Nhịp tim"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber placeholder="VD. 90 (nhịp/phút)" />
        </Form.Item>

        <Form.Item
          name="NhipTho"
          label="Nhịp thở"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber placeholder="VD. 19 (lần/phút)" />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Gửi
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Đặt lại
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ViemPhoi;