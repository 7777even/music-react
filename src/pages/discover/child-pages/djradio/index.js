import React, { memo, createContext } from 'react';
import { renderRoutes } from "react-router-config";
import DJRadioCategory from "./child-components/dj-radio-category";

import { parsingUrl } from "../../../../utils/parsing-url";

import "./style.less";

export const DjRadioContext = createContext();

export default memo(function DjRadio(props) {
    const params = parsingUrl(props.location.search);
    const djRadioID = params === "" ? undefined : parseInt(params);
    // console.log(djRadioID);
    // console.log(props.route.children);

    return (
        <div className="dj-radio-wrapper">
            <DjRadioContext.Provider value={djRadioID}>
                <div className="dj-radio-content">
                    <DJRadioCategory />
                    {
                        renderRoutes(props.route.children)
                    }
                </div>
            </DjRadioContext.Provider>
        </div>
    );
});
