import React, { memo } from 'react';
import PropTypes from "prop-types";

import "./style.less";

const SingerCoverList = memo(function (props) {
    const { singerList } = props;
    // console.log(singerList);
    return (
        <div className="singer-cover-list-wrapper">
            {
                singerList && singerList.map(item => (
                    <div key={item.id} className="singer-cover-item">
                        <div className="singer-head">
                            <img src={item.picUrl + "?param=130y130"} alt={item.name} />
                            <a href="/#" title={item.name + "的音乐"}>&nbsp;</a>
                        </div>
                        <div className="singer-info">
                            <a className="name" href="/#">{item.name}</a>
                            {
                                item.accountId !== 0 && <a className="icon" href="/#">
                                    <i></i>
                                </a>
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    );
});


SingerCoverList.propTypes = {
    singerList: PropTypes.array.isRequired
}

export default SingerCoverList;