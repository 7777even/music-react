import * as actionTypes from "./constants";

import { getPlayListCategory, getPlayListData } from "../../../../../api/playlist";

// 同步改变歌单列表分类
const changePlayListCategoryAction = (result) => ({
    type: actionTypes.CHANGE_PLAY_LIST_CATEGORY,
    data: result
});

// 异步获取歌单列表分类数据
export const getPlayListCategoryAction = () => {
    return async dispatch => {
        const result = await getPlayListCategory();
        // console.log(result);
        /*
            0: "语种"
            1: "风格"
            2: "场景"
            3: "情感"
            4: "主题"
        */
        const category = {
            language: [],
            style: [],
            scene: [],
            emotion: [],
            theme: []
        }

        result.sub && result.sub.forEach(item => {
            switch (item.category) {
                case 0:
                    category.language.push(item);
                    break;
                case 1:
                    category.style.push(item);
                    break;
                case 2:
                    category.scene.push(item);
                    break;
                case 3:
                    category.emotion.push(item);
                    break;
                default:
                    category.theme.push(item);
                    break;
            }
        });

        // console.log(category);

        dispatch(changePlayListCategoryAction(category));
    }
}

// 同步获取歌单数据
const changePlayListDataAction = (result) => ({
    type: actionTypes.CHANGE_PLAY_LIST_DATA,
    data: result
});

//  异步获取歌单数据
export const getPlayListDataAction = (page, cat, limit) => {
    return async dispatch => {
        const result = await getPlayListData(page, cat, limit);
        // console.log(result);
        dispatch(changeCurrentCategoryAction(cat));
        dispatch(changePlayListDataAction(result));
    }
};

// 同步更改当前分类
export const changeCurrentCategoryAction = (category) => ({
    type: actionTypes.CHANGE_CURRENT_CATEGORY_NAME,
    data: category
});