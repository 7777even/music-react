import React, { memo, Fragment, useRef, useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames";

import { DjRadioContext } from "../../../djradio";

import { getCategoryListAction } from "../../store/actionCreators";

import "./style.less";

export default memo(function DJRadioCategory() {
    //state
    const [page, setPage] = useState(0);
    // redux hooks
    const { categoryList } = useSelector(state => ({
        categoryList: state.getIn(["djRadio", "categoryList"])
    }), shallowEqual);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategoryListAction());
    }, [dispatch]);

    // other hooks
    const categoryWrapperRef = useRef();
    const djRadioID = useContext(DjRadioContext);

    // 业务逻辑
    const handleClick = (type) => {
        if (type === "next" && page === 0) {
            categoryWrapperRef.current.style.left = "-900px";
            setPage(1);
            return;
        }

        if (type === "prev" && page === 1) {
            categoryWrapperRef.current.style.left = 0;
            setPage(0);
            return;
        }
    }

    // 动态添加样式
    const prevBtnClass = classNames("prev-btn", {
        "active-btn": page === 0
    });

    const nextBtnClass = classNames("next-btn", {
        "active-btn": page === 1
    });

    // console.log(djRadioID);

    return (
        <div className="dj-radio-category-wrapper">
            <div className="viewport-category">
                <div className="category-wrapper" ref={categoryWrapperRef}>

                    <div className="category-content">
                        {
                            categoryList.slice(0, 18).map(item =>
                                <Fragment key={item.id}>
                                    <Link className={item.id === djRadioID ? "item active" : "item"} to={`/discover/djradio/category?id=${item.id}`} >
                                        <i style={{ backgroundImage: ` url(${item.picWebUrl})` }}></i>
                                        <span>{item.name}</span>
                                    </Link>
                                </Fragment>
                            )
                        }
                    </div>

                    <div className="category-content">
                        {
                            categoryList.slice(18, categoryList.length).map(item =>
                                <Fragment key={item.id}>
                                    <Link className={item.id === djRadioID ? "item active" : "item"} to={`/discover/djradio/category?id=${item.id}`} >
                                        <i style={{ backgroundImage: ` url(${item.picWebUrl})` }}></i>
                                        <span>{item.name}</span>
                                    </Link>
                                </Fragment>
                            )
                        }
                    </div>
                </div>

            </div>
            <button className={prevBtnClass} onClick={() => handleClick("prev")}>向左</button>
            <button className={nextBtnClass} onClick={() => handleClick("next")}>向右</button>
            <div className="pointer">
                <span className={page === 0 ? "current" : ""} onClick={() => handleClick("prev")}></span>
                <span className={page === 1 ? "current" : ""} onClick={() => handleClick("next")}></span>
            </div>
        </div>
    );
});
