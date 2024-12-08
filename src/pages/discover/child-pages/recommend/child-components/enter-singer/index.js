import React, { memo } from 'react';

import "./style.less";

import { enterSingerData } from "../../../../../../common/local-data";

export default memo(function EnterSinger() {

  return (
    <div className="enter-singer-wrapper">
      <div className="singer-nav">
        <h3>入驻歌手</h3>
        <a href="#/">查看全部 &gt;</a>
      </div>

      <div className="singer-list">
        {
          enterSingerData.map(item => (
            <div className="item" key={item.id}>
              <a href="#/" className="item-content">
                <div className="head">
                  <img src={item.picUrl} alt={item.singerName} />
                </div>
                <div className="info">
                  <h4>{item.singerName}</h4>
                  <p className="singer-info">{item.singerTag}</p>
                </div>
              </a>
            </div>
          ))
        }
      </div>

      <a href="#/" className="become-singer-btn"><span>申请成为网易音乐人</span></a>
    </div>
  );
});
