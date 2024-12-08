import React, { memo, useState, useEffect, Fragment, useRef, useCallback } from 'react';
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import Slider from "antd/es/slider";
import "antd/es/slider/style/css";

import AppPlayerList from "../app-player-list";

import {
	getSongDetailAction,
	changePlayWayAction,
	changeCurrentIndexAndSongAction,
	changeCurrentPlayLyricIndexAction
} from "../../pages/player/store/actionCreators";
import { formatDate } from "../../utils/format-utils";
import computedSingerNames from "../../utils/songer-utils"
import getPlaySong from "../../utils/play-music";

import "./style.less";
import defaultPlayMusicImage from "../../assets/img/default_album.jpg";

export default memo(function AppPlayerBar() {
	// state
	const [currentTime, setCurrentTime] = useState(0);	// 当前播放的时间
	const [progress, setProgress] = useState(0);				// 当前播放的进度条
	const [isChange, setIsChange] = useState(false);		// 当前是否正在改变播放进度
	const [isPlay, setIsPlay] = useState(false);
	const [isLockPlayBar, setIsLockPlayBar] = useState(false);
	const [showPlayerList, setShowPlayerList] = useState(false);// 控制播放列表的显示和隐藏

	// redux-hooks
	const { currentSong, playWay, playList, currentPlayLyric, currentPlayLyricIndex } = useSelector(state => ({
		currentSong: state.getIn(["player", "currentSong"]),
		playWay: state.getIn(["player", "playWay"]),
		playList: state.getIn(["player", "playList"]),
		currentPlayLyric: state.getIn(["player", "currentPlayLyric"]),
		currentPlayLyricIndex: state.getIn(["player", "currentPlayLyricIndex"])
	}), shallowEqual);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getSongDetailAction(1407551413));
	}, [dispatch]);

	// other hooks
	const audioRef = useRef();
	const playerBarRef = useRef();
	const promptRef = useRef();
	useEffect(() => {
		audioRef.current.src = getPlaySong(currentSong.id);
		isPlay && audioRef.current.play().then(res => {
			setIsPlay(true);
		}).catch(err => {
			setIsPlay(false);
		});
	}, [currentSong, isPlay]);

	// 歌曲总时长
	const totalTime = (currentSong.dt && formatDate(currentSong.dt, "mm:ss")) || "00:00";
	// 当前播放的时长
	const currentPlayTime = currentTime !== 0 ? formatDate(currentTime, "mm:ss") : "00:00";
	// 当前播放的进度条
	// const progress = (currentTime / (currentSong.dt || 0)) * 100;
	// 计算当前要显示的图片
	const picUrl = (currentSong.al && currentSong.al.picUrl) || defaultPlayMusicImage;
	// 播放音乐按钮的样式切换
	const playBtnClassName = isPlay ? "begin" : "pause";
	// 播放音乐按钮的文字的切换
	const playWayText = playWay === 0 ? '顺序' : playWay === 1 ? '随机' : '单曲'

	// 点击播放播放音乐
	const playMusic = useCallback(() => {
		isPlay ? audioRef.current.pause() : audioRef.current.play();
		setIsPlay(!isPlay);
	}, [isPlay]);

	// 音乐播放的时间进度
	const timeUpdate = (e) => {
		const playTime = e.target.currentTime * 1000;
		if (!isChange) {
			setCurrentTime(playTime);
			// setCurrentTime(currentPlayTime * 1000);
			setProgress((currentTime / (currentSong.dt || 0)) * 100);
		}

		// 获取当前的歌词
		let i = 0;
		for (; i < currentPlayLyric.length; i++) {
			let lyricItem = currentPlayLyric[i];
			if (playTime < lyricItem.time) {
				break;
			}
		}
		// console.log(currentPlayLyric[i - 1]);
		// console.log(i - 1);
		if (currentPlayLyricIndex !== (i - 1)) {
			// console.log("dispatch");
			dispatch(changeCurrentPlayLyricIndexAction(i - 1));
		}
	}

	// 进度条的改变
	const sliderChange = useCallback((value) => {
		setIsChange(true);
		setCurrentTime((value / 100) * (currentSong.dt || 0));
		setProgress(value);
	}, [currentSong.dt]);

	// 进度条的改变之后
	const sliderAfterChange = useCallback((value) => {
		const time = (value / 100) * (currentSong.dt || 0);
		audioRef.current.currentTime = time / 1000;
		setCurrentTime(time);
		setIsChange(false);

		!isPlay && playMusic();
	}, [currentSong.dt, isPlay, playMusic]);

	// 鼠标移动到handle上就显示
	const handleMouseEnter = () => {
		if (isLockPlayBar === false)
			playerBarRef.current.style.height = "53px";
	}

	// 定义一个定时器
	let timeOutID = null;
	// 鼠标移除到handle上就隐藏
	const handleMouseLeave = () => {
		// 清除定时器
		window.clearTimeout(timeOutID);
		if (showPlayerList) return;// 当前播放列表显示直接退出
		// 设置离开666ms之后再收起
		timeOutID = window.setTimeout(() => {
			if (isLockPlayBar === false) {
				playerBarRef.current.style.height = "7px";
			}
		}, 666);
	}

	// 动态切换锁的样式
	const lockIconClass = classNames('btn', {
		'btn-unlocking': !isLockPlayBar,
		'btn-locking': isLockPlayBar
	});
	// 动态切换播放方式图标
	const playWayIcon = classNames({
		"way-btn": playWay === 0,
		"random": playWay === 1,
		"single": playWay === 2
	});

	// 改变播放方式
	const changePlayWay = () => {
		let num = playWay + 1;
		num = num >= 3 ? 0 : num;
		// setPlayWay(num);
		dispatch(changePlayWayAction(num));
		if (promptRef.current.style.display === "block") return;
		promptRef.current.style.display = "block";
		window.setTimeout(() => {
			promptRef.current.style.display = "none";
		}, 1000);
	}

	// 切换歌曲
	const changeMusic = (type) => {
		dispatch(changeCurrentIndexAndSongAction(type));
	}

	// 歌曲播放结束
	const handleMusicEnded = () => {
		// console.log("歌曲播放结束了");
		if (playWay === 2 || playList.length === 1) {	// 单曲循环
			audioRef.current.currentTime = 0;
			audioRef.current.play();
		} else {
			dispatch(changeCurrentIndexAndSongAction(-1));
		}
	}

	// 关闭播放列表窗口
	const closePlayList = () => {
		setShowPlayerList(false);
	}

	// console.log(playWay);
	// console.log(playList);

	// console.log(currentTime);
	// console.log(audioRef.current);

	// audio.volume控制音量


	return (
		<div className="player-bar-wrapper">

			<div className="player-bar" ref={playerBarRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

				<div className="compound">
					<div className="compound-left">
						<button onClick={() => setIsLockPlayBar(!isLockPlayBar)} className={lockIconClass}></button>
					</div>
					<div className="compound-right"></div>
				</div>

				<div className="bg" ></div>
				<div className="handle"></div>

				<div className="player-wrap">
					<div className="btns">
						<button
							onClick={() => changeMusic(-1)}
							title="上一首(ctrl+←)"
							className="prev"
						>上一首</button>
						<button
							title="播放/暂停(p)"
							className={playBtnClassName}
							onClick={() => playMusic()}
						>播放/暂停</button>
						<button
							onClick={() => changeMusic(1)}
							title="下一首(ctrl+→)"
							className="next"
						>下一首</button>
					</div>

					<div className="head">
						<Link className="cover" to={"/discover/player?id=" + currentSong.id}>&nbsp;</Link>
						<img src={picUrl + "?param=40y40"} alt={currentSong.name} />
					</div>

					<div className="play">

						<div className="song-info">
							<Link className="song-name"
								title={currentSong.name}
								to={"/discover/player?id=" + currentSong.id}
							>{currentSong.name}</Link>
							{
								currentSong.id && (
									currentSong.mv !== 0 && <a className="song-mv" title="MV" href="#/">&nbsp;</a>
								)
							}
							<div title={currentSong.ar && computedSingerNames(currentSong.ar)} className="singer-name">
								{
									currentSong.ar && currentSong.ar.map((item, index) => (
										<Fragment key={item.id}>
											<a href="#/">{item.name}</a>{index !== currentSong.ar.length - 1 && "/"}
										</Fragment>
									))
								}
							</div>
							{
								currentSong.id && (
									<a className="song-link" title="来自榜单" href="#/">&nbsp;</a>
								)}
						</div>

						<div className="progress-bar-wrapper">
							<Slider tooltipVisible={false} value={progress} onChange={sliderChange} onAfterChange={sliderAfterChange} />

							<div className="time">
								<span className="begin">{currentPlayTime}</span>
								<span> / {totalTime}</span>
							</div>
						</div>

					</div>

					<div className="tool">
						<button className="collect" title="收藏">收藏</button>
						<button className="share" title="分享">分享</button>
					</div>

					<div className="line"></div>

					<div className="control">
						<button className="volume-btn" title="音量"></button>
						<button className={playWayIcon} title={playWayText} onClick={changePlayWay}></button>
						<div className="list-btn-wrapper">
							<button className="list-btn" onClick={() => setShowPlayerList(!showPlayerList)}>{playList.length}</button>
						</div>
						<div ref={promptRef} className="prompt">{playWayText}播放</div>
					</div>

				</div>


				{
					showPlayerList && <AppPlayerList parentRef={playerBarRef} closePlayList={closePlayList} />
				}
			</div>

			<audio ref={audioRef} onTimeUpdate={timeUpdate} onEnded={handleMusicEnded} />
		</div >
	);
});