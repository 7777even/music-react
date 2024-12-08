import React, { memo, useEffect, useCallback, useRef, useState, Fragment } from 'react';
import PropTypes from "prop-types";
import { useSelector, shallowEqual } from "react-redux";

import Slider from 'antd/es/slider';
import "antd/es/slider/style/css";


import computedSingerNames from "../../utils/songer-utils";
import { formatDate } from "../../utils/format-utils";

import "./style.less";

const AppPlayerList = memo(function (props) {
    const { closePlayList, parentRef } = props;
    // state
    const [value, setValue] = useState(0);

    // redux-hooks
    const { currentPlayLyric, currentPlayLyricIndex, playList, currentSong } = useSelector(state => ({
        currentPlayLyric: state.getIn(["player", "currentPlayLyric"]),
        currentPlayLyricIndex: state.getIn(["player", "currentPlayLyricIndex"]),
        playList: state.getIn(["player", "playList"]),
        currentSong: state.getIn(["player", "currentSong"]),
    }), shallowEqual);

    // other hooks
    const appPlayerListRef = useRef();
    const lyricContentRef = useRef();

    // 隐藏Model框
    const hideModel = useCallback((e) => {
        // 判断当前单击的元素是否包含要显示的元素
        if (parentRef.current.contains(e.target) || appPlayerListRef.current.contains(e.target)) {
            return;
        }
        closePlayList();
    }, [closePlayList, parentRef]);
    // 添加全局点击事件
    useEffect(() => {
        document.addEventListener("click", hideModel);
        return () => {
            document.removeEventListener("click", hideModel);
        }
    }, [hideModel]);


    useEffect(() => {
        // 拿到当前歌词的总长度，乘上一个 当前歌词的索引在当前歌词长度的位置的百分比，就拿到了当前歌词顶部的距离
        const height = lyricContentRef.current.clientHeight * currentPlayLyricIndex / currentPlayLyric.length
        // console.log(currentPlayLyricIndex);
        // 设置当前的歌词的高度为窗口显示的一半
        lyricContentRef.current.style.top = height * -1 + 80 + "px";
        // console.log(height.toFixed(2) * -1);
        setValue(() => height * -1);
    }, [currentPlayLyricIndex, setValue, currentPlayLyric]);

    const sliderChange = (value) => {
        console.log(value);
        setValue(() => value);
        lyricContentRef.current.style.top = value + "px";
    }

    // 歌曲总时长
    const totalTime = (currentSong.dt && formatDate(currentSong.dt, "mm:ss")) || "00:00";

    // console.log(currentPlayLyric);
    // console.log(currentPlayLyricIndex);
    // console.log(playList);
    // console.log(currentSong);

    return (
        <div className="app-player-list-wrapper" ref={appPlayerListRef}>
            <div className="player-list-header">
                <div className="header-left">
                    <h3>播放列表&#40;{playList.length}&#41;</h3>
                    <div className="control-btn">
                        <button className="collect-btn">
                            <i></i>收藏全部
                        </button>
                        <span className="line"></span>
                        <button className="clear-btn">
                            <i></i>清除
                        </button>
                    </div>
                </div>
                <div className="header-right">
                    <p>{currentSong.name}</p>
                    <button className="close-btn" onClick={closePlayList}>关闭</button>
                </div>
            </div>

            <div className="player-list-content">
                <div className="content-left">
                    {
                        playList.length === 0 ?
                            <div className="not-song-wrapper">
                                <div className="not-song-content">
                                    <p className="icon">
                                        <i></i>你还没有添加任何歌曲
                                    </p>
                                    <p className="text">
                                        去首页<a href="/#">发现音乐</a>，或在<a href="/#">我的音乐</a>收听自己收藏的歌单。
                                    </p>
                                </div>
                            </div>
                            :
                            <div className="music-list-wrapper">
                                {
                                    playList.map(item => (
                                        <div className={item.id === currentSong.id ? "music-item  current-music" : "music-item"}
                                            key={item.id}
                                        >
                                            <div className="music-item-left">
                                                <i></i><span>{item.name}</span>
                                            </div>
                                            <div className="music-item-right">
                                                <div className="control-btn">
                                                    <button className="collect" title="收藏">收藏</button>
                                                    <button className="share" title="分享">分享</button>
                                                    <button className="download" title="下载">下载</button>
                                                    <button className="remove" title="删除">删除</button>
                                                </div>

                                                <div className="singer-name">
                                                    <span title={item.ar && computedSingerNames(item.ar)}>
                                                        {
                                                            item.ar && item.ar.map((value, index) => (
                                                                <Fragment key={value.id}>
                                                                    <a href="#/">{value.name}</a>{index !== item.ar.length - 1 && " / "}
                                                                </Fragment>
                                                            ))
                                                        }
                                                    </span>
                                                </div>

                                                <span className="song-time">{totalTime}</span>
                                                {
                                                    true ?
                                                        <a href="#/" className="music-link">来源</a>
                                                        :
                                                        <a href="#/" className="music-link show">来源</a>
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                    }
                </div>

                <div className="content-line">
                    {/* <Slider tooltipVisible={false}
                        vertical /> */}
                </div>

                <div className="content-right" >
                    <div className="lyric-content" ref={lyricContentRef}>
                        {
                            currentPlayLyric && currentPlayLyric.map((item, index) =>
                                (
                                    <p key={item.time} className={index === currentPlayLyricIndex ? "active" : ""}>{item.content}</p>
                                ))
                        }
                    </div>
                </div>
                <div className="content-line">
                    <Slider
                        max={0}
                        min={((lyricContentRef.current ? lyricContentRef.current.clientHeight : 260) * -1) + 240}
                        value={value}
                        onChange={sliderChange}
                        tooltipVisible={false}
                        vertical />
                </div>

            </div>
        </div>
    );
});


AppPlayerList.propTypes = {
    closePlayList: PropTypes.func.isRequired,// 关闭播放列表的回调
    parentRef: PropTypes.object.isRequired, // 父组件的ref，用于获取当前点击的位置，然后判断是否关闭列表框
}

export default AppPlayerList;