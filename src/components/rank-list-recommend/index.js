import React, { memo } from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getSongDetailAction } from "../../pages/player/store/actionCreators";

import "./style.less";

const RankListRecommend = memo(function (props) {
  const { coverImgUrl, name, tracks } = props;

  // redux-hooks
  const dispatch = useDispatch();

  const playMusic = (item) => {
    // console.log(item.id);
    dispatch(getSongDetailAction(item.id));
  }

  return (
    <div className="rank-list-recommend-wrapper">

      <div className="item-top">
        <div className="item-cover">
          <img src={coverImgUrl + "?param=100y100"} alt="test" />
          <a href="#/" title={name}>{name}</a>
        </div>
        <div className="item-title">
          <a href="#/" title={name}><h3>{name}</h3></a>
          <div className="item-btn">
            <button className="btn btn-play">播放</button>
            <button className="btn btn-collect">收藏</button>
          </div>
        </div>
      </div>

      <div className="item-list">
        {
          tracks.map((item, index) => (
            <div className="list-row" key={item.id}>
              <span title={item.name} className="no">{index + 1}</span>
              <Link to={`/discover/player?id=${item.id}`} className="song-name">{item.name}</Link>
              {/* <a title={item.name} href="#/" className="song-name">{item.name}</a> */}
              <div className="operation">
                <button className="btn btn-play" onClick={() => playMusic(item)} title="播放">播放</button>
                <button className="btn btn-add" onClick={() => playMusic(item)} title="添加到播放列表">添加到播放列表</button>
                <button className="btn btn-collect" title="收藏">收藏</button>
              </div>
            </div>
          ))
        }
      </div>

      <div className="item-more">
        <a href="#/">查看全部&gt;</a>
      </div>
    </div>
  )
});
RankListRecommend.propTypes = {
  coverImgUrl: PropTypes.string.isRequired,   // 榜单封面图片
  name: PropTypes.string.isRequired,          // 榜单名称
  tracks: PropTypes.array.isRequired          // 榜单歌曲数组
}
export default RankListRecommend;
