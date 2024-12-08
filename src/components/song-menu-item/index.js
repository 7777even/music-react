import React, { memo } from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classNames from "classnames";

import "./style.less";

const SongMenuItem = memo(function (props) {
    const { songMenuID, songMenuImage, songMenuName, updateTime, active } = props;
    // 是否选中
    const classes = classNames("song-menu-item", {
        "item-active": active
    });
    return (
        <div className={classes} >
            <div className="item-left">
                <img src={songMenuImage} alt={songMenuName} />
                <Link to={`/discover/ranklist?id=${songMenuID}`}>&nbsp;</Link>
            </div>
            <Link className="item-right" to={`/discover/ranklist?id=${songMenuID}`}>
                <p className="song-menu-name">{songMenuName}</p>
                <p className="update-time">{updateTime}</p>
            </Link>
        </div>
    );
});

SongMenuItem.propTypes = {
    songMenuID: PropTypes.number.isRequired,// ID
    songMenuImage: PropTypes.string.isRequired,// 歌单图片
    songMenuName: PropTypes.string.isRequired,// 歌单名称
    updateTime: PropTypes.string.isRequired,// 更新时间
    // active: PropTypes.bool
}

// SongMenuItem.defaultProps = {
//     active: false
// };

export default SongMenuItem;
