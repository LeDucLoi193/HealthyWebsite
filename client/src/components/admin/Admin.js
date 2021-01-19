import React, { useEffect, useContext, useState } from 'react';

import '../../styles/admin.css';

import { Layout, Menu } from 'antd';
import { UserOutlined, ReadOutlined, LogoutOutlined } from '@ant-design/icons';
import AdminTable from './AdminTable'
import { UpdateAdminContext } from '../../contexts/update';

const { Header, Content, Sider, Footer } = Layout;
const axios = require('axios')

const Admin = () => {
  const [currentKey, setCurrentKey] = useState("users");
  const [update, setUpdate] = useState(false);

  const handleClick = (e) => {
    if (e.key === 'logout') {
      axios.get('http://localhost:8080/auth/log-out',
      {
        withCredentials: true,
        credentials: 'include'
      })
      .then((res) => {
        if (res.status === 200) {
          window.location.href = '/sign-in'
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
    setCurrentKey(e.key);
  }
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
              Người dùng
            </Menu.Item>
            <Menu.Item key="blogs" icon={<ReadOutlined />}>
              Blogs
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />}>    
              Đăng xuất
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