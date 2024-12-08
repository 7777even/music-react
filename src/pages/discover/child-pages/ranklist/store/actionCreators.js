import * as actionTypes from "./constants";

import { getRankListInfo, getRankListComments } from "../../../../../api/ranklist";

// 同步更改榜单数据
const changeRankListInfoAction = (result) => ({
    type: actionTypes.CHANGE_RANK_LIST_INFO,
    data: result.playlist
});

// 异步获取榜单数据
export const getRankListInfoAction = (id) => {
    return async dispatch => {
        const result = await getRankListInfo(id);
        // console.log(result);
        dispatch(changeRankListInfoAction(result));
    }
}

// 同步更改评论数据
const changeRankListCommentsAction = (result) => ({
    type: actionTypes.CHANGE_RANK_LIST_COMMENTS,
    data: result
});

// 异步获取评论数据
export const getRankListCommentsAction = (id, page, limit) => {
    return async dispatch => {
        const result = await getRankListComments(id, page, limit);
        // console.log(result);
        dispatch(changeRankListCommentsAction(result));
    }
}