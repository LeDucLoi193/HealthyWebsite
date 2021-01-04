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

const Gout = () => {
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
    axios.post('http://localhost:8080/input-data/gout', {
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
        <h2>Chi so xet nghiem</h2>
        <Form.Item
          name="axiduric"
          label="Axid Uric"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber placeholder="Eg. 250 (mmol/L)" />
        </Form.Item>

        <Form.Item
          name="CRP.hs"
          label="Dinh luong CRP.hs"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber placeholder="Eg. 3.5 (mg/L)" />
        </Form.Item>

        <Form.Item
          name="WBC"
          label="So luong bach cau (WBC)"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber placeholder="Eg. 5 (T/L)" />
        </Form.Item>

        <Form.Item
          name="NEUT"
          label="Ti le bach cau trung tinh (%)"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber placeholder="Eg. 50 (%)" />
        </Form.Item>

        <Form.Item
          name="LYM"
          label="Ti le bach cau Lympho (%)"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber placeholder="Eg. 30 (%)" />
        </Form.Item>

        <Form.Item
          name="pH"
          label="Do pH"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber placeholder="Eg. 6.0" />
        </Form.Item>

        <Form.Item
          name="glucose"
          label="Dinh luong glucose"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber placeholder="Eg. 5.0 (mmol/L)" />
        </Form.Item>

        <Form.Item
          name="Cortisol"
          label="Dinh luong Cortisol"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber placeholder="Eg. 250 (mnmol/L)" />
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

export default Gout;