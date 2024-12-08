import React, { memo, Fragment } from 'react';
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";

import { getSongDetailAction } from "../../pages/player/store/actionCreators";

import computedSingerNames from "@/utils/songer-utils";
import { formatMinuteSecond } from "../../utils/format-utils";

import "./style.less";

const PlayList = memo(function (props) {
    const { trackCount, playCount, CreateLink, songList, frontThereRow } = props;
    // console.log(songList);
    const dispatch = useDispatch();

    const classes = classNames("song-list-content", {
        " front-there-row": frontThereRow
    });


    const playMusic = (item) => {
        dispatch(getSongDetailAction(item.id));
    }

    return (
        <Fragment>

            <div className="song-list-header">
                <div className="left">
                    <h3>歌曲列表</h3>
                    <span>{trackCount}首歌</span>
                </div>
                <div className="right">
                    {
                        CreateLink &&
                        <div className="create-link">
                            <i className="music-icon"></i>
                            <a href="#/">生成外链播放器</a>
                        </div>
                    }

                    <div className="player-count">
                        播放：<strong>{playCount}</strong>次
                    </div>

                </div>
            </div>

            <div className={classes}>
                <div className="content-header">
                    <div className="song-index">
                        <span></span>
                    </div>
                    <div className="song-title"><span>标题</span></div>
                    <div className="song-time"><span>时长</span></div>
                    <div className="singer"><span>歌手</span></div>
                </div>

                {
                    songList.map((item, index) => (
                        <div key={item.id} className="content-row">

                            <div className="ranking-index">
                                <div className="index">
                                    <span>{index + 1}</span>
                                    <div className="num">
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                            <div className="ranking-name">
                                {
                                    frontThereRow && index <= 2 && <a className="song-image" href="#/">
                                        <img src={item.al && (item.al.picUrl + "?param=50y50&quality=100")} alt={item.name} />
                                    </a>
                                }
                                <div className="name">
                                    <span className="play-icon" onClick={() => playMusic(item)}></span>
                                    <div className="song-name">
                                        <a href="#/"
                                            title={item.name + (item.tns ? item.tns[0] : "") + (item.alia && item.alia.length > 0 ? item.alia[0] : "")}
                                        >{item.name}</a>
                                        {item.tns && <span title={item.tns[0]}>&nbsp;&nbsp;-&nbsp;&#40;{item.tns[0]}&#41;</span>}
                                        {item.alia && item.alia.length > 0 && <span title={item.alia[0]}>&nbsp;&nbsp;-&nbsp;&#40;{item.alia[0]}&#41;</span>}

                                    </div>
                                    {
                                        item.mv !== 0 && <span title="播放mv" className="mv-icon">MV</span>
                                    }
                                </div>

                            </div>
                            <div className="ranking-time">
                                <div className="time">
                                    <span>{formatMinuteSecond(item.dt)}</span>
                                    <div className="handle">
                                        <button className="add" title="添加到播放列表">添加到播放列表</button>
                                        <button className="collect" title="收藏">收藏</button>
                                        <button className="share" title="分享">分享</button>
                                        <button className="download" title="下载">下载</button>
                                    </div>
                                </div>
                            </div>
                            <div className="ranking-singer">
                                <div className="singer">
                                    {
                                        item.ar && item.ar.map((value, index) => (
                                            <Fragment key={value.id + index}>
                                                <a href="#/" title={item.ar && computedSingerNames(item.ar)}>{value.name}</a>{index !== item.ar.length - 1 && " / "}
                                            </Fragment>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>

        </Fragment>
    );
});
PlayList.propTypes = {
    trackCount: PropTypes.number.isRequired,// 歌曲数量
    playCount: PropTypes.number.isRequired,//播放次数
    CreateLink: PropTypes.bool,// 是否显示生成外链播放器
    songList: PropTypes.array.isRequired,// 歌曲列表数组,
    frontThereRow: PropTypes.bool// 前三行突出显示

}

PlayList.defaultProps = {
    trackCount: 0,
    playCount: 0,
    CreateLink: false,
    songList: [],
    frontThereRow: false
}

export default PlayList