import React, { memo, useEffect, useRef, useCallback, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getTopBannerAction } from "../../store/actionCreators";
import Carousel from 'antd/es/carousel';
import "antd/es/carousel/style/css";

import "./style.less";

export default memo(function TopBanner() {
    // banner背景图片 和 banner 保持一致
    const [currentIndex, setCurrentIndex] = useState(0);

    // 组件和redux关联：获取数据和进行操作
    const { topBanners } = useSelector(state => ({
        // topBanners: state.get("recommend").get("topBanners")
        topBanners: state.getIn(["recommend", "topBanners"])
    }), shallowEqual);
    const dispatch = useDispatch();
    const bannerRef = useRef();

    // 发送网络请求
    useEffect(() => {
        dispatch(getTopBannerAction());
    }, [dispatch]);

    // console.log(topBanners);

    const bannerBeforeChange = useCallback((from, to) => {
        setCurrentIndex(() => to);
        // setCurrentIndex(to);
    }, []);

    // console.log("---" + currentIndex);
    // 对应背景高斯模糊图片
    const bgImage = topBanners && topBanners[currentIndex] && (topBanners[currentIndex].imageUrl + "?imageView&blur=40x20");
    // console.log(bgImage);
    // console.log(bannerRef);

    return (
        <div className="banner-wrapper" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="banner">
                <div className="banner-left">
                    <Carousel effect="fade" autoplay beforeChange={bannerBeforeChange} ref={bannerRef}>
                        {
                            topBanners && topBanners.map(item =>
                                <div className="banner-item" key={item.targetId}>
                                    <img className="image" src={item.imageUrl} alt={item.typeTitle} />
                                </div>
                            )
                        }
                    </Carousel>
                </div>
                <div className="banner-right">
                    <a href="#/" className="right-download">下载客户端</a>
                    <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
                    <span className="shadow-left"></span>
                    <span className="shadow-right"></span>
                </div>
                <button className="control control-left" onClick={() => bannerRef.current.prev()}></button>
                <button className="control control-right" onClick={() => bannerRef.current.next()}></button>
            </div>
        </div>
    );
});
