import React, { memo } from 'react';
import PropTypes from "prop-types";
import "./style.less";


const DJRadioRecommend = memo(function (props) {
    const { djRadios, categoryName } = props;
    return (
        <div className="dj-radio-recommend-wrapper">
            <div className="dj-radio-title">
                <h3>
                    <a href="/#">{categoryName}</a><span>·</span>电台
                </h3>
                <a className="more" href="/#">更多 ></a>
            </div>
            <div className="dj-radio-item-wrapper">
                {
                    djRadios.splice(0, 4).map(item =>
                        <div key={item.id} className="item">
                            <a href="/#" className="head">
                                <img src={item.picUrl + "?param=200y200"} alt={item.name} />
                            </a>
                            <div className="desc">
                                <h3>
                                    <a href="/#">{item.name}</a>
                                </h3>
                                <p>{item.rcmdtext}</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
});


DJRadioRecommend.propTypes = {
    djRadios: PropTypes.array.isRequired,
    categoryName: PropTypes.string.isRequired
}

export default DJRadioRecommend;
