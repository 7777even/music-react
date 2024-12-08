import * as actionTypes from "./constants";
import {
    getCategoryList,
    getProgramRankList,
    getRecommendProgramList,
    getDJRadioRecommend,
    getCategoryHotRadio
} from "../../../../../api/djradio";

// 同步获取主播电台分类
const changeCategoryListAction = (result) => ({
    type: actionTypes.CHANGE_CATEGORY_LIST,
    data: result.categories
});
// 异步获取主播电台分类
export const getCategoryListAction = () => {
    return async dispatch => {
        const result = await getCategoryList();
        // console.log(result);
        dispatch((changeCategoryListAction(result)));
    }
}

// 同步获取推荐节目列表
const changeRecommendProgramListAction = (result) => ({
    type: actionTypes.CHANGE_RECOMMEND_PROGRAM_LIST,
    data: result.programs
})

// 异步获取推荐节目列表
export const getRecommendProgramListAction = () => {
    return async dispatch => {
        const result = await getRecommendProgramList();
        // console.log(result);
        dispatch(changeRecommendProgramListAction(result));
    }
}


// 同步获取节目排行榜
const changeProgramRankListAction = (result) => ({
    type: actionTypes.CHANGE_PROGRAM_RANK_LIST,
    data: result.toplist
})
// 异步获取节目排行榜
export const getProgramRankListAction = (limit) => {
    return async dispatch => {
        const result = await getProgramRankList(limit);
        // console.log(result);
        dispatch(changeProgramRankListAction(result));
    }
}

// 同步获取全部推荐电台数据
const changeAllDJRadioDataAction = (result) => ({
    type: actionTypes.CHANGE_ALL_DJ_RADIO_DATA,
    data: result
});

// 异步获取全部推荐电台数据
export const getAllDjRadioDataAction = (djRadioArr) => {
    let resultArr = [];
    djRadioArr.forEach(item => {
        resultArr.push(getDJRadioRecommend(item.id))
    });
    // console.log(resultArr);
    return async dispatch => {
        const result = await Promise.all(resultArr);
        result.forEach((item, index) => {
            item.id = djRadioArr[index].id;
            item.categoryName = djRadioArr[index].categoryName;
        });
        // console.log(result);
        dispatch(changeAllDJRadioDataAction(result));
    }
}


// 同步更改修改电台数据
const changeGoodNewRadioAction = (result) => ({
    type: actionTypes.CHANGE_GOOD_NEW_RADIO,
    data: result.djRadios
});

// 异步更改修改电台数据
export const getGoodNewRadioAction = (type) => {
    return async dispatch => {
        const result = await getDJRadioRecommend(type);
        // console.log(result);
        dispatch(changeGoodNewRadioAction(result));
    }
}

// 同步获取对应分类热门电台数据
const changeCategoryHotRadioAction = (result) => ({
    type: actionTypes.CHANGE_CATEGORY_HOT_RADIO,
    data: result
});


// 异步获取对应分类热门电台数据
export const getCategoryHotRadioAction = (page, cateId, limit) => {
    return async dispatch => {
        const result = await getCategoryHotRadio(page, cateId, limit);
        // console.log(result);
        dispatch(changeCategoryHotRadioAction(result));
    }
}