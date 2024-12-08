import { Map } from "immutable";
import * as actionTypes from "./constants";

const defaultState = Map({
    hotSingerList: [],
    settledSingerList: [],
    singerCategoryList: []
});

function reducer(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.CHANGE_HOT_SINGER_LIST:
            return state.set("hotSingerList", action.data);
        case actionTypes.CHANGE_SETTLED_SINGER_LIST:
            return state.set("settledSingerList", action.data);
        case actionTypes.CHANGE_SINGER_CATEGORY_LIST:
            return state.set("singerCategoryList", action.data);
        default:
            return state;
    }
}

export default reducer;