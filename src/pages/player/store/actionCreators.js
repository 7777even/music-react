import * as actionTypes from "./constants";

import { getSongDetail, getLyric, getSimilaritySong, getIncludeSongList, getSongComment } from "../../../api/player";
import { getRandomNumber } from "../../../utils/math-utils";
import { parsingLyrics } from "../../../utils/parsing-lyrics";

// 同步获取歌曲详情
const changeSongDetailAction = (result) => ({
  type: actionTypes.CHANGE_CURRENT_SONG,
  data: result
});
// 异步获取歌曲详情
export const getSongDetailAction = (ids) => {
  return async (dispatch, getState) => {
    // 1.根据id查找playList是否有该歌曲
    const playList = getState().getIn(["player", "playList"]);
    const songIndex = playList.findIndex(item => item.id === ids);
    // 2.判断是否找到歌曲
    let song = null;
    if (songIndex !== -1) {// 找到了歌曲
      dispatch(changeCurrentSongIndexAction(songIndex));
      song = playList[songIndex];
      dispatch(changeSongDetailAction(song));
      dispatch(getLyricAction(song.id));
    } else {// 没有找到歌曲
      const result = await getSongDetail(ids);
      // console.log(result);
      song = result.songs && result.songs[0];
      if (!song) return;
      // 3.将最新请求到的歌曲添加到播放列表
      const newPlayList = [...playList];
      newPlayList.push(song);
      // 更新redux的值
      dispatch(changePlayListAction(newPlayList));
      dispatch(changeCurrentSongIndexAction(newPlayList.length - 1));
      dispatch(changeSongDetailAction(song));

      // 3.请求该歌曲歌词
      if (!song) return;
      // dispatch(getLyricAction(song.id));
      dispatch(getCurrentPlayLyricAction(song.id));
    }
  }
}

// 同步获取歌词
const changeLyricAction = (result) => ({
  type: actionTypes.CHANGE_CURRENT_LYRIC,
  data: result
});
// 异步获取歌词
export const getLyricAction = (id) => {
  return async dispatch => {
    const result = await getLyric(id);
    // console.log(result);
    const lyricList = parsingLyrics(result.lrc ? result.lrc.lyric : "");
    // console.log(lyricList);
    dispatch(changeLyricAction(lyricList));
  }
}

// 同步获取相似歌曲
const changeSimilaritySong = (result) => ({
  type: actionTypes.CHANGE_SIMILARITY_SONG,
  data: result.songs
});
// 异步获取相似歌曲
export const getSimilaritySongAction = (id) => {
  return async dispatch => {
    const result = await getSimilaritySong(id);
    // console.log(result);
    dispatch(changeSimilaritySong(result));
  }
}

// 同步获取包含这首歌的歌单
const changeIncludeSongList = (result) => ({
  type: actionTypes.CHANGE_INCLUDE_SONG_LIST,
  data: result.playlists
});
// 异步获取包含这首歌的歌单
export const getIncludeSongListAction = (id) => {
  return async dispatch => {
    const result = await getIncludeSongList(id);
    // console.log(result);
    dispatch(changeIncludeSongList(result));
  }
}

// 同步获取歌曲评论
const changeSongComment = (result) => ({
  type: actionTypes.CHANGE_SONG_COMMENT,
  data: result
});
// 异步获取歌曲评论
export const getSongCommentAction = (id, page, limit) => {
  return async dispatch => {
    const result = await getSongComment(id, page, limit);
    // console.log(result);
    dispatch(changeSongComment(result));
  }
}

// 同步更改播放列表
export const changePlayListAction = (palyList) => ({
  type: actionTypes.CHANGE_PLAY_LIST,
  data: palyList
});

// 同步更改当前播放歌曲的索引
export const changeCurrentSongIndexAction = (index) => ({
  type: actionTypes.CHANGE_CURRENT_SONG_INDEX,
  data: index
});

// 同步更改播放方式
export const changePlayWayAction = (way) => ({
  type: actionTypes.CHANGE_PLAY_WAY,
  data: way
});

// 切换歌曲
export const changeCurrentIndexAndSongAction = (type) => {
  return (dispatch, getState) => {
    const playWay = getState().getIn(["player", "playWay"]);
    const playList = getState().getIn(["player", "playList"]);
    let currentSongIndex = getState().getIn(["player", "currentSongIndex"]);
    switch (playWay) {
      case 1:          // 随机播放
        let randomIndex = getRandomNumber(playList.length);
        while (randomIndex === currentSongIndex) {
          // console.log(randomIndex)
          randomIndex = getRandomNumber(playList.length);
        }
        // const randomIndex = getRandomNumber(playList.length);
        currentSongIndex = randomIndex;
        break;
      default:        // 顺序播放
        currentSongIndex += type;
        if (currentSongIndex >= playList.length) currentSongIndex = 0;
        if (currentSongIndex < 0) currentSongIndex = playList.length - 1;
        break;
    }
    const currentSong = playList[currentSongIndex];
    dispatch(changeSongDetailAction(currentSong));
    dispatch(changeCurrentSongIndexAction(currentSongIndex));
  }
}

// 同步获取歌曲详情
const changeCurrentPageAction = (result) => ({
  type: actionTypes.CHANGE_CURRENT_PAGE_SONG,
  data: result.songs[0]
});
// 异步获取歌曲详情
export const getCurrentPageAction = (ids) => {
  return async dispatch => {
    const result = await getSongDetail(ids);
    dispatch(changeCurrentPageAction(result));
  }
}

// 同步获取当前播放歌曲的歌词
const changeCurrentPlayLyricAction = (result) => ({
  type: actionTypes.CHANGE_CURRENT_PLAY_LYRIC,
  data: result
});
// 异步获取当前播放歌曲的歌词
export const getCurrentPlayLyricAction = (id) => {
  return async dispatch => {
    const result = await getLyric(id);
    // console.log(result);
    const lyricList = parsingLyrics(result.lrc ? result.lrc.lyric : "");
    // console.log(lyricList);
    dispatch(changeCurrentPlayLyricAction(lyricList));
  }
}



// 同步更改当前播放歌曲的那一句歌词的索引
export const changeCurrentPlayLyricIndexAction = (index) => ({
  type: actionTypes.CHANGE_CURRENT_PLAY_LYRIC_INDEX,
  data: index
})