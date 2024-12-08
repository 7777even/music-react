import * as actionTypes from "./constants";
import { getHotNewAlbumList, getAllNewAlbumList } from "../../../../../api/album";


// 同步获取热门新碟
const changeHotNewAlbumListAction = result => ({
    type: actionTypes.CHANGE_HOT_NEW_ALBUM,
    data: result.albums
});
// 异步获取热门新碟
export const getHotNewAlbumListAction = () => {
    return async dispatch => {
        const result = await getHotNewAlbumList();
        // console.log(result);
        dispatch(changeHotNewAlbumListAction(result));
    }
}

// 同步获取全部新碟
const changeAllNewAlbumListAction = result => ({
    type: actionTypes.CHANGE_ALL_NEW_ALBUM,
    data: result
});
// 异步获取全部新碟
export const getAllNewAlbumListAction = (page, area, limit) => {
    return async dispatch => {
        const result = await getAllNewAlbumList(page, area, limit);
        // console.log(result);
        dispatch(changeAllNewAlbumListAction(result));
    }
}

// 同步改变当前分类
export const changeCurrentCategoryAction = currentCategory => ({
    type: actionTypes.CHANGE_CURRENT_CATEGORY,
    data: currentCategory
})