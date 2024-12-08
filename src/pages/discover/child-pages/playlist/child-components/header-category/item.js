import React, { memo, Fragment } from 'react';
import PropTypes from "prop-types";

const Item = memo(function (props) {
    const { name, nameZh, category, handleCategory } = props;
    const handleClick = (categoryName) => {
        handleCategory(categoryName);
    }
    return (
        <div className={name}>
            <div className="left"><i></i>{nameZh}</div>
            <div className="right">
                {
                    category && category.map((item, index) =>
                        <Fragment key={index}>
                            <button onClick={() => handleClick(item.name)}>{item.name}</button>
                            {category.length - 1 !== index && <span>|</span>}
                        </Fragment>
                    )
                }
            </div>
        </div>
    );
});

Item.propTypes = {
    name: PropTypes.string.isRequired,
    nameZh: PropTypes.string.isRequired,
    category: PropTypes.array.isRequired,
    handleCategory: PropTypes.func.isRequired
}

Item.defaultProps = {
    category: []
}

export default Item;