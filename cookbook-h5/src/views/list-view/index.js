/*
 * 文章列表
 * @Author: Miracle
 */

import React, { Component } from 'react';
import './index.scss';

export default class ListView extends Component {
	render(){
		const { data } = this.props;
		return(
			<div className="list-view">
				{
					data.map(item => (
						<div className="list-item" key={item._id}>
							<div className="pic"><img src={item.cover} alt={item.title}/></div>
							<div className="right-cont">
								<div className="title">{item.title}</div>
								<div className="desc">{item.describe}</div>
								<div className="text"><span>{item.lookNum}浏览</span>  <span>{item.likeNum}收藏</span></div>
							</div>
						</div>
					))
				}
			</div>
		)
	}
}
