import React, { memo, useEffect, useContext, useState, useRef } from 'react';
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import PlayList from "../../../../../../components/play-list";
import CommentInput from "../../../../../../components/comment-input";
import CommentItem from "../../../../../../components/comment-item";
import RewritePagination from "../../../../../../components/rewrite-pagination";

import { getRankListCommentsAction } from "../../store/actionCreators";
import { RankListContext } from "../../../ranklist";

import { RANK_LIST_COMMENT_LIMIT } from "../../../../../../common/constants";
import { formatDate } from "../../../../../../utils/format-utils";
import { elementTop } from "../../../../../../utils/element-top";

import "./style.less";

export default memo(function SongsList() {
    // state
    const [page, setPage] = useState(1);
    // context
    const rankListID = useContext(RankListContext);
    // redux hooks
    const { rankListInfo, rankListComments } = useSelector(state => ({
        rankListInfo: state.getIn(["rankList", "rankListInfo"]),
        rankListComments: state.getIn(["rankList", "rankListComments"])
    }), shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        setPage(1);
        dispatch(getRankListCommentsAction(rankListID, 1, RANK_LIST_COMMENT_LIMIT));
    }, [dispatch, rankListID]);

    // other hooks
    const newCommentRef = useRef();

    // console.log(rankListID);
    // console.log(rankListInfo);
    // console.log(rankListComments);

    const pageChange = (page) => {
        const top = newCommentRef.current ? elementTop(newCommentRef.current) - 200 : 0;
        // console.log(page);
        setPage(page);
        window.scroll(0, top);
        dispatch(getRankListCommentsAction(rankListID, page, RANK_LIST_COMMENT_LIMIT));
    }

    return (
        <div className="song-list-wrapper">
            <PlayList
                trackCount={rankListInfo.trackCount}
                playCount={rankListInfo.playCount}
                songList={rankListInfo.tracks}
                frontThereRow
            />

            {
                (rankListInfo.tracks && rankListInfo.trackCount) && (rankListInfo.tracks.length < rankListInfo.trackCount) &&
                <div className="more-song">
                    <p>查看更多内容，请下载客户端</p>
                    <Link to="/download" className="download-btn">立即下载</Link>
                </div>
            }

            <CommentInput commentCount={rankListComments.total} />

            {
                page === 1 && rankListComments.hotComments && rankListComments.hotComments.length > 0 &&
                <div className="hot-comment">
                    <h3 className="hot-comment-title">精彩评论</h3>
                    {
                        rankListComments.hotComments && rankListComments.hotComments.map(item => (
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
            }


            <div className="hot-comment" ref={newCommentRef}>
                <h3 className="hot-comment-title">最新评论&#40;{rankListComments.total}&#41;</h3>
                {
                    rankListComments.comments && rankListComments.comments.map(item => (
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
                pageSize={RANK_LIST_COMMENT_LIMIT}
                total={rankListComments.total}
            />
        </div>
    );
});
