import React, { memo, Fragment, useContext, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Link } from "react-router-dom";

import { getSimilaritySongAction } from "../../store/actionCreators";
import { MyContext } from "../../../player";
import "./style.less";

import computedSingerNames from "../../../../utils/songer-utils";

export default memo(function SimilaritySong() {
	const songID = useContext(MyContext);

	// redux-hooks
	const { similaritySong } = useSelector(state => ({
		similaritySong: state.getIn(["player", "similaritySong"])
	}), shallowEqual);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getSimilaritySongAction(songID));
	}, [dispatch, songID]);

	// console.log(similaritySong);

	// similaritySong && similaritySong.artists.map((item, index) => console.log(item));


	return (
		<Fragment>
			<h3 className="similarity-song-head">
				<span>相似歌曲</span>
			</h3>
			<div className="similarity-song-content">
				{
					similaritySong.map(item => (
						<div key={item.id} className="item">
							<div className="item-left">
								{/* <a href="#/" className="top" title={item.name}>{item.name}</a> */}
								<Link to={`/discover/player?id=${item.id}`} className="top" title={item.name}>{item.name}</Link>
								<span className="bottom" title={similaritySong.artists && computedSingerNames(similaritySong.artists)}>
									{
										item.artists && item.artists.map((value, index) => (
											<Fragment key={value.id}>
												<a href="#/" title={value.name}>{value.name}</a>
												{index !== item.artists.length - 1 && "/"}
											</Fragment>
										))
									}
								</span>
							</div>
							<div className="item-right">
								<button className="play"></button>
								<button className="add"></button>
							</div>
						</div>
					))
				}
			</div>
		</Fragment >
	);
});
