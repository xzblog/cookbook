/*
 * 菜谱分类
 * @Author: Miracle
 */

import React, { Component } from 'react';
import { NavBar, BackTop, Toast, Icon } from "components";
import T from 'utils/utils';
import axios from 'axios';
import './index.scss'

export default class Article extends Component{
	state = {
		article: {

		},
		collectNum: 0,
		recommendArticle: []
	};
	getRecommendArticle = (type) => {
		console.log(type)
		T.ajax.get(`/article?type=${type}`).then(res => {
			this.setState({
				recommendArticle: res.data.content
			})
		})
	};
	getArticle = () => {
		const id = this.props.match.params.id;
		T.ajax.get(`/article/${id}`).then(res => {
			this.getRecommendArticle(res.data.type)
			this.setState({
				article: res.data,
				collectNum: res.data.likeNum
			})
		})
	};
	handleCollect = () => {
		const id = this.props.match.params.id;
		axios.put(`/api/v1.0.0/article/${id}`).then(res => {
			if (res.data.code === 0) {
				Toast.success('收藏成功')
				this.setState({
					collectNum: res.data.data.likeNum
				})
			} else{
				Toast.fail(res.data.msg)
			}
		})
	};

	componentDidMount(){
		this.getArticle()
	}
	render(){
		const { article, collectNum, recommendArticle } = this.state;
		function createMarkup(){
			return {__html: article.content};
		};
		return(
			<div className="article">
				<NavBar fixed>详情 </NavBar>
				<div className="cover">
					<img src={article.cover} alt=""/>
				</div>
				<div className="top">
					<div className="title">{article.title}</div>
					<div className="text">{article.lookNum}浏览/{collectNum}收藏</div>
					<div className="collect-btn" onClick={this.handleCollect}>收藏</div>
				</div>
				<div className="cont">
					<div className="describe">{article.describe}</div>
					<div className="materials">
						<h4>用料</h4>
						<ul>
							<li>蘑菇  <span>20克</span></li>
							<li>蘑菇  <span>20克</span></li>
							<li>蘑菇  <span>20克</span></li>
							<li>蘑菇  <span>20克</span></li>
						</ul>
					</div>
					<div className="content">
						<h4>做法</h4>
						<div dangerouslySetInnerHTML={createMarkup()} />
					</div>
					<div className="tips">
						<h4>小贴士</h4>
						<p>一次性加入适量的水， 中途不要再加水</p>
					</div>
				</div>

				<div className="share">
					<div className="share-title">
						<div className="share-text">分享</div>
					</div>
					<div className="main">
						<div className="item">
							<Icon type="wechat" size={0.45}/>
							<span>微信</span>
						</div>
						<div className="item">
							<Icon type="friendsCircle" size={0.45}/>
							<span>朋友圈</span>
						</div>
						<div className="item">
							<Icon type="qq" size={0.5}/>
							<span>QQ</span>
						</div>
					</div>
				</div>

				<div className="recommend-article">
					<div className="recommend-title">热门推荐</div>
					<ul>
						{
							recommendArticle.map(item => (
								<li key={item._id}>
									<img src={item.cover} alt={item.title}/>
									<h4>{item.title}</h4>
									<div className="desc">{item.describe}</div>
								</li>
							))
						}
					</ul>
				</div>
				<BackTop/>
			</div>
		)
	}
}
