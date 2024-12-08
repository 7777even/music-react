import React, { memo, useEffect, useContext, Fragment, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import TitleHeaderArtist from "../../../../../../components/title-header-artist";
import SingerCoverList from "../../child-components/singer-cover-list";
import SingerNameList from "../../child-components/singer-name-list";

import { getSingerCategoryListAction } from "../../store/actionCreators";

import { ArtistContext } from "../../../artist";

import { singerCateListData, singerCategoryData } from "../../../../../../common/local-data";
import { ARTIST_HOT_SINGER_LIST_LIMIT } from "../../../../../../common/constants";
import "./style.less";

export default memo(function Genre() {
    // state
    const [currentCategory, setCurrentCategory] = useState("-1");
    // context hooks
    const params = useContext(ArtistContext);

    // redux hooks
    const { singerCategoryList } = useSelector(state => ({
        singerCategoryList: state.getIn(["artist", "singerCategoryList"])
    }), shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        setCurrentCategory("-1");
        window.scroll(0, 0);
        // type, area, initial, limit
        dispatch(getSingerCategoryListAction(params.type, params.area, -1, 100));
    }, [dispatch, params]);

    const handleCategory = (categoryID) => {
        // console.log(categoryID);
        if (currentCategory === categoryID) return;
        setCurrentCategory(categoryID);
        dispatch(getSingerCategoryListAction(params.type, params.area, categoryID, 100));
    }

    // 计算当前的标题
    const currentCategoryType = params.type === 1 ? "男歌手" : params.type === 2 ? "女歌手" : "组合/乐队";
    const currentCategoryID = singerCateListData.findIndex(item => item.id === params.area);
    const currentCategoryTitle = currentCategoryID !== -1 ? singerCateListData[currentCategoryID].categoryName + currentCategoryType : "未知分类";

    // console.log(singerCategoryList);
    // console.log(singerCategoryData);

    return (
        <Fragment>
            <TitleHeaderArtist title={currentCategoryTitle} />
            <div className="genre-singer-category-wrapper">
                {
                    singerCategoryData.map(item =>
                        <button
                            key={item.id}
                            className={currentCategory === item.categoryID ? "category-btn category-btn-active" : "category-btn"}
                            onClick={() => handleCategory(item.categoryID)}
                        >{item.categoryName}</button>
                    )
                }
            </div>
            <SingerCoverList singerList={singerCategoryList.slice(0, 10)} />
            <SingerNameList singerList={singerCategoryList.slice(10, ARTIST_HOT_SINGER_LIST_LIMIT)} />
        </Fragment >
    );
});
