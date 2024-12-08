import { Map } from "immutable";

import * as actionTypes from "./constants";

const defaultState = Map({
    hotNewAlbum: [],
    allNewAlbum: [],
    //  ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
    currentCategory: "ALL"
});

function reducer(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.CHANGE_HOT_NEW_ALBUM:
            return state.set("hotNewAlbum", action.data);
        case actionTypes.CHANGE_ALL_NEW_ALBUM:
            return state.set("allNewAlbum", action.data);
        case actionTypes.CHANGE_CURRENT_CATEGORY:
            return state.set("currentCategory", action.data);
        default:
            return state;
    }
}

export default reducer;