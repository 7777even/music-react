import React, { memo, Fragment } from 'react';
import PropTypes from "prop-types";

import "./style.less";

const TitleHeaderArtist = memo(function (props) {
    const { title, more, categoryList, handleCategory } = props;

    const handleClick = (item) => {
        handleCategory && handleCategory(item);
    }
    return (
        <div className="title-header-artist-wrapper">
            <div className="left">
                <h3>{title}</h3>
                {categoryList &&
                    <div className="category-wrapper">
                        {
                            categoryList.map((item, index) =>
                                <Fragment key={item.id}>
                                    <button key={item.id}
                                        onClick={() => handleClick(item)}
                                    >{item.categoryName}</button>
                                    {
                                        index !== categoryList.length - 1 && <span>|</span>
                                    }
                                </Fragment>
                            )
                        }
                    </div>
                }
            </div>
            {more && <a href="#/" className="more">更多 &#62;</a>}
        </div>
    );
});

TitleHeaderArtist.propTypes = {
    title: PropTypes.string.isRequired,
    more: PropTypes.bool,
    categoryList: PropTypes.array,
    handleCategory: PropTypes.func
}

TitleHeaderArtist.defaultProps = {
    more: false
}


export default TitleHeaderArtist;
