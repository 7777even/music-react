import React, { memo, Fragment } from 'react';
import PropTypes from "prop-types";

import "./style.less";

import { DEFAULT_COMMENT_HEAD } from "../../common/constants";

const CommentInput = memo(function (props) {
    const { commentCount } = props;
    return (
        <Fragment>
            <div className="content-input-title">
                <h3>评论</h3>
                <span>共{commentCount}条评论</span>
            </div>

            <div className="content-input-wrapper">
                <div className="comment-input">
                    <div className="left">
                        <img src={DEFAULT_COMMENT_HEAD} alt="not login default head" />
                    </div>
                    <div className="right">
                        <div className="input-content">
                            <textarea placeholder="评论"></textarea>
                            <div className="triangle t1"></div>
                            <div className="triangle t2"></div>
                        </div>
                        <div className="btn">

                            <div className="btn-left">
                                <button className="icon"></button>
                                <button className="hint"></button>
                            </div>

                            <div className="btn-right">
                                <span>140</span>
                                <button className="submit">评论</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
});

CommentInput.propTypes = {
    commentCount: PropTypes.number
}

CommentInput.defaultProps = {
    commentCount: 0
}

export default CommentInput;
