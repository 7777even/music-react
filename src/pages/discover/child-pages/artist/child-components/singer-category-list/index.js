import React, { memo, useContext } from 'react';
import { NavLink, Link } from "react-router-dom";

import { ArtistContext } from "../../../artist";

import { singerCateListData } from "../../../../../../common/local-data";

import "./style.less";

export default memo(function SingerCategoryList() {
    const params = useContext(ArtistContext);
    // console.log(singerCateListData);

    return (
        <div className="singer-category-list-wrapper">
            <h2 className="category-title">推荐</h2>
            <NavLink className="category-item" exact to="/discover/artist">推荐歌手</NavLink>
            <NavLink className="category-item" to="/discover/artist/settled">入驻歌手</NavLink>
            {
                singerCateListData.map(category =>
                    <div key={category.id} className="category">
                        <h2 className="category-title">{category.categoryName}</h2>
                        {
                            category.categoryList.map((item, index) =>
                                <Link
                                    className={category.id === params.area && index + 1 === params.type ? "active category-item" : "category-item"}
                                    key={item.id}
                                    to={item.link}
                                >{item.name}</Link>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
});
