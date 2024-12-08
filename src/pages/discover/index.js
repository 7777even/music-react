import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import "./style.less";


export default memo(function Discover(props) {
	// 获取子路由的数组
	const childrenRouter = props.route.children;

	return (
		<div className="discover-wrapper">
			<div className="discover">

				<div className="top-wrapper">
					<div className="top-bar">
						<div className="item">
							<NavLink to="/discover/recommend">推荐</NavLink>
						</div>
						<div className="item">
							<NavLink to="/discover/ranklist">排行榜</NavLink>
						</div>
						<div className="item">
							<NavLink to="/discover/playlist">歌单<sup></sup></NavLink>
						</div>
						<div className="item">
							<NavLink to="/discover/djradio">主播电台</NavLink>
						</div>
						<div className="item">
							<NavLink to="/discover/artist">歌手</NavLink>
						</div>
						<div className="item">
							<NavLink to="/discover/album">新碟上架</NavLink>
						</div>
					</div>
				</div>

			</div>

			{
				renderRoutes(childrenRouter)
			}

		</div>
	);
});
