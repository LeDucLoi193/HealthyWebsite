import React, { useState, useContext } from 'react';
import { Input, Space, Button, Modal, Form, Checkbox, Select, Tooltip } from 'antd';
import { Link, Redirect, Route } from "react-router-dom";
import { UserOutlined, LockOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import logo from '../../healty.png';

import {AdminContext, LoginContext} from '../../contexts/login';

import '../../styles/log.css';

const axios = require('axios');

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Login = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  let loginInfo = {}

  let signUpInfo = {};

  const [isLogin, setIsLogin] = useContext(LoginContext);
  const [admin, setAdmin] = useContext(AdminContext);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="84">+84</Option>
      </Select>
    </Form.Item>
  );

  const submitData = () => {
    axios.post('http://localhost:8080/auth/sign-in', {
      data: {...loginInfo},
    }, 
    {
      withCredentials: true,
      credentials: 'include'
    })
    .then((res) => {
      if (res.status === 200) {
        if (res.data.message === "admin") {
          setAdmin(true);
          window.location.href = "/admin"
        }
        else {
          setIsLogin(true);
        }
      }
    })
    .catch((err) => {
      console.log(err)
      alert(err.response.data.message);
    })
  }

  const handleSignUp = () => {
    setLoading(true);
    if (signUpInfo.phoneNumber && signUpInfo.phoneNumber.length === 9) {
      signUpInfo.phoneNumber = "0" + signUpInfo.phoneNumber;
    }
    axios.post('http://localhost:8080/auth/sign-up', {
      ...signUpInfo
    })
    .then((res) => {
      if (res.status === 200) {
        setVisible(false);
        alert(res.data.message);
        setLoading(false);
      }
    })
    .catch((err) => {
      console.log(err)
      setVisible(false);
      setLoading(false);
      alert(err.response.data.message);
    })
  }

  return (
    <div className="login">
      <Route>
        {
          isLogin && <Redirect to="/" />
        }
      </Route>
      <img src={logo} alt="Logo"/>
      <Space direction="vertical" className="form-login">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
        >
          <h2>HeaLtHy WeBsitE</h2>
          <h2>Vjp Pr0 luxuRy ulTimaTe</h2>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Hay nhap ten!',
              },
            ]}
          >
            <Input
              size="large" 
              prefix={<UserOutlined 
              className="site-form-item-icon" />} 
              placeholder="Ten nguoi dung" 
              onChange={(e) => {loginInfo.username = e.target.value}}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Hay nhap mat khau!',
              },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Mat khau"
              onChange={(e) => {loginInfo.password = e.target.value}}
            />
          </Form.Item>
          <Form.Item className="form-checkbox-forgot">
            <Form.Item name="remember" noStyle>
              <Checkbox>Ghi nho dang nhap</Checkbox>
            </Form.Item>

            <span className="form-subspan">
              <Link to="/forgot-password">Quen mat khau?</Link>
            </span>
          </Form.Item>

          <Form.Item className="form-login-register">
            <Button 
              type="primary" 
              htmlType="submit" 
              className="btn-signin login-form-button"
              onClick={() => submitData()}
            >
              Dang nhap
            </Button> 
            <span onClick={() => showModal()} className="form-subspan">
              Hoac dang ky ngay
            </span>

            <Modal
              title="Dang ky"
              visible={visible}
              onCancel={() => handleCancel()}
              footer={null}
            >
              <Form
                {...formItemLayout}
                form={form}
                name="register"
                initialValues={{
                  prefix: '84',
                }}
                scrollToFirstError
              >
                <Form.Item
                  name="username"
                  label={
                    <span>
                      Ten nguoi dung&nbsp;
                      <Tooltip title="Ban ten la gi?">
                        <QuestionCircleOutlined />
                      </Tooltip>
                    </span>
                  }
                  rules={[{ required: true, message: 'Hay nhap ten!', whitespace: true }]}
                >
                  <Input onChange={(e) => {signUpInfo.username = e.target.value}} />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      type: 'email',
                      message: 'Sai quy chuan email!',
                    },
                    {
                      required: true,
                      message: 'Hay nhap email!',
                    },
                  ]}
                >
                  <Input onChange={(e) => {signUpInfo.email = e.target.value}} />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Mat khau"
                  rules={[
                    {
                      required: true,
                      message: 'Hay nhap mat khau!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password onChange={(e) => {signUpInfo.password = e.target.value}} />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  label="Xac nhan mat khau"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Hay xac nhan mat khau!',
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject('Mat khau xac nhan khong dung!');
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="So dien thoai"
                  rules={[
                    {
                      required: true,
                      message: 'Hay nhap so dien thoai!',
                    },
                  ]}
                >
                  <Input
                    addonBefore={prefixSelector}
                    style={{
                      width: '100%',
                    }}
                    onChange={(e) => {signUpInfo.phoneNumber = e.target.value}}
                  />
                </Form.Item>

                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value ? Promise.resolve() : Promise.reject('Hay dong y..'),
                    },
                  ]}
                  {...tailFormItemLayout}
                >
                  <Checkbox onChange={(e) => {signUpInfo.agree = e.target.checked}} >
                    Toi da doc dieu khoan
                  </Checkbox>
                </Form.Item>
                <Form.Item {...tailFormItemLayout} style={{marginTop: "1rem"}}>
                  <Button 
                    htmlType="button" 
                    onClick={() => handleCancel()}
                  > 
                    Huy 
                  </Button>
                  <Button 
                    type="primary" 
                    htmlType="submit"
                    style={{marginLeft: "2rem"}}
                    onClick={() => handleSignUp()}
                    loading={loading}
                  >
                    Dang ky
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </Form.Item>
        </Form>
      </Space>
    </div>
  );
}

export default Login;