import React, { memo } from 'react';

import HeaderCategory from "./child-components/header-category";
import ContentWrapper from "./child-components/content-wrapper";

import "./style.less";

export default memo(function PlayList() {
    return (
        <div className="play-list-wrapper">
            <div className="play-list-content">
                <HeaderCategory />
                <ContentWrapper />
            </div>
        </div>
    );
});
