import React, { useState, useContext } from 'react';

import { Menu } from 'antd';

import { 
  HomeOutlined, 
  HeartOutlined, 
  SettingOutlined, 
  RadarChartOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import {
  NavLink,
} from "react-router-dom";
import { UpdateChartContext } from '../../contexts/update';
import { LoginContext } from '../../contexts/login';


const { SubMenu } = Menu;
const axios = require('axios')

const Navbar = () => {
  const [current, setCurrent] = useState('home');
  const [isLogin, setIsLogin] = useContext(LoginContext);
  const [updateChart, setUpdateChart] = useContext(UpdateChartContext);
  const keys = ["radar_lx", "radar_vp", "radar_gout"]

  const handleClick = (e) => {
    if (keys.includes(current)){
      if (e.key !== current) {
        setUpdateChart(!updateChart)
      }
    }
    if (e.key === 'logout') {
      axios.get('http://localhost:8080/auth/log-out',
      {
        withCredentials: true,
        credentials: 'include'
      })
      .then((res) => {
        if (res.status === 200) {
          setIsLogin(false);
          window.location.href = '/sign-in'
        }
      })
      .catch((err) => {
        alert(err)
      })
    }
    setCurrent(e.key);
  }

  return (
    <div>
      <Menu onClick={(e) => handleClick(e)} selectedKeys={current} mode="horizontal">
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <NavLink to="/" >Trang chủ</NavLink>
        </Menu.Item>
        <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          title="Nhap du lieu"
        >
          <Menu.ItemGroup title="Loai xet nghiem">
            <Menu.Item key="loang_xuong">
              <NavLink to="/input-data/loang-xuong" >Loãng Xương (CSTL)</NavLink>
            </Menu.Item>
            <Menu.Item key="viem_phoi">
              <NavLink to="/input-data/viem-phoi" >Viêm phồi</NavLink>
            </Menu.Item>
            <Menu.Item key="gout">
              <NavLink to="/input-data/gout" >Gout</NavLink>
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        
        <SubMenu
          key="SubMenuBieuDo"
          icon={<RadarChartOutlined />}
          title="Bieu do"
        >
          <Menu.ItemGroup title="Loai xet nghiem">
            <Menu.Item key="radar_lx">
              <NavLink to="/chart/loang-xuong" >Loãng Xương (CSTL)</NavLink>
            </Menu.Item>
            <Menu.Item key="radar_vp">
              <NavLink to="/chart/viem-phoi" >Viêm Phổi</NavLink>
            </Menu.Item>
            <Menu.Item key="radar_gout">
              <NavLink to="/chart/gout" >Gout</NavLink>
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item key="bmi" icon={<HeartOutlined />}>    
          <NavLink to="/bmi">BMI</NavLink>
        </Menu.Item>
        <Menu.Item key="logout" icon={<LogoutOutlined />}>    
          Đăng Xuất
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default Navbar;