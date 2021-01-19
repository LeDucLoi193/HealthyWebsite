import React, { useState } from 'react';
import { Form, Modal, Button, Select, InputNumber } from 'antd';

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

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    setResult(values.weight*10000/(values.height*values.height));
    setIsModalVisible(true);
  }

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div>
      <Modal
        title="Chi so BMI"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>Chi so BMI cua ban: {result}</div>
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
            placeholder="Chọn giới tính"
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
            placeholder="VD. 176 (cm)"
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
            placeholder="VD. 65 (kg)" 
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
    </div>
  );
}

export default BMI;