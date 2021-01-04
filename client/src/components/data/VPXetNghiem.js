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

const VPXetNghiem = () => {
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
    axios.post('http://localhost:8080/input-data/viem-phoi-xn', {
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
        window.location.href = '/chart/viem-phoi';
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
        <h2>Chi so xet nghiem chi tiet</h2>
        <Form.Item
          name="RBC"
          label="So luong hong cau (RBC)"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber placeholder="Eg. 4.0 (T/L)" />
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
          name="PLT"
          label="So luong tieu cau (PLT)"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber placeholder="Eg. 200 (G/L)" />
        </Form.Item>

        <Form.Item
          name="Ure"
          label="Dinh luong Ure"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber placeholder="Eg. 6.8 (mmol/L)" />
        </Form.Item>

        <Form.Item
          name="Glucose"
          label="Dinh luong Glucose"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber placeholder="Eg. 5.3 (mmol/L) " />
        </Form.Item>

        <Form.Item
          name="Creatinin"
          label="Dinh luong Creatinin"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber placeholder="Eg. 69 (umol/L) " />
        </Form.Item>

        <Form.Item
          name="proBNP"
          label="Dinh luong NT - proBNP"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber placeholder="Eg. 10 (pmol/L) " />
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

export default VPXetNghiem;