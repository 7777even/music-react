// 计算当前播放歌曲的歌手名字
export default function computedSingerNames(singerNames) {
    let singerName = "";
    singerNames.forEach((item, index) => {
        singerName += item.name;
        if (index !== singerNames.length - 1)
            singerName += " / ";
    });
    return singerName;
}