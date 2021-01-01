import React, { useEffect, useContext, useState } from 'react';

import '../../styles/admin.css';

import { Layout, Menu } from 'antd';
import { UserOutlined, ReadOutlined } from '@ant-design/icons';
import AdminTable from './AdminTable'
import { UpdateAdminContext } from '../../contexts/update';



const { Header, Content, Sider, Footer } = Layout;
const axios = require('axios')

const Admin = () => {
  const [currentKey, setCurrentKey] = useState("users");
  const [update, setUpdate] = useState(false);

  const handleClick = (e) => {
    setCurrentKey(e.key);
  }
  // const [isLogin, setIsLogin] = useContext(LoginContext);
  // useEffect( () => {
  //   axios.get(`http://localhost:8080/get-home`, 
  //   {
  //     withCredentials: true,
  //     credentials: 'include'
  //   })
  //   .then((res) => {
  //     setIsLogin(true)
  //   })
  //   .catch((err) => {
  //     window.location.href = "/sign-in"
  //   })
  // }, [])
  return (
    <UpdateAdminContext.Provider value={[update, setUpdate]}>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
        >
          <div className="logo">ADMIN</div>
          <Menu onClick={(e) => handleClick(e)} theme="dark" mode="inline" defaultSelectedKeys={currentKey}>
            <Menu.Item key="users" icon={<UserOutlined />}>
              Users
            </Menu.Item>
            <Menu.Item key="blogs" icon={<ReadOutlined />}>
              Blogs
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
          <Content style={{ margin: '24px 16px 0' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <AdminTable currentKey={currentKey} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Admin Page vjp pr0 luxury ultimate</Footer>
        </Layout>
      </Layout>
    </UpdateAdminContext.Provider>
     
  );
}

export default Admin;