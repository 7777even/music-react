import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { getHotNewAlbumListAction, getAllNewAlbumListAction, changeCurrentCategoryAction } from "./store/actionCreators";

import TitleHeaderArtist from "../../../../components/title-header-artist";
import NewAlbumCover from "./child-components/new-album-cover";
import RewritePagination from "../../../../components/rewrite-pagination";

import { newAlbumCategoryData } from "../../../../common/local-data";
import { ALL_NEW_ALBUM_LIST_LIMIT } from "../../../../common/constants";
import "./style.less";

export default memo(function Album() {
    // state
    const [page, setPage] = useState(1);
    // redux hooks
    const { hotNewAlbum, allNewAlbum, currentCategory } = useSelector(state => ({
        hotNewAlbum: state.getIn(["album", "hotNewAlbum"]),
        allNewAlbum: state.getIn(["album", "allNewAlbum"]),
        currentCategory: state.getIn(["album", "currentCategory"])
    }), shallowEqual);
    const dispatch = useDispatch();
    useEffect(() => {
        setPage(1);
        dispatch(getHotNewAlbumListAction());
    }, [dispatch]);

    useEffect(() => {
        setPage(1);
        // page, area, limit
        dispatch(getAllNewAlbumListAction(1, currentCategory, ALL_NEW_ALBUM_LIST_LIMIT));
    }, [dispatch, currentCategory]);

    const handleCategory = (item) => {
        // console.log(item);
        dispatch(changeCurrentCategoryAction(item.id));
        dispatch(getAllNewAlbumListAction(1, item.id, ALL_NEW_ALBUM_LIST_LIMIT));
    }

    const pageChange = (page) => {
        // console.log(page);
        window.scroll(0, 600);
        dispatch(getAllNewAlbumListAction(page, currentCategory, ALL_NEW_ALBUM_LIST_LIMIT));
        setPage(page);
    }

    // console.log(hotNewAlbum);
    // console.log(allNewAlbum);
    // console.log(newAlbumCategoryData);
    // console.log(currentCategory);

    return (
        <div className="album-wrapper">
            <div className="album-content">
                <TitleHeaderArtist title="热门新碟" />
                {hotNewAlbum && <NewAlbumCover newAlbumCoverList={hotNewAlbum.slice(0, 10)} />}
                <TitleHeaderArtist title="全部新碟" categoryList={newAlbumCategoryData} handleCategory={handleCategory} />
                <NewAlbumCover newAlbumCoverList={allNewAlbum.albums} />

                <RewritePagination
                    current={page}
                    onChange={pageChange}
                    pageSize={ALL_NEW_ALBUM_LIST_LIMIT}
                    total={allNewAlbum.total}
                />
            </div>
        </div>
    );
});
