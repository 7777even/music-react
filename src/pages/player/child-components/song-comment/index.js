import React, { memo, useContext, useEffect, useState, useRef } from 'react';
import { useDispatch, shallowEqual, useSelector } from "react-redux";

import CommentItem from "../../../../components/comment-item";
import CommentInput from "../../../../components/comment-input";
import RewritePagination from "../../../../components/rewrite-pagination";

import { getSongCommentAction } from "../../store/actionCreators";

import { MyContext } from "../../../player";
import "./style.less";

import { elementTop } from "../../../../utils/element-top";
import { formatDate } from "../../../../utils/format-utils";
import { PLAY_COMMENT_LIMIT } from "../../../../common/constants";


export default memo(function SongComment() {
    // state
    const [page, setPage] = useState(1);

    const songID = useContext(MyContext);
    // redux hooks
    const { songComment } = useSelector(state => ({
        songComment: state.getIn(["player", "songComment"])
    }), shallowEqual);
    const dispatch = useDispatch();
    useEffect(() => {
        setPage(1);
        // dispatch(getSongCommentAction(songID, page, limit));
        dispatch(getSongCommentAction(songID, 1, PLAY_COMMENT_LIMIT));
    }, [dispatch, songID]);

    // other hooks
    const commentWrapperRef = useRef();

    // console.log(songComment);

    const pageChange = (page) => {
        // 评论距离顶部的距离
        const top = commentWrapperRef.current ? elementTop(commentWrapperRef.current) : 0;
        // console.log(page);
        setPage(page);
        window.scroll(0, top);
        dispatch(getSongCommentAction(songID, page, PLAY_COMMENT_LIMIT));
    }

    return (
        <div className="song-comment-wrapper" ref={commentWrapperRef}>
            <CommentInput commentCount={songComment.total} />

            {
                page === 1 && songComment.hotComments && songComment.hotComments.length > 0 &&
                <div className="hot-comment">
                    <h3 className="hot-comment-title">精彩评论</h3>
                    {
                        songComment.hotComments && songComment.hotComments.map(item => (
                            <CommentItem
                                key={item.commentId}
                                reply={item.beReplied && item.beReplied.length > 0 ? item.beReplied[0] : null}
                                avatarUrl={item.user.avatarUrl}
                                nickname={item.user.nickname}
                                content={item.content}
                                time={formatDate(item.time, "yyyy年MM月dd日")}
                                likedCount={item.likedCount}
                                authStatus={item.user.authStatus}
                            />
                        ))
                    }
                </div>
            }

            <div className="hot-comment">
                <h3 className="hot-comment-title">最新评论&#40;{songComment.total}&#41;</h3>
                {
                    songComment.comments && songComment.comments.map(item => (
                        <CommentItem
                            key={item.commentId}
                            reply={item.beReplied && item.beReplied.length > 0 ? item.beReplied[0] : null}
                            avatarUrl={item.user.avatarUrl}
                            nickname={item.user.nickname}
                            content={item.content}
                            time={formatDate(item.time, "yyyy年MM月dd日")}
                            likedCount={item.likedCount}
                        />
                    ))
                }
            </div>

            <RewritePagination
                current={page}
                onChange={pageChange}
                pageSize={PLAY_COMMENT_LIMIT}
                total={songComment.total}
            />
        </div>
    );
});
