import React, { memo } from 'react';
import PropTypes from "prop-types";
import "./style.less";

const ActionButton = memo(function (props) {
    const { shareCount, collectCount, commentCount } = props;
    return (
        <div className="action-button-wrapper">

            <button className="play" title="播放">
                <span className="left-bg">
                    <i className="play-icon"></i>播放
                </span>
                <span className="right-bg"></span>
            </button>

            <button className="add" title="添加到播放列表"></button>

            <button className="share">
                <span className="left-bg">
                    <span></span>
                    {collectCount}
                </span>
                <span className="right-bg"></span>
            </button>

            <button className="collect">
                <span className="left-bg">
                    <span></span>

                    {shareCount}
                </span>
                <span className="right-bg"></span>
            </button>

            <button className="download">
                <span className="left-bg">
                    <span></span>
                    下载
            </span>
                <span className="right-bg"></span>
            </button>

            <button className="comment">
                <span className="left-bg">
                    <span></span>
                    {commentCount}
                </span>
                <span className="right-bg"></span>
            </button>

        </div>
    );
});

ActionButton.propTypes = {
    shareCount: PropTypes.string,
    collectCount: PropTypes.string,
    commentCount: PropTypes.string
}

ActionButton.defaultProps = {
    collectCount: "收藏",
    shareCount: "分享",
    commentCount: "评论"
}

export default ActionButton;
