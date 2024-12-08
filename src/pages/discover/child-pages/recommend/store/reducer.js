import { Map } from "immutable";
import * as actionTypes from "./constants";

const defaultState = Map({
    topBanners: [],
    hotRecommends: [],
    newAlbums: [],
    surgeRankList: [],
    newRankList: [],
    originalRankList: []
});

function reducer(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.CHANGE_TOP_BANNERS:
            return state.set("topBanners", action.data);
        case actionTypes.CHANGE_HOT_RECOMMEND:
            return state.set("hotRecommends", action.data);
        case actionTypes.CHANGE_NEW_ALBUM:
            return state.set("newAlbums", action.data);
        case actionTypes.CHANGE_SURGE_RANK_LIST:
            return state.set("surgeRankList", action.data);
        case actionTypes.CHANGE_NEW_RANK_LIST:
            return state.set("newRankList", action.data);
        case actionTypes.CHANGE_ORIGINAL_RANK_LIST:
            return state.set("originalRankList", action.data);
        default:
            return state;
    }
}


export default reducer;