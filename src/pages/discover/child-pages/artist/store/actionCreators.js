import * as actionTypes from "./constants";
import { getHotSingerList, getSingerCategoryList } from "../../../../../api/artist";

// 同步获取热门歌手列表数据
const changeHotSingerListAction = (result) => ({
    type: actionTypes.CHANGE_HOT_SINGER_LIST,
    data: result.artists
});
// 异步获取热门歌手列表数据
export const getHotSingerListAction = (limit, page) => {
    return async dispatch => {
        const result = await getHotSingerList(limit, page);
        dispatch(changeHotSingerListAction(result));
    }
}

// 同步获取热门歌手列表数据
const changeSettledSingerListAction = (result) => ({
    type: actionTypes.CHANGE_SETTLED_SINGER_LIST,
    data: result
});
// 异步获取热门歌手列表数据
export const getSettledSingerListAction = (limit, page, cb) => {
    return async (dispatch, getState) => {
        const oldState = getState().getIn(["artist", "settledSingerList"]);
        const result = await getHotSingerList(limit, page);
        // 总数据就100大于就直接退出
        if (oldState.length >= 100) return;
        // 数据如果大于0，代表不是第一次请求数据，就进行合并操作，否则就是第一次请求数据，不合并
        if (oldState.length > 0) {
            const settledSingerList = [...oldState, ...result.artists];
            // console.log(settledSingerList);
            dispatch(changeSettledSingerListAction(settledSingerList));
            cb && cb();// 回调，代表数据请求完毕
        } else {
            dispatch(changeSettledSingerListAction(result.artists));
        }
    }
}

// 同步获取歌手分类列表
const changeSingerCategoryListAction = (result) => ({
    type: actionTypes.CHANGE_SINGER_CATEGORY_LIST,
    data: result.artists
});
// 异步获取歌手分类列表
export const getSingerCategoryListAction = (type, area, initial, limit) => {
    return async dispatch => {
        const result = await getSingerCategoryList(type, area, initial, limit);
        // console.log(result);
        dispatch(changeSingerCategoryListAction(result));
    }
}

