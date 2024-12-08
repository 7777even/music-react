import React, { memo, useEffect, useContext, useState, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import RewritePagination from "../../../../../../components/rewrite-pagination";

import { DjRadioContext } from "../../../djradio";
import { getCategoryHotRadioAction } from "../../store/actionCreators";

import { DJ_RADIO_HOT_CATEGORY_LIMIT } from "../../../../../../common/constants";

import { elementTop } from "../../../../../../utils/element-top";

import "./style.less";

export default memo(function HotRadioRank() {
    //state
    const [page, setPage] = useState(1);
    // redux hooks
    const dispatch = useDispatch();

    // other hooks
    const { categoryHotRadio } = useSelector(state => ({
        categoryHotRadio: state.getIn(["djRadio", "categoryHotRadio"])
    }), shallowEqual);

    const djRadioID = useContext(DjRadioContext);
    const hotRadioRankWrapperRef = useRef();

    useEffect(() => {
        setPage(1);
        dispatch(getCategoryHotRadioAction(1, djRadioID, DJ_RADIO_HOT_CATEGORY_LIMIT));
    }, [dispatch, djRadioID]);

    // console.log(categoryHotRadio);
    // console.log(page);

    const pageChange = (page) => {
        const top = hotRadioRankWrapperRef.current ? elementTop(hotRadioRankWrapperRef.current) : 0;
        setPage(page);
        window.scroll(0, top);
        dispatch(getCategoryHotRadioAction(page, djRadioID, DJ_RADIO_HOT_CATEGORY_LIMIT));
    }

    return (
        <div className="hot-radio-rank-wrapper" ref={hotRadioRankWrapperRef}>
            <div className="hot-radio-rank-title">
                <h3 >电台排行榜</h3>
                <div className="category">
                    <a className="down-btn" href="/#">上升最快</a>
                    <span>|</span>
                    <a className="hot-btn active" href="/#">最热电台</a>
                </div>
            </div>

            <div className="hot-radio-rank-content">
                {
                    categoryHotRadio.djRadios && categoryHotRadio.djRadios.map(item =>
                        <div key={item.id} className="item">
                            <a className="head" href="/#">
                                <img src={item.picUrl} alt={item.name} />
                            </a>
                            <div className="content">
                                <h3><a href="#/">{item.name}</a></h3>
                                <p className="author">
                                    <i></i>
                                    <a href="#/">{item.dj.nickname}</a>
                                    {
                                        item.dj.userType === 4
                                            ?
                                            <sub></sub>
                                            : (item.dj.userType > 0 && item.dj.userType <= 10)
                                                ?
                                                <em></em>
                                                :
                                                <span></span>
                                    }
                                </p>
                                <p className="info">共{item.programCount}期&nbsp;&nbsp;&nbsp;&nbsp;订阅{item.subCount}次</p>
                            </div>
                        </div>
                    )
                }
            </div>

            <RewritePagination
                current={page}
                onChange={pageChange}
                pageSize={34}
                total={categoryHotRadio.count}
            />
        </div>
    );
});
