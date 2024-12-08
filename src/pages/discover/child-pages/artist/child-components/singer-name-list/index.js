import React, { memo } from 'react';
import PropTypes from "prop-types";

import "./style.less";

const SingerNameList = memo(function SingerNameList(props) {
    const { singerList } = props;
    // console.log(singerList);
    
    return (
        <div className="singer-name-list-wrapper">
            {
                singerList && singerList.map(item => (
                    <div key={item.id} className="singer-name-item">
                        <a href="/#" className="name">{item.name}</a>
                        <a href="/#" className="icon"><i></i></a>
                    </div>
                ))
            }
        </div>
    );
});

SingerNameList.propTypes = {
    singerList: PropTypes.array.isRequired
}

export default SingerNameList;