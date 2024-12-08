import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import DJRadioRecommend from "../../child-components/dj-radio-recommend";
import RecommendRankProgram from "../../child-components/recommend-rank-program";

import { getAllDjRadioDataAction } from "../../store/actionCreators";
import { defaultDjRadio } from "../../../../../../common/local-data";

import "./style.less";

export default memo(function Default() {
    // redux hooks
    const { allDjRadioDate } = useSelector(state => ({
        allDjRadioDate: state.getIn(["djRadio", "allDjRadioDate"])
    }), shallowEqual);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllDjRadioDataAction(defaultDjRadio));
    }, [dispatch]);

    // console.log(programRankList[0]);
    // console.log(programRankList);
    // console.log(recommendProgramList);
    // console.log(allDjRadioDate);

    return (
        <div className="di-radio-default-wrapper">
            <RecommendRankProgram />
            {
                allDjRadioDate && allDjRadioDate.map(item =>
                    <DJRadioRecommend
                        key={item.id}
                        djRadios={item.djRadios}
                        categoryName={item.categoryName}
                    />
                )
            }
        </div>
    );
});
