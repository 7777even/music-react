import request from "./request";

// 榜单
export function getRankListInfo(id) {
    return request({
        url: "/playlist/detail",
        params: {
            id      // 排行榜歌单 ID
        }
    });
}

// 评论
export function getRankListComments(id, page, limit) {
    const offset = (page - 1) * limit;
    return request({
        url: "/comment/playlist",
        params: {
            id,      // 排行榜歌单 ID
            offset,
            limit
        }
    });
}