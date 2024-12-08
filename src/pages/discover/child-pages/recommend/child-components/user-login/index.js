import React, { memo } from 'react';


import "./style.less";

export default memo(function UserLogin() {
  return (
    <div className="user-login-wrapper">
      <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
      <a href="#/">用户登陆</a>
    </div>
  );
});
