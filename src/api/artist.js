import request from "./request";

// 获取热门歌手列表
export function getHotSingerList(limit, page) {
  const offset = (page - 1) * 50;
  return request({
    url: "/top/artists",
    params: {
      limit,
      offset
    }
  });
}

// 获取歌手分类列表
export function getSingerCategoryList(type, area, initial, limit) {
  return request({
    url: "/artist/list",
    params: {
      type,
      area,
      limit,
      initial
    }
  });
}
/**
 * 歌手分类列表
    说明 : 调用此接口,可获取歌手分类列表

    可选参数 :

    limit : 返回数量 , 默认为 30

    offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0

    initial: 按首字母索引查找参数,如 /artist/list?type=1&area=96&initial=b
        返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列, 热门传-1,其他传0

    type 取值:

    -1:全部
    1:男歌手
    2:女歌手
    3:乐队
    area 取值:

    -1:全部
    7华语
    96欧美
    8:日本
    16韩国
    0:其他
    接口地址 : /artist/list

    调用例子 : /artist/list?type=1&area=96&initial=b /artist/list?type=2&area=2&initial=b
 */