import React, { memo, useContext, Fragment } from 'react';

import SongMenuItem from "../../../../../../components/song-menu-item";

import { musicFeatureListDate, globalMediaListData } from "../../../../../../common/local-data";

import { RankListContext } from "../../../ranklist";
import "./style.less";

export default memo(function SongMenuList() {
    const songMenuID = useContext(RankListContext) * 1;

    return (
        <Fragment>
            <h2 className="song-menu-list-headline">云音乐特色榜</h2>
            <div className="song-menu-list">
                {
                    musicFeatureListDate.map(item => (
                        <SongMenuItem key={item.id}
                            songMenuID={item.id}
                            songMenuImage={item.picUrl}
                            songMenuName={item.songMenuName}
                            updateTime={item.updateTime}
                            active={item.id === songMenuID}
                        />
                    ))
                }
            </div>
            <h2 className="song-menu-list-headline">全球媒体榜</h2>
            <div className="song-menu-list">
                {
                    globalMediaListData.map(item => (
                        <SongMenuItem key={item.id}
                            songMenuID={item.id}
                            songMenuImage={item.picUrl}
                            songMenuName={item.songMenuName}
                            updateTime={item.updateTime}
                            active={item.id === songMenuID}
                        />
                    ))
                }
            </div>
        </Fragment>
    );
});
