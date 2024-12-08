import React, { memo, Fragment } from 'react';
import PropTypes from "prop-types";

import computedSingerNames from "../../../../../../utils/songer-utils";

import "./style.less";

const NewAlbumCover = memo(function (props) {
    const { newAlbumCoverList } = props;
    return (
        <div className="new-album-cover-wrapper">
            {
                newAlbumCoverList.map(item => (
                    <div key={item.id} className="new-album-item">
                        <div className="item-content">
                            <img src={item.picUrl + "?param=130y130"} alt={item.name} />
                            <a title={item.name} href="#/" className="msk">&nbsp;</a>
                            <a href="#/" className="paly">&nbsp;</a>
                        </div>
                        <p className="song-name">
                            <a href="#/" title={item.name}>{item.name}</a>
                        </p>
                        <p className="artist-name">
                            <span title={item.artists && computedSingerNames(item.artists)}>
                                {
                                    item.artists && item.artists.map((artist, index) => (
                                        <Fragment key={artist.id}>
                                            <a href="#/">{artist.name}</a>{index !== item.artists.length - 1 && " / "}
                                        </Fragment>
                                    ))
                                }
                            </span>
                        </p>
                    </div>
                ))
            }
        </div>
    );
});

NewAlbumCover.propTypes = {
    newAlbumCoverList: PropTypes.array.isRequired
}

NewAlbumCover.defaultProps = {
    newAlbumCoverList: []
}

export default NewAlbumCover;
