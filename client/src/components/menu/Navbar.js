import React, { useState } from 'react';

import { Menu } from 'antd';
import { HomeOutlined, HeartOutlined, SettingOutlined, RadarChartOutlined, CodepenOutlined } from '@ant-design/icons';
import {
  NavLink,
} from "react-router-dom";

const { SubMenu } = Menu;

const Navbar = () => {
  const [current, setCurrent] = useState('home');

  const handleClick = (e) => {
    setCurrent(e.key);
  }

  return (
    <div>
      <Menu onClick={(e) => handleClick(e)} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <NavLink to="/" >Home</NavLink>
        </Menu.Item>
        <Menu.Item key="info" icon={<HeartOutlined />}>    
          <NavLink to="/health-info">User's Healthy Information</NavLink>
        </Menu.Item>
        <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          title="Nhap du lieu"
        >
          <Menu.ItemGroup title="Loai xet nghiem">
            <Menu.Item key="loang_xuong">
              <NavLink to="/input-data/loang-xuong" >Loang Xuong (CSTL)</NavLink>
            </Menu.Item>
            <Menu.Item key="viem_phoi">
              <NavLink to="/input-data/viem-phoi" >Viem Phoi</NavLink>
            </Menu.Item>
            <Menu.Item key="gout">
              <NavLink to="/input-data/gout" >Gout</NavLink>
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item key="chart" icon={<RadarChartOutlined />}>
          <NavLink to="/chart" >Chart</NavLink>
        </Menu.Item>
        <Menu.Item key="bmi" icon={<CodepenOutlined />}>
          <NavLink to="/bmi" >BMI</NavLink>
        </Menu.Item>
        <Menu.Item key="blog" icon={<CodepenOutlined />}>
          <NavLink to="/blog" >Blog</NavLink>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default Navbar;