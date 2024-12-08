import request from "./request";

// 获取歌单分类
export function getPlayListCategory() {
    return request({
        url: "/playlist/catlist"
    });
}

// 获取歌单分类数据
export function getPlayListData(page, cat = "全部", limit, order = "hot") {
    const offset = (page - 1) * limit;
    return request({
        url: "/top/playlist",
        params: {
            cat,// cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
            limit,// 取出歌单数量 , 默认为 50
            order,//  order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
            offset// 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
        }
    });
}

/**
 * 歌单 ( 网友精选碟 )
    说明 : 调用此接口 , 可获取网友精选碟歌单

    可选参数 : order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'

    cat:cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)

    limit: 取出歌单数量 , 默认为 50

    offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值

    接口地址 : /top/playlist

    调用例子 : /top/playlist?limit=10&order=new


    歌单分类
    说明 : 调用此接口,可获取歌单分类,包含 category 信息

    接口地址 : /playlist/catlist

    调用例子 : /playlist/catlist
 */