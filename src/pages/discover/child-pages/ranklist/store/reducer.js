import { Map } from "immutable";
import * as actionTypes from "./constants";

const defaultState = Map({
    rankListInfo: {},
    rankListComments: {}
});

function reducer(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.CHANGE_RANK_LIST_INFO:
            return state.set("rankListInfo", action.data);
        case actionTypes.CHANGE_RANK_LIST_COMMENTS:
            return state.set("rankListComments", action.data);
        default:
            return state;
    }
}


export default reducer;