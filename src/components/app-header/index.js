import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import Input from "antd/es/input";
import "antd/es/input/style/css";
import { SearchOutlined } from '@ant-design/icons';

import "./style.css";

export default memo(function AppHeader() {
    return (
        <div className="header-wrapper">
            <div className="header-top">
                <div className="header-content">

                    <div className="header-top-left">
                        <h1 className="logo"><a href="#/">网易云音乐</a></h1>
                        <div className="header-nav">
                            <NavLink to="/discover" >发现音乐<i className="cor"></i></NavLink>
                            <NavLink to="/mine" >我的音乐<i className="cor"></i></NavLink>
                            <NavLink to="/friend" >朋友<i className="cor"></i></NavLink>
                            <NavLink to="/product" >商城<i className="cor"></i></NavLink>
                            <NavLink to="/nmusician" >音乐人<i className="cor"></i></NavLink>
                            <NavLink to="/download" >下载客户端
                                <i className="cor"></i>
                                <i className="lst"></i>
                            </NavLink>
                        </div>
                    </div>

                    <div className="header-top-right">
                        <Input className="search" placeholder="音乐/视频/电台/用户" prefix={<SearchOutlined />} />
                        <button className="creator-center">创作者中心</button>
                        <button className="btn-link-login"><span>登录</span></button>
                    </div>

                </div>
            </div>
            <div className="header-bottom">

            </div>
        </div>
    );
});
