import React, { memo } from 'react';


import "./style.less";

export default memo(function Mine() {
    return (
        <div className="mine-wrapper">
            <div className="not-login">
                <div className="pic">
                    {/* seo优化 */}
                    <h2>登陆网易云音乐</h2>
                    <a className="btn-login" href="#/" >立即登陆</a>
                </div>
            </div>
        </div>
    );
});
