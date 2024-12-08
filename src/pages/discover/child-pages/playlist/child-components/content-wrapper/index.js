import React, { memo, useEffect, Fragment, useCallback, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import RewritePagination from "../../../../../../components/rewrite-pagination";

import { getPlayListDataAction } from "../../store/actionCreators";

import { PLAY_LIST_LIMIT } from "../../../../../../common/constants";

import SongsCover from "../../../../../../components/songs-cover";
import "./style.less";

export default memo(function ContentWrapper() {
    // state
    const [page, setPage] = useState(1);
    // redux-hooks
    const { currentCategoryName, playListData } = useSelector(state => ({
        playListData: state.getIn(["playList", "playListData"]),
        currentCategoryName: state.getIn(["playList", "currentCategoryName"])
    }), shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        setPage(1);
        dispatch(getPlayListDataAction(1, currentCategoryName, PLAY_LIST_LIMIT));
    }, [dispatch, currentCategoryName]);

    // console.log(playListData);

    const pageChange = useCallback(page => {
        setPage(page);
        window.scroll(0, 0);
        dispatch(getPlayListDataAction(page, currentCategoryName, PLAY_LIST_LIMIT));
    }, [dispatch, currentCategoryName]);


    return (
        <Fragment>
            <div className="item-wrapper">
                {
                    playListData.playlists && playListData.playlists.map(item =>
                        <SongsCover key={item.id}
                            name={item.name}
                            nowrap
                            picUrl={item.coverImgUrl + "?param=140y140"}
                            playCount={item.playCount}
                            author={item.creator}
                        />
                    )
                }
            </div>
            <div className="pagination-wrapper">
                <RewritePagination
                    current={page}
                    onChange={pageChange}
                    pageSize={PLAY_LIST_LIMIT}
                    total={playListData.total}
                />
            </div>
        </Fragment>
    );
});
