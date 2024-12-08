import React, { memo, createContext } from 'react';

import SongMenuList from "./child-components/song-menu-list";
import RankListHeader from "./child-components/rank-list-header";
import SongsList from "./child-components/songs-list";

import { parsingUrl } from "../../../../utils/parsing-url";
import "./style.less";

export const RankListContext = createContext();

export default memo(function RankList(props) {
    const songMenuID = parsingUrl(props.location.search) || 19723756;
    // console.log(songMenuID);

    return (
        <div className="rank-list-wrapper">
            <RankListContext.Provider value={songMenuID}>
                <div className="rank-list-left">
                    <SongMenuList />
                </div>
                <div className="rank-list-right">
                    <RankListHeader />
                    <SongsList />
                </div>
            </RankListContext.Provider>
        </div>
    );
});