import React, { memo, useEffect, Fragment } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { getRankListAction } from "../../store/actionCreators";

import ThemeHeaderRecommend from '@/components/theme-header-recommend';
import RankListRecommend from "../../../../../../components/rank-list-recommend";

import "./style.less";


export default memo(function RecommendRankList() {
	// redux hooks
	const { surgeRankList, newRankList, originalRankList } = useSelector(state => ({
		surgeRankList: state.getIn(["recommend", "surgeRankList"]),
		newRankList: state.getIn(["recommend", "newRankList"]),
		originalRankList: state.getIn(["recommend", "originalRankList"])
	}), shallowEqual);
	const dispatch = useDispatch();
	// other hooks
	useEffect(() => {
		dispatch(getRankListAction(19723756));		// 云音乐飙升榜
		dispatch(getRankListAction(3779629));		// 云音乐新歌榜
		dispatch(getRankListAction(2884035));		// 网易原创歌曲榜
	}, [dispatch]);

	// console.log(surgeRankList, newRankList, originalRankList);

	return (
		<div className="recommend-rank-list-wrapper">
			<ThemeHeaderRecommend title="榜单" more="/discover/ranklist/" />
			<div className="recommend-rank-list">

				{
					surgeRankList && surgeRankList.id && newRankList && newRankList.id && originalRankList && originalRankList.id &&
					(<Fragment>
						<RankListRecommend
							coverImgUrl={surgeRankList.coverImgUrl}
							name={surgeRankList.name}
							tracks={surgeRankList.tracks.slice(0, 10)}
						/>

						<RankListRecommend
							coverImgUrl={newRankList.coverImgUrl}
							name={newRankList.name}
							tracks={newRankList.tracks.slice(0, 10)}
						/>

						<RankListRecommend
							coverImgUrl={originalRankList.coverImgUrl}
							name={originalRankList.name}
							tracks={originalRankList.tracks.slice(0, 10)}
						/>
					</Fragment>)
				}

			</div>
		</div>
	);
});





// 飙升榜  19723756
// 新歌帮 3779629
// 网易原创棒  2884035
