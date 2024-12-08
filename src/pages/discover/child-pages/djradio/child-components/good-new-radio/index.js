import React, { memo, useEffect, useContext } from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { DjRadioContext } from "../../../djradio";
import { getGoodNewRadioAction } from "../../store/actionCreators";
import "./style.less";

export default memo(function GoodNewRadio() {
    // redux hooks
    const { goodNewRadio } = useSelector(state => ({
        goodNewRadio: state.getIn(["djRadio", "goodNewRadio"])
    }), shallowEqual);
    const dispatch = useDispatch();

    // other hooks
    const djRadio = useContext(DjRadioContext);

    useEffect(() => {
        dispatch(getGoodNewRadioAction(djRadio));
    }, [dispatch, djRadio]);

    // console.log(goodNewRadio);

    return (
        <div className="good-new-radio-wrapper">
            <h3 className="good-new-radio-title">优秀新电台</h3>
            <div className="good-new-radio-content">
                {
                    goodNewRadio && goodNewRadio.slice(0, 5).map(item =>
                        <div key={item.id} className="good-new-radio-item">
                            <a className="cover" href="#/">
                                <img src={item.picUrl + "?param=200y200"} alt={item.name} />
                            </a>
                            <h3 className="radio-name">
                                <a href="#/" title={item.name}>{item.name}</a>
                            </h3>
                            <p>{item.rcmdtext}</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
});
