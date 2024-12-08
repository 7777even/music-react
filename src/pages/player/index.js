import React, { memo } from 'react';

import SongInfo from "./child-components/song-info";
import SongComment from "./child-components/song-comment";
import SimilaritySong from "./child-components/similarity-song";
import MultiDownload from "./child-components/multi-download";
import IncludeSongList from "./child-components/include-song-list";

import { parsingUrl } from "../../utils/parsing-url";

import "./style.less";

export const MyContext = React.createContext();

export default memo(function Player(props) {
  const songID = parsingUrl(props.location.search);

  return (
    <div className="player-wrapper">
      <MyContext.Provider value={songID}>

        <div className="player-content-left">
          <SongInfo />
          <SongComment />
        </div>

        <div className="player-content-right">
          <IncludeSongList />
          <SimilaritySong />
          <MultiDownload />
        </div>

      </MyContext.Provider>
    </div >
  );
});
