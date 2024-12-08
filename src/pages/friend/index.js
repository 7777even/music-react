import React, { memo } from 'react';

import "./style.less";

export default memo(function Friend() {
    return (
        <div className="friend-wrapper">
            <div className="not-login">
                <div className="pic">
                    <span>
                        你可以关注明星和好友品味他们的私房歌单
                        <br />
                        通过他们的动态发现更多精彩音乐
                    </span>
                    {/* seo优化 */}
                    <a className="btn-login" href="#/" >立即登陆</a>
                </div>
            </div>
        </div>
    );
});
