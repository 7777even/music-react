import React, { memo } from 'react';
import PropTypes from "prop-types"

const Item = memo(function (props) {
  const { picUrl, name, artistName } = props;
  return (
    <div className="item">
      <div className="item-content">
        <img src={picUrl + "?param=100y100"} alt={name} />
        <a title={name} href="#/" className="msk">&nbsp;</a>
        <a href="#/" className="paly">&nbsp;</a>
      </div>
      <p className="song-name"><a href="#/">{name}</a></p>
      <p className="artist-name"><a href="#/">{artistName}</a></p>
    </div>
  );
});

Item.propTypes = {
  picUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired
}


export default Item;

