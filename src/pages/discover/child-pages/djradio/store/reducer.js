import { Map } from "immutable";
import * as actionTypes from "./constants";

const defaultState = Map({
    categoryList: [],
    programRankList: [],
    recommendProgramList: [],
    allDjRadioDate: [],
    goodNewRadio: [],
    categoryHotRadio: []
});

function reducer(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.CHANGE_CATEGORY_LIST:
            return state.set("categoryList", action.data);
        case actionTypes.CHANGE_PROGRAM_RANK_LIST:
            return state.set("programRankList", action.data);
        case actionTypes.CHANGE_RECOMMEND_PROGRAM_LIST:
            return state.set("recommendProgramList", action.data);
        case actionTypes.CHANGE_ALL_DJ_RADIO_DATA:
            return state.set("allDjRadioDate", action.data);
        case actionTypes.CHANGE_GOOD_NEW_RADIO:
            return state.set("goodNewRadio", action.data);
        case actionTypes.CHANGE_CATEGORY_HOT_RADIO:
            return state.set("categoryHotRadio", action.data);
        default:
            return state;
    }
}

export default reducer;