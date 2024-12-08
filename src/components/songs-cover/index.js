import React, { memo } from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";

import "./style.less";

const SongsCover = memo(function (props) {
  const { name, picUrl, playCount, nowrap, author } = props;


  const classes = classNames("desc", {
    "desc-nowrap": nowrap
  })

  // 格式化播放次数
  const formatting = (count) => {
    const result = count / 10000;
    return result > 1 ? Math.floor(result) + "万" : count
  }

  return (
    <div className="songs-cover">
      <div className="cover">

        <img src={picUrl + "?param=140y140"} alt={name} />
        <a title={name} className="msk" href="#/">&nbsp;</a>

        <div className="bottom">
          <span className="icon-headset"></span>
          <span className="play-count">{formatting(playCount)}</span>
          <a href="#/">&nbsp;</a>
        </div>
      </div>
      <p className={classes}><a title={name} href="#/">{name}</a></p>
      {author &&
        <p className="author">
          <span>by</span>
          <a href="#/" title={author.nickname}>{author.nickname}</a>
          {author.userType === 200 && <i></i>}
          {(author.userType > 0 && author.userType <= 10) && < em ></em>}
        </p>
      }
    </div >
  );
});

SongsCover.propTypes = {
  name: PropTypes.string.isRequired, // 名称
  picUrl: PropTypes.string.isRequired, // 图片
  playCount: PropTypes.number.isRequired, // 播放次数
  nowrap: PropTypes.bool,//隐藏歌单名称超出部分
  author: PropTypes.object
}

SongsCover.defaultProps = {
  nowrap: false
}

export default SongsCover;