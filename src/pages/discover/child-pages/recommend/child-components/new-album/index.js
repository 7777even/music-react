import React, { memo, useEffect, useRef, Fragment } from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import Item from "./item";
import ThemeHeaderRecommend from '@/components/theme-header-recommend';
import Carousel from 'antd/es/carousel';
import "antd/es/carousel/style/css";

import { getNewAlbumAction } from "../../store/actionCreators";

import { NEW_ALBUM_LIMIT } from "@/common/constants";
import "./style.less";

export default memo(function NewAlbum() {

	const carouselRef = useRef();

	// redux hooks
	const { newAlbums } = useSelector(state => ({
		newAlbums: state.getIn(["recommend", "newAlbums"])
	}), shallowEqual);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getNewAlbumAction(NEW_ALBUM_LIMIT));
	}, [dispatch]);

	// console.log(newAlbums);

	return (
		<div className="new-album-wrapper">
			<ThemeHeaderRecommend title="新碟上架" more="/discover/album/" />
			<div className="new-album">
				<div className="content-wrapper">
					<button className="btn btn-left" onClick={() => carouselRef.current.prev()}></button>
					<div className="content">
						<Carousel dots={false} ref={carouselRef} >
							<Fragment>
								<div className="page">
									{
										newAlbums && newAlbums.length > 0 && newAlbums.slice(0, 5).map(item => (
											<Item key={item.id}
												picUrl={item.picUrl}
												name={item.name}
												artistName={item.artist.name}
											/>
										))
									}
								</div>
							</Fragment>

							<Fragment>
								<div className="page">
									{
										newAlbums && newAlbums.length > 0 && newAlbums.slice(5, 10).map(item => (
											<Item key={item.id}
												picUrl={item.picUrl}
												name={item.name}
												artistName={item.artist.name}
											/>
										))
									}
								</div>
							</Fragment>
						</Carousel>
					</div>
					<button className="btn btn-right" onClick={() => carouselRef.current.next()}></button>
				</div>
			</div>
		</div>
	);
});