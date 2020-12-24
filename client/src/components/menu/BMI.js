import React, { useEffect, useState } from 'react';
import { Form, Modal, Button, Select, InputNumber } from 'antd';
import Navbar from '../menu/Navbar';

import '../../styles/home.css'

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

const BMI = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(0);
  const [bmiState, setBmiState] = useState('');

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function resolveBMI(values, setResult, callback){
    setResult(values.weight*10000/(values.height*values.height));
    callback(result);
  }
  const onFinish = (values) => {
    setResult(values.weight*10000/(values.height*values.height));

    // if(result < 18.5) setBmiState('Gầy. Hãy chăm chỉ tập thể dục!')
    // else if(result >= 18.5 && result <= 25) setBmiState("Bình thường.");
    // else setBmiState("Bạn béo quá. Giảm cân đi!!!")

    setIsModalVisible(true);

  }

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div>
      {/* <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Button danger href='/sign-in'>
          Login again
        </Button>
      </Modal> */}
      <Modal
        title="Chi so BMI"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
          <div>Chi so BMI cua ban: {result}</div>
          {/* <div>Tình trạng cơ thể bạn: {bmiState}</div> */}
      </Modal>
      <Navbar />
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
            <Option value="male">Nam</Option>
            <Option value="female">Nữ</Option>
          </Select>
        </Form.Item>
        <h2>Tính chỉ số BMI</h2>
        <Form.Item
          name="height"
          label="Chiều cao"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber 
            placeholder="Eg. 176 (cm)"
           />
        </Form.Item>

        <Form.Item
          name="weight"
          label="Cân nặng"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber 
            placeholder="Eg. 65 (kg)" 
            />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Tính
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Tải lại
          </Button>
        </Form.Item>
      </Form>
      <a href="https://instagram.com/tichambers99" target="_blank">
          Click here to see more about BMI
      </a>
    </div>
  );
}

export default BMI;