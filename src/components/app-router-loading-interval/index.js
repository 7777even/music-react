import React, { memo } from 'react';
import Spin from 'antd/es/spin';
import "antd/es/spin/style/css";

import "./style.less";

export default memo(function AppRouterLoadingInterval() {
    return (
        <div className="app-router-loading-interval-wrapper">
            <Spin />
        </div>
    );
});
