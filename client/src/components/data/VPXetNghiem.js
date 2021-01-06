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

const VPXetNghiem = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

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
            placeholder="Nam/Nữ"
            allowClear
          >
            <Option value="male">Nam</Option>
            <Option value="female">Nữ</Option>
          </Select>
        </Form.Item>
        <h2>Chỉ số xét nghiệm chi tiết</h2>
        <Form.Item
          name="RBC"
          label="Số lượng hồng cầu (RBC)"
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
          label="Số lượng bạch cầu (WBC)"
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
          label="Số lượng tiểu cầu (PLT)"
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
          label="Định lượng Ure"
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
          label="Nồng độ Glucose"
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
          label="Nồng độ Creatinin"
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
          label="Mức độ NT - proBNP"
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