import React, { useState } from 'react';

import { Form, Modal, Button, Select, InputNumber } from 'antd';
import Navbar from '../menu/Navbar';

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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
      setIsModalVisible(true);
      setLoading(false);
    })
  } 

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Button danger href='/sign-in'>
          Login again
        </Button>
      </Modal>
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
        <h2>Chi so T-Score cho moi vung</h2>
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
          <InputNumber placeholder="Eg. 0.5" />
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
          <InputNumber placeholder="Eg. -0.5" />
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
          <InputNumber placeholder="Eg. -3" />
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
          <InputNumber placeholder="Eg. -2.6" />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={loading}>
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

export default LoangXuong;