import React, { memo } from 'react';

import TopBanner from './child-components/top-banner';
import HotRecommend from './child-components/hot-recommend';
import RecommendRankList from "./child-components/recommend-ranklist";
import UserLogin from "./child-components/user-login";
import EnterSinger from "./child-components/enter-singer";
import HotAnchor from "./child-components/hot-anchor";


import "./style.less";
import NewAlbum from './child-components/new-album';


function Recommend() {
	return (
		<div className="recommend-wrapper">
			<TopBanner />
			<div className="recommend-content">

				<div className="recommend-left">
					<HotRecommend />
					<NewAlbum />
					<RecommendRankList />
				</div>

				<div className="recommend-right">
					<UserLogin />
					<EnterSinger />
					<HotAnchor />
				</div>
			</div>
		</div>
	);
};

export default memo(Recommend);


// function Recommend(props) {
//     const { getBanners, topBanners } = props;

//     useEffect(() => {
//         getBanners();
//     }, [getBanners]);

//     console.log(topBanners);

//     return (
//         <div>
//             <h2>{topBanners.length}</h2>
//         </div>
//     );
// };
// const mapStateToProps = state => ({
//     topBanners: state.recommend.topBanners
// });

// const mapDispatchToProps = dispatch => ({
//     getBanners: () => {
//         dispatch(getTopBannerAction());
//     }
// })


// export default connect(mapStateToProps, mapDispatchToProps)(memo(Recommend));
