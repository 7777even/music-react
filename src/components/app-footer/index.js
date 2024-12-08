import React, { memo } from 'react';

import "./style.less";

export default memo(function AppFooter() {
	return (
		<div className="footer-wrapper">
			<div className="footer">
				<div className="footer-content">

					<div className="footer-left">

						<p className="link">
							<a href="#/" target="_blank" className="item">服务条款</a>
							<span className="line">|</span>
							<a href="#/" target="_blank" className="item">隐私政策</a>
							<span className="line">|</span>
							<a href="#/" target="_blank" className="item">儿童隐私政策</a>
							<span className="line">|</span>
							<a href="#/" target="_blank" className="item">版权投诉指引</a>
							<span className="line">|</span>
							<a href="#/" target="_blank" className="item">意见反馈</a>
							<span className="line">|</span>
						</p>

						<p className="text">
							<span>网易公司版权所有©1997-2020</span>
							<span>杭州乐读科技有限公司运营：</span>
							<a href="#/">浙网文[2018]3506-263号</a>
						</p>

						<p className="text">
							<span>违法和不良信息举报电话：0571-89853516</span>
							<span> 举报邮箱：</span>
							<a href="#/">ncm5990@163.com</a>
						</p>

						<p className="text">
							<span>粤B2-20090191-18</span>
							<a href="#/">工业和信息化部备案管理系统网站</a>
							<i className="police-logo"></i>
							<a href="#/"> 浙公网安备 33010902002564号</a>
						</p>

					</div>

					<div className="footer-right">
						<div className="unit">
							<a href="#/">&nbsp;</a>
							<span></span>
						</div>
						<div className="unit">
							<a href="#/">&nbsp;</a>
							<span></span>
						</div>
						<div className="unit">
							<a href="#/">&nbsp;</a>
							<span></span>
						</div>
						<div className="unit">
							<a href="#/">&nbsp;</a>
							<span></span>
						</div>
						<div className="unit">
							<a href="#/">&nbsp;</a>
							<span></span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});