import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import TitleHeaderArtist from "../../../../../../components/title-header-artist";

import SingerCoverList from "../../child-components/singer-cover-list";
import SingerNameList from "../../child-components/singer-name-list";

import { getHotSingerListAction } from "../../store/actionCreators";

import { ARTIST_HOT_SINGER_LIST_LIMIT } from "../../../../../../common/constants";
import { settledSingerListData } from "../../../../../../common/local-data";

import "./style.less";


export default memo(function Recommendation() {
    // redux hooks
    const { hotSingerList } = useSelector(state => ({
        hotSingerList: state.getIn(["artist", "hotSingerList"])
    }), shallowEqual);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getHotSingerListAction(ARTIST_HOT_SINGER_LIST_LIMIT, 1));
    }, [dispatch]);

    // console.log(hotSingerList);

    return (
        <div className="recommendation-wrapper">
            <TitleHeaderArtist title="入驻歌手" more />

            <SingerCoverList singerList={settledSingerListData} />

            <TitleHeaderArtist title="热门歌手" />

            <SingerCoverList singerList={hotSingerList.slice(0, 10)} />

            <SingerNameList singerList={hotSingerList.slice(10, ARTIST_HOT_SINGER_LIST_LIMIT)} />
        </div>
    );
});
