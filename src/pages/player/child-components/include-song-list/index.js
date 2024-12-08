import React, { memo, Fragment, useContext, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { getIncludeSongListAction } from "../../store/actionCreators";

import { MyContext } from "../../../player";
import "./style.less";

export default memo(function IncludeSongList() {
    const songID = useContext(MyContext);// 歌曲ID

    // redux-hooks
    const { includeSongList } = useSelector(state => ({
        includeSongList: state.getIn(["player", "includeSongList"])
    }), shallowEqual);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getIncludeSongListAction(songID));
    }, [dispatch, songID]);

    // console.log(includeSongList);

    return (
        <Fragment>
            <h3 className="include-song-head">
                <span>包含这首歌的歌单</span>
            </h3>
            <div className="include-song-content">
                {
                    includeSongList.map(item => (
                        <div key={item.id} className="item">
                            <div className="head">
                                <a href="#/" title={item.name}>
                                    <img src={item.coverImgUrl + "?param=50y50"} alt={item.name} />
                                </a>
                            </div>
                            <div className="info">
                                <div className="song-list-name">
                                    <a href="#/" title={item.name}>{item.name}</a>

                                </div>
                                <div className="song-list-writer">
                                    <span>by</span>
                                    <a href="#/" title={item.creator && item.creator.nickname}>{item.creator && item.creator.nickname}</a>
                                    {item.creator && item.creator.expertTags && item.creator.expertTags.length > 1 && <sub></sub>}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </Fragment>
    );
});
