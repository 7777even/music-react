import React, { memo } from 'react';
import { renderRoutes } from "react-router-config";
import querystring from "querystring";

import SingerCategoryList from "./child-components/singer-category-list";


import "./style.less";

export const ArtistContext = React.createContext();

export default memo(function Artist(props) {
    const params = querystring.parse(props.location.search);
    const type = parseInt(params["?type"]);
    const area = parseInt(params["area"]);

    // console.log(props.route.children);

    return (
        <div className="artist-wrapper">
            <ArtistContext.Provider value={{ type, area }}>
                <div className="artist-content-left">
                    <SingerCategoryList />
                </div>
                <div className="artist-content-right">
                    {
                        renderRoutes(props.route.children)
                    }
                </div>
            </ArtistContext.Provider>
        </div>
    );
});
