import React, { memo, useContext, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import ActionButton from "../../../../../../components/action-button";

import { formatDate } from "../../../../../../utils/format-utils";

import { RankListContext } from "../../../ranklist";

import { getRankListInfoAction } from "../../store/actionCreators";

import "./style.less";

export default memo(function RankListHeader() {
    // other hooks
    const rankListID = useContext(RankListContext);

    // redux hooks
    const { rankListInfo } = useSelector(state => ({
        rankListInfo: state.getIn(["rankList", "rankListInfo"])
    }), shallowEqual);
    const dispatch = useDispatch();

    // useEffect
    useEffect(() => {
        dispatch(getRankListInfoAction(rankListID));
        window.scroll(0, 0);
    }, [dispatch, rankListID]);

    // 处理数据
    const updateTime = formatDate(rankListInfo.trackUpdateTime, "MM月dd日");

    const parsingRegExp = /每周(.{1})/;
    const result = parsingRegExp.exec(rankListInfo.description);
    const updateFrequency = result ? result[1] : "天";

    // console.log(rankListInfo);

    return (
        <div className="rank-list-header-wrapper">
            <div className="rank-list-header-left">
                <img src={rankListInfo.coverImgUrl + "?param=150y150"} alt={rankListInfo.name} />
                <span className="image-cover"></span>
            </div>
            <div className="rank-list-header-right">
                <h2 className="rank-list-name">{rankListInfo.name}</h2>
                <div className="rank-list-update-time">
                    <span className="time-icon"></span>
                    <span>最近更新：{updateTime}&nbsp;&nbsp;</span>
                    <span >&#40;每{updateFrequency}更新&#41;</span>
                </div>
                <ActionButton
                    collectCount={"(" + rankListInfo.subscribedCount + ")"}
                    shareCount={"(" + rankListInfo.shareCount + ")"}
                    commentCount={"(" + rankListInfo.commentCount + ")"} />
            </div>
        </div>
    );
});
