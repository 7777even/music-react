import { Map } from "immutable";
import * as actionTypes from "./constants";

const defaultState = Map({
    playListCategory: {},
    playListData: [],
    currentCategoryName: "全部"
});

function reducer(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.CHANGE_PLAY_LIST_CATEGORY:
            return state.set("playListCategory", action.data);
        case actionTypes.CHANGE_PLAY_LIST_DATA:
            return state.set("playListData", action.data);
        case actionTypes.CHANGE_CURRENT_CATEGORY_NAME:
            return state.set("currentCategoryName", action.data);
        default:
            return state;
    }
}

export default reducer;