import React, { useState } from 'react';

import { Form, Modal, Button, Select, InputNumber } from 'antd';
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

const LoangXuong = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    axios.post('http://localhost:8080/input-data/loang-xuong', {
      data: {...values},
    }, 
    {
      withCredentials: true,
      credentials: 'include'
    })
    .then((res) => {
      if (res.status === 200) {
        alert(res.data);
        setLoading(false);
        window.location.href = '/';
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
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
        <h2>Chỉ số T-Score cho mỗi vùng</h2>
        <Form.Item
          name="L1"
          label="L1"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber placeholder="Eg. 1" />
        </Form.Item>

        <Form.Item
          name="L2"
          label="L2"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber placeholder="VD. 0.5" />
        </Form.Item>

        <Form.Item
          name="L3"
          label="L3"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber placeholder="VD. -0.5" />
        </Form.Item>

        <Form.Item
          name="L4"
          label="L4"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber placeholder="VD. -3" />
        </Form.Item>

        <Form.Item
          name="Total"
          label="Total"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber placeholder="VD. -2.6" />
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

export default LoangXuong;