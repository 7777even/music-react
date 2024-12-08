import React, { memo, useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import classNames from "classnames";

import Item from "./item";

import { playListCategoryData } from "../../../../../../common/local-data";

import { getPlayListCategoryAction, getPlayListDataAction } from "../../store/actionCreators";

import { PLAY_LIST_LIMIT } from "../../../../../../common/constants";

import "./style.less";

export default memo(function HeaderCategory() {
    // state
    const [showModal, setShowModal] = useState(false);
    // redux hooks
    const { playListCategory, currentCategoryName } = useSelector(state => ({
        playListCategory: state.getIn(["playList", "playListCategory"]),
        currentCategoryName: state.getIn(["playList", "currentCategoryName"])
    }), shallowEqual);
    const dispatch = useDispatch();
    // other hooks
    const categoryButton = useRef();
    const categoryModel = useRef();

    useEffect(() => {
        dispatch(getPlayListCategoryAction());
    }, [dispatch]);


    // 隐藏Model框
    const hideModel = useCallback((e) => {
        if (categoryButton.current.contains(e.target) || categoryModel.current.contains(e.target)) {
            return;
        }
        showModal && setShowModal(false);
    }, [showModal]);
    // 添加全局事件
    useEffect(() => {
        document.addEventListener("click", hideModel);
        return () => {
            document.removeEventListener("click", hideModel);
        }
    }, [showModal, hideModel]);

    // 动态样式
    const classes = classNames("category-content", {
        "category-content-show": showModal
    });

    // console.log(playListCategory);

    // 点击了的某一分类
    const handleCategory = (categoryName) => {
        // console.log(categoryName);
        dispatch(getPlayListDataAction(0, categoryName, PLAY_LIST_LIMIT));
        setShowModal(false);
    }

    return (
        <div className="header-category-wrapper">

            <div className="header-category-left">
                <h3>{currentCategoryName}</h3>
                <div className="all-category" onClick={() => setShowModal(!showModal)} ref={categoryButton}>
                    <span className="left">
                        选择分类<i></i>
                    </span>
                    <span className="right"></span>
                </div>
            </div>
            <button className="header-category-right">热门</button>

            <div className={classes} ref={categoryModel}>
                <div className="header"><i></i></div>
                <div className="content">
                    <h3><button onClick={() => handleCategory("全部")}>全部风格</button></h3>
                    {
                        playListCategoryData.map(item =>
                            <Item
                                key={item.id}
                                name={item.name}
                                nameZh={item.nameZh}
                                handleCategory={handleCategory}
                                category={playListCategory[item.name]}
                            />
                        )
                    }
                </div>
                <div className="footer"></div>
            </div>
        </div >
    );
});
