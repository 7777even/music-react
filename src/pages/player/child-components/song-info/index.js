import React, { memo, useState, useContext, useEffect, Fragment } from 'react';
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { MyContext } from "../../../player";

import ActionButton from "../../../../components/action-button";

import { getLyricAction, getCurrentPageAction } from "../../store/actionCreators";

import computedSingerNames from "../../../../utils/songer-utils";

import "./style.less";
import defaultPlayMusicImage from "../../../../assets/img/default_album.jpg";


export default memo(function SongInfo() {
    const songID = useContext(MyContext);
    const [fullShow, setFullShow] = useState(false);// 展开/收起歌词状态的控制

    // redux-hooks
    const { currentSong, currentLyric, songComment } = useSelector(state => ({
        currentSong: state.getIn(["player", "currentPageSong"]),
        currentLyric: state.getIn(["player", "currentLyric"]),
        songComment: state.getIn(["player", "songComment"])
    }), shallowEqual);

    const dispatch = useDispatch();
    useEffect(() => {
        window.scroll(0, 0);    // 页面一进来,或数据刷新就调整scroll
        dispatch(getCurrentPageAction(songID));
        dispatch(getLyricAction(songID));
    }, [dispatch, songID]);

    // 计算当前播放歌曲的歌手名字
    // const computedSingerNames = (singerNames) => {
    //     let singerName = "";
    //     singerNames.forEach((item, index) => {
    //         singerName += item.name;
    //         if (index !== singerNames.length - 1)
    //             singerName += "/";
    //     });
    //     return singerName;
    // }

    // 计算当前要显示的图片
    const picUrl = (currentSong.al && currentSong.al.picUrl) || defaultPlayMusicImage;
    // 计算当前歌词
    // const lyric = currentLyric.lyric && currentLyric.lyric.replace(/\[.*\]/gi, "|-|").split("|-|");

    // console.log(currentSong);
    // console.log(currentLyric);
    console.log();

    return (
        <div className="song-info-wrapper">
            <div className="song-info-content">

                <div className="content-left">
                    <div className="image-wrapper">
                        <img src={picUrl + "?param=130y130"} alt={currentSong.al && currentSong.name} />
                        <span className="image-bg"></span>
                    </div>
                    <div className="create-link">
                        <i className="music-icon"></i>
                        <a href="#/">生成外链播放器</a>
                    </div>
                </div>


                <div className="content-right">
                    <div className="head">
                        <i className="label"></i>
                        <div className="title">
                            <h2>{currentSong.name}</h2>
                            <div className="tag">{currentSong.alia && currentSong.alia.map(item => item)}</div>
                        </div>
                    </div>
                    <p className="desc-singer">歌手：
                        <span title={currentSong.ar && computedSingerNames(currentSong.ar)}>
                            {
                                currentSong.ar && currentSong.ar.map((item, index) => (
                                    <Fragment key={item.id}>
                                        <a href="#/">{item.name}</a>{index !== currentSong.ar.length - 1 && " / "}
                                    </Fragment>
                                ))
                            }
                        </span>
                    </p>
                    <p className="desc-album">所属专辑：<a href="#/">{currentSong.al && currentSong.al.name}</a></p>

                    <ActionButton commentCount={"(" + songComment.total + ")"} />

                    <div className="lyric">
                        {
                            currentLyric && currentLyric.slice(0, 12).map((item, index) => (
                                <Fragment key={index}>{item.content}<br /></Fragment>
                            ))
                        }
                        <div className={fullShow ? "" : "surplus"}>
                            {
                                currentLyric && currentLyric.slice(12, currentLyric.length).map((item, index) => (
                                    <Fragment key={index}>{item.content}<br /></Fragment>
                                ))
                            }
                        </div>
                        <div className={fullShow ? "fewer" : "unfold"}>
                            <button onClick={() => setFullShow(!fullShow)}>{fullShow ? "收起" : "展开"}<i></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="song-info-error">
                <p><a href="#/">报错</a></p>
            </div>
        </div>
    );
});
