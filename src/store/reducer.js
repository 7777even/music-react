import { combineReducers } from "redux-immutable";

import { reducer as recommendReducer } from "../pages/discover/child-pages/recommend/store";
import { reducer as rankListReducer } from "../pages/discover/child-pages/ranklist/store";
import { reducer as playListReducer } from "../pages/discover/child-pages/playlist/store";
import { reducer as djRadioReducer } from "../pages/discover/child-pages/djradio/store";
import { reducer as artistReducer } from "../pages/discover/child-pages/artist/store";
import { reducer as albumReducer } from "../pages/discover/child-pages/album/store";

import { reducer as playerReducer } from "../pages/player/store";

// 合并 reducer
const reducer = combineReducers({
    recommend: recommendReducer,
    player: playerReducer,
    rankList: rankListReducer,
    playList: playListReducer,
    djRadio: djRadioReducer,
    artist: artistReducer,
    album: albumReducer
});

export default reducer;