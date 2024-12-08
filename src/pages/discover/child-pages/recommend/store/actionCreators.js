import * as actionTypes from "./constants";

import { getTopBanners, getHotRecommends, getNewAlbums, getRankList } from "@/api/recommend";

// 同步步获取轮播图
const changeTopBannerAction = (result) => ({
    type: actionTypes.CHANGE_TOP_BANNERS,
    data: result.banners
});

// 异步获取轮播图
export const getTopBannerAction = () => {
    return async dispatch => {
        const result = await getTopBanners();
        // console.log(result);
        dispatch(changeTopBannerAction(result));
    }
}


// 同步获取热门推荐数据
const changeHotRecommend = (result) => ({
    type: actionTypes.CHANGE_HOT_RECOMMEND,
    data: result.result
})

// 异步获取热门推荐数据
export const getHotRecommendAction = (limit) => {
    return async dispatch => {
        const result = await getHotRecommends(limit);
        // console.log(result);
        dispatch(changeHotRecommend(result));
    }
}


// 同步获取新碟上架数据
const changeNewAlbum = (result) => ({
    type: actionTypes.CHANGE_NEW_ALBUM,
    data: result.monthData
});

// 异步获取新碟上架数据
export const getNewAlbumAction = (limit) => {
    return async dispatch => {
        const result = await getNewAlbums(limit);
        // console.log(result);
        dispatch(changeNewAlbum(result));
    }
}

// 同步获取首页飙升榜单数据
const changeSurgeRankList = (result) => ({
    type: actionTypes.CHANGE_SURGE_RANK_LIST,
    data: result.playlist
});
// 同步获取首页新歌榜单数据
const changeNewRankList = (result) => ({
    type: actionTypes.CHANGE_NEW_RANK_LIST,
    data: result.playlist
});
// 同步获取首页原创歌曲榜单数据
const changeOriginalRankList = (result) => ({
    type: actionTypes.CHANGE_ORIGINAL_RANK_LIST,
    data: result.playlist
});

// 异步获取首页歌曲榜单
export const getRankListAction = (id) => {
    return async dispatch => {
        const result = await getRankList(id);
        // console.log(result);
        switch (id) {
            case 19723756:
                dispatch(changeSurgeRankList(result));
                break;
            case 3779629:
                dispatch(changeNewRankList(result));
                break;
            case 2884035:
                dispatch(changeOriginalRankList(result));
                break;
            default:
                break;
        }
    }
}
