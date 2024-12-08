import React, { memo, Fragment } from 'react';
import "./style.less";

export default memo(function MultiDownload() {
    return (
        <Fragment>
            <h3 className="multi-download-head">
                <span>网易云音乐多端下载</span>
            </h3>
            <div className="multi-download-content">
                <a className="image-iphone" href="#/">iPhone</a>
                <a className="image-pc" href="#/">PC</a>
                <a className="image-android" href="#/">Android</a>
            </div>
            <p className="message">同步歌单，随时畅听320k好音乐</p>
        </Fragment>
    );
});
