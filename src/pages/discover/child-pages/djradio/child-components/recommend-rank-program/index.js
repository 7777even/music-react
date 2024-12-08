import React, { memo, useEffect, Fragment } from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { getProgramRankListAction, getRecommendProgramListAction } from "../../store/actionCreators";
import { DJ_RADIO_PROGRAM_RANK_LIST_LIMIT } from "../../../../../../common/constants";

import "./style.less";


export default memo(function RecommendRankProgram() {
    // redux hooks
    const { recommendProgramList, programRankList } = useSelector(state => ({
        programRankList: state.getIn(["djRadio", "programRankList"]),
        recommendProgramList: state.getIn(["djRadio", "recommendProgramList"])
    }), shallowEqual);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProgramRankListAction(DJ_RADIO_PROGRAM_RANK_LIST_LIMIT));
        dispatch(getRecommendProgramListAction());
    }, [dispatch]);

    // console.log(programRankList);
    // console.log(recommendProgramList);


    const hotPercent = (score) => {
        let hot = score / 1000 || 0;
        hot = hot > 100 ? 100 : hot;
        return hot + "%";
    }

    return (
        <div className="program-wrapper">
            <div className="program-recommend-wrapper">

                <div className="title">
                    <h3>推荐节目</h3>
                    <a href="#/">更多 &#62;</a>
                </div>

                <div className="content">
                    {
                        recommendProgramList && recommendProgramList.map(item =>
                            <div key={item.id} className="item">
                                <div className="left">
                                    <a title="播放" className="head" href="#/">
                                        <img src={item.coverUrl + "?param=40x40"} alt={item.name} />
                                        <i></i>
                                    </a>
                                    <div className="info">
                                        <a className="name"
                                            title={item.name}
                                            href="#/">{item.name}</a>
                                        <a className="author"
                                            title={item.radio && item.radio.name}
                                            href="#/">{item.radio && item.radio.name}</a>
                                    </div>
                                </div>

                                <a className="tag" href="#/">{item.radio && item.radio.category}</a>
                            </div>
                        )
                    }

                </div>
            </div>


            <div className="program-rank-list-wrapper">
                <div className="title">
                    <h3>节目排行榜</h3>
                    <a href="#/">更多 &#62;</a>
                </div>
                <div className="content">
                    {
                        programRankList && programRankList.map((item, index) =>
                            <div key={item.program.id} className="item">
                                <div className="left">
                                    <div className="rank">
                                        <span>{(index + 1 >= 10) ? (index + 1) : "0" + (index + 1)}</span>
                                        <div className="point">
                                            {item.lastRank < 0 ?
                                                <i className="new"></i>
                                                :
                                                <Fragment>
                                                    <i className={item.lastRank > item.rank ? "" : (item.lastRank === item.rank ? "reduce" : "down")}></i>
                                                    <span>{Math.abs(item.lastRank - item.rank)}</span>
                                                </Fragment>
                                            }
                                        </div>
                                    </div>
                                    <a title="播放" className="head" href="#/">
                                        <img src={item.program.blurCoverUrl} alt="" />
                                        <i></i>
                                    </a>
                                    <div className="info">
                                        <a className="name"
                                            title={item.program.name}
                                            href="#/">{item.program.name}</a>
                                        <a className="author"
                                            title={item.program.radio.name}
                                            href="#/">{item.program.radio.name}</a>
                                    </div>
                                </div>

                                <div className="right">
                                    <span style={{ width: item.score && hotPercent(item.score) }}>
                                        <i></i>
                                    </span>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
});
