import request from "./request";

// 获取主播电台的分类列表
export function getCategoryList() {
    return request({
        url: "/dj/catelist"
    });
}


// 获取推荐节目
export function getRecommendProgramList() {
    return request({
        url: "/program/recommend"
    });
}

// 获取节目排行榜
export function getProgramRankList(limit) {
    return request({
        url: "/dj/program/toplist",
        params: {
            limit
        }
    });
}

// 获取电台推荐(也是优秀电台接口)
export function getDJRadioRecommend(type) {
    return request({
        url: "/dj/recommend/type",
        params: {
            type
        }
    });
}

// 获取类别热门电台
export function getCategoryHotRadio(page, cateId, limit) {
    const offset = (page - 1) * limit;
    return request({
        url: "/dj/radio/hot",
        params: {
            page,
            cateId,
            offset,
            limit
        }
    });
}




/**
 * 电台 - 类别热门电台
        可选参数 :

        limit : 返回数量 , 默认为 30

        offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0

        cateId: 类别 id,可通过 /dj/category/recommend 接口获取

        接口地址 : /dj/radio/hot

        调用例子 : /dj/radio/hot?cateId=2001(创作|翻唱) /dj/radio/hot?cateId=10002 (3D|电子)
 *
 *
 *
 * 电台 - 分类推荐
        说明 : 登陆后调用此接口 , 传入分类,可获得对应类型电台列表

        必选参数 : type: 电台类型 , 数字 , 可通过/dj/catelist获取 , 对应关系为 id 对应 此接口的 type, name 对应类型

        接口地址 : /dj/recommend/type

        调用例子 : /dj/recommend/type?type=1(明星做主播) /dj/recommend/type?type=2001 (创作|翻唱)
 */