import request from "./request";

// 获取歌曲详情
export function getSongDetail(ids) {
  return request({
    url: "/song/detail",
    params: {
      ids  //必选参数 : id: 歌曲 id
    }
  });
}

// 获取歌曲详情
export function getLyric(id) {
  return request({
    url: "/lyric",
    params: {
      id  //必选参数 : id: 歌曲 id
    }
  });
}

// 获取相似歌曲
export function getSimilaritySong(id) {
  return request({
    url: "/simi/song",
    params: {
      id  //必选参数 : id: 歌曲 id
    }
  });
}

// 获取包含这首歌的歌单
export function getIncludeSongList(id) {
  return request({
    url: "/simi/playlist",
    params: {
      id  //必选参数 : id: 歌曲 id
    }
  })
}

// 获取歌曲评论数据
export function getSongComment(id, page, limit) {
  const offset = (page - 1) * limit;
  return request({
    url: "/comment/music",
    params: {
      id,  //必选参数 : id: 歌曲 id
      offset
    }
  });
}