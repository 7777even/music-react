import React, { memo } from 'react';
import PropTypes from "prop-types";

import "./style.less";

const CommentItem = memo(function (props) {
    const { avatarUrl, nickname, content, time, likedCount, reply, authStatus } = props;

    return (
        <div className="comment-item">
            <div className="left">
                <a href="#/">
                    <img src={avatarUrl + "?param=50y50"} alt={nickname} />
                </a>
            </div>
            <div className="right">
                <div className="user-comment">
                    <a href="#/">{nickname}</a>
                    &nbsp;{authStatus === 1 && <sub></sub>}：{content}
                </div>
                {
                    reply && (
                        <div className="reply">
                            <div className="triangle t1"></div>
                            <div className="triangle t2"></div>
                            <a href="#/">{reply.user.nickname}</a>
                            &nbsp;{authStatus === 1 && <sub></sub>}：{reply.content}
                        </div>
                    )
                }
                <div className="control">
                    <div className="date">{time}</div>
                    <div className="handle">
                        <button className="like">
                            <i></i>&#40;{likedCount}&#41;
                    </button>
                        <div className="line">|</div>
                        <a href="#/">回复</a>
                    </div>
                </div>
            </div>
        </div>
    );
});

CommentItem.propTypes = {
    avatarUrl: PropTypes.string.isRequired,// 用户头像
    nickname: PropTypes.string.isRequired,// 用户名称
    content: PropTypes.string.isRequired,// 评论内容
    time: PropTypes.string.isRequired,// 评论时间
    reply: PropTypes.object,// 评论回复
    likedCount: PropTypes.number.isRequired,// 赞的次数
    authStatus: PropTypes.number// 用户是否是 大V
}

export default CommentItem;
