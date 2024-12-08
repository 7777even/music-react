import request from "./request";

// 获取热门新碟
export function getHotNewAlbumList() {
    return request({
        url: "/album/newest"
    });
}

// 获取全部新碟
export function getAllNewAlbumList(page, area, limit) {
    const offset = (page - 1) * limit;
    return request({
        url: "/album/new",
        params: {
            offset,
            area,
            limit
        }
    });
}

/**
 * 全部新碟
    说明 : 登陆后调用此接口 ,可获取全部新碟

    可选参数 :

    limit : 返回数量 , 默认为 30

    offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0

    area : ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本

    接口地址 : /album/new

    调用例子 : /album/new?area=KR&limit=10
 */