/*
 * 菜谱分类
 * @Author: Miracle
 */

import React, { Component } from 'react';
import { Navigator, Button, NavBar } from 'components';
import T from 'utils/utils';

import './index.scss'
const tabs = [
	{ title: '热门', value: 'hot' },
	{ title: '菜式', value: 'material' },
	{ title: '菜系', value: 'cuisine' },
	{ title: '烘培', value: 'bake' },
	{ title: '场合', value: 'occasion' },
	{ title: '节日', value: 'festival' },
	{ title: '食材', value: 'style' }
];

export default class Classify extends Component{
	state = {
		activeTab: 0,
		hot: [],
		material: [],
        cuisine: [],
		bake: [],
		occasion: [],
		festival: [],
		style: [],
		list: []
	};
	SetActiveTab(index){
		const item = tabs[index].value
		this.setState({
			activeTab: index,
			list: this.state[item]
		})

	}
	getClassify = () => {
		T.ajax.get('/classify').then(res => {
			const hot = [],
				material = [],
				cuisine = [],
				bake = [],
				occasion = [],
				festival = [],
				style = [];
			res.data.forEach(item => {
				if (item.hot) {
					hot.push(item)
				}
				if (item.type ==='material') {
					material.push(item)
				}
				if (item.type ==='cuisine') {
					cuisine.push(item)
				}
				if (item.type ==='bake') {
					bake.push(item)
				}
				if (item.type ==='occasion') {
					occasion.push(item)
				}
				if (item.type ==='festival') {
					festival.push(item)
				}
				if (item.type ==='style') {
					style.push(item)
				}
			})
			this.setState({
				list: hot,
				hot,
				material,
				cuisine,
				bake,
				occasion,
				festival,
				style
			})
		})
	};
	handleClickMenu = (keyword) => {
		this.props.history.push(`/search?keyword=${keyword}`)
	}

	componentDidMount(){
		this.getClassify();
	}
	render(){
		return(
			<div className="classify">
				<NavBar>分类</NavBar>
				<div className="cont" style={{ height: 500 }}>
					<div className="tabs vertical">
						<div className="tabs-nav">
							{
								tabs.map((item, index) => {
									const cls = `tabs-nav-item ${this.state.activeTab === index ? 'active': ''}`;
									return <div className={cls} onClick={()=>this.SetActiveTab(index)} key={item.value}>{item.title}</div>
								})
							}
						</div>
						<div className="tabs-cont">
							<div className="tabs-plan">
								{
									this.state.list.map(item => (
										<div className="item" key={item._id} onClick={()=>this.handleClickMenu(item.name)}>{item.name}</div>
									))
								}
							</div>
						</div>
					</div>
				</div>
				<Navigator index={1}/>
			</div>
		)
	}
}
