import React, { memo } from 'react';

import "./style.less";

import { hotAnchorData } from "../../../../../../common/local-data";

export default memo(function HotAnchor() {
  return (
    <div className="hot-anchor-wrapper">
      <h3 className="hot-anchor-nav">热门主播</h3>
      <div className="hot-anchor-list">
        {
          hotAnchorData.map(item => (
            <div className="item" key={item.id}>
              <a className="head" href="#/">
                <img src={item.picUrl} alt={item.anchorName} />
              </a>
              <div className="info">
                <p className="name">
                  <a href="#/">{item.anchorName}</a>
                  <span className="v-icon"></span>
                </p>
                <p className="label">{item.anchorTag}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
});
