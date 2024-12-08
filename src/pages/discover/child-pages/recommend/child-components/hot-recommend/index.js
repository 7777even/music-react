import React, { memo, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { getHotRecommendAction } from "../../store/actionCreators";

import ThemeHeaderRecommend from '@/components/theme-header-recommend';
import SongsCover from "@/components/songs-cover"

import { HOT_RECOMMEND_LIMIT } from "../../../../../../common/constants";

import "./style.less";

export default memo(function HotRecommend() {
	const { hotRecommends } = useSelector(state => ({
		hotRecommends: state.getIn(["recommend", "hotRecommends"])
	}), shallowEqual);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getHotRecommendAction(HOT_RECOMMEND_LIMIT));
	}, [dispatch]);

	const tab = ["华语", "流行", "摇滚", "民谣", "电子"];

	// console.log(hotRecommends);

	return (
		<div className="hot-recommend-wrapper">
			<ThemeHeaderRecommend title="热门推荐" tab={tab} more="/discover/playlist/" />
			<div className="recommend-list">
				{
					hotRecommends && hotRecommends.map(item =>
						(<SongsCover
							key={item.id}
							name={item.name}
							picUrl={item.picUrl}
							playCount={item.playCount}
						/>)
					)
				}
			</div>
		</div>
	);
});


/*
{
		"id": 2004326663,
		"type": 0,
		"name": "电影丨《黑豹/Black Panther》OST合集",
		"copywriter": "编辑推荐：瓦坎达forever",
		"picUrl": "https://p2.music.126.net/RfrU2JsnrFnWLYutXYcW4Q==/18718085953458402.jpg",
		"canDislike": false,
		"trackNumberUpdateTime": 1523282276990,
		"playCount": 1696016,
		"trackCount": 65,
		"highQuality": false,
		"alg": "featured"
}
 */
