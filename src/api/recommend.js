import request from "./request";

// 首页轮播图
export function getTopBanners() {
    return request({
        url: "/banner"
    });
}

// 热门推荐
export function getHotRecommends(limit) {
    return request({
        url: "/personalized",
        params: {
            limit   // 获取的数据条数
        }
    });
}

// 新碟上架
export function getNewAlbums(limit) {
    return request({
        url: "top/album",
        params: {
            limit   // 获取的数据条数
        }
    });
}

// 榜单
export function getRankList(id) {
    return request({
        url: "/playlist/detail",
        params: {
            id      // 排行榜歌单 ID
        }
    });
}
