import { Map } from "immutable";

import * as actionTypes from "./constants";

const defaultState = Map({
  playList: [],// 播放列表
  currentSongIndex: 0,// 当前播放歌曲的索引值
  currentSong: {},
  currentLyric: [],
  similaritySong: [],
  includeSongList: [],
  songComment: {},
  playWay: 0,  // 播放的方式： 0 循环，1 随机，2 单曲
  currentPageSong: {},// 当前歌曲详情页面数据
  currentPlayLyric: [],// 当前播放歌曲的歌词
  currentPlayLyricIndex: 0,// 当前播放歌曲的那一句歌词的索引
});

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_CURRENT_SONG:
      return state.set("currentSong", action.data);
    case actionTypes.CHANGE_CURRENT_LYRIC:
      return state.set("currentLyric", action.data);
    case actionTypes.CHANGE_SIMILARITY_SONG:
      return state.set("similaritySong", action.data);
    case actionTypes.CHANGE_INCLUDE_SONG_LIST:
      return state.set("includeSongList", action.data);
    case actionTypes.CHANGE_SONG_COMMENT:
      return state.set("songComment", action.data);
    case actionTypes.CHANGE_PLAY_LIST:
      return state.set("playList", action.data);
    case actionTypes.CHANGE_CURRENT_SONG_INDEX:
      return state.set("currentSongIndex", action.data);
    case actionTypes.CHANGE_PLAY_WAY:
      return state.set("playWay", action.data);
    case actionTypes.CHANGE_CURRENT_PAGE_SONG:
      return state.set("currentPageSong", action.data);
    case actionTypes.CHANGE_CURRENT_PLAY_LYRIC:
      return state.set("currentPlayLyric", action.data);
    case actionTypes.CHANGE_CURRENT_PLAY_LYRIC_INDEX:
      return state.set("currentPlayLyricIndex", action.data);
    default:
      return state;
  }
}

export default reducer;
