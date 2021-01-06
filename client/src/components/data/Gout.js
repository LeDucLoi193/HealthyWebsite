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

const Gout = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

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
        <h2>Chỉ số xét nghiệm</h2>
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
          label="Dinh dưỡng lượng CRP.hs"
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
          name="NEUT"
          label="Tỉ lệ bạch cầu trung tính (%)"
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
          label="Tỉ lệ bạch cầu Lympho (%)"
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
          label="Độ pH"
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
          label="Nồng độ glucose"
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
          label="Nồng độ Cortisol"
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