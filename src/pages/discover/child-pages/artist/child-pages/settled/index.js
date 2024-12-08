import React, { memo, useEffect, useRef, useCallback, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import TitleHeaderArtist from "../../../../../../components/title-header-artist";
import SingerCoverList from "../../child-components/singer-cover-list";


import { getSettledSingerListAction } from "../../store/actionCreators";

import { ARTIST_SETTLED_LOADING_LIMIT } from "../../../../../../common/constants";
import { settledSingerListData } from "../../../../../../common/local-data";

export default memo(function Settled() {
    // state
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);// 控制上一次的加载更多数据还没有加载出来
    // redux hooks
    const { settledSingerList } = useSelector(state => ({
        settledSingerList: state.getIn(["artist", "settledSingerList"])
    }), shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSettledSingerListAction(ARTIST_SETTLED_LOADING_LIMIT, 1));
    }, [dispatch]);

    // other hooks
    const settledSingerRef = useRef();

    // 执行 dispatch 请求加载更多数据
    const loadMore = useCallback(() => {
        setLoading(true);
        dispatch(getSettledSingerListAction(ARTIST_SETTLED_LOADING_LIMIT, page + 1, () => {
            setLoading(false);
        }));
        setPage(page + 1);
    }, [page, dispatch]);

    const bindScroll = useCallback(() => {
        const elementHeight = settledSingerRef.current.clientHeight;
        // console.log(elementHeight);
        const scrollTop = document.documentElement.scrollTop;
        if (!loading && page < 2 && scrollTop > elementHeight * 0.7) {
            loadMore();
        }
        if (page >= 2) {// 大于2直接删除监听事件了
            window.removeEventListener("scroll", bindScroll);
        }
    }, [loadMore, page, loading]);

    // 监听scroll的滚动
    useEffect(() => {
        window.addEventListener("scroll", bindScroll);
        return () => window.removeEventListener("scroll", bindScroll);
    }, [bindScroll]);

    // console.log(settledSingerList);
    return (
        <div ref={settledSingerRef}>
            <TitleHeaderArtist title="入驻歌手" />
            <SingerCoverList singerList={settledSingerListData} />
            <SingerCoverList singerList={settledSingerList} />
        </div>
    );
});
