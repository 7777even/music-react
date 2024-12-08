// 计算当前url query传值的歌曲 id
export const parsingUrl = url => {
    if (url === undefined) {
        return url;
    }
    return url.replace(/[^0-9]/ig, "");
};