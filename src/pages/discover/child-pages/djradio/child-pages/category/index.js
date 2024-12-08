import React, { memo, useContext } from 'react';
import { Redirect } from "react-router-dom";

import GoodNewRadio from "../../child-components/good-new-radio";
import HotRadioRank from "../../child-components/hot-radio-rank";

import { DjRadioContext } from "../../../djradio";

export default memo(function Category() {
    const djRadioID = useContext(DjRadioContext);
    // console.log(djRadioID);

    return !djRadioID ?
        <Redirect to="/discover/djradio" />
        :
        <div className="dj-radio-category-page-wrapper">
            <GoodNewRadio />
            <HotRadioRank />
        </div>
});
