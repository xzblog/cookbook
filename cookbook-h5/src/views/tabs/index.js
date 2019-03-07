/*
 *
 * @Author: Miracle
 */

import React, { Component } from 'react';
import { Tabs } from 'antd-mobile';
import { NavBar } from "components";
import Empty from '../common/empty';
import T from 'utils/utils';
import './index.scss';

const tabs = [
	{ title: '早餐' },
	{ title: '中餐' },
	{ title: '晚餐' },
];

export default class TabsPage extends Component{
	state = {
		breakfast: [],
		lunch: [],
		dinner: []
	};
	getData(type, index){
		T.ajax.get(`/article?type=${type}`).then(res=> {
			if (index === 0) {
				this.setState({
					breakfast: res.data.content
				})
			} else if (index === 1) {
				this.setState({
					lunch: res.data.content
				})
			} else {
				this.setState({
					dinner: res.data.content
				})
			}

		})
	}
	componentDidMount(){
		const index = parseInt(T.getQuery('id'));
		const type = tabs[index].title
		this.getData(type, index);
	}
	render(){
		const { breakfast, lunch, dinner } = this.state;
		const index = parseInt(T.getQuery('id'));
		return(
			<div className="tabs-page">
				<NavBar fixed/>
				<Tabs
					tabs={tabs}
					initialPage={index}
					tabBarActiveTextColor='#fe652f'
					tabBarUnderlineStyle={{border: "1px solid #fe652f"}}
					onChange={(tab, index) => { this.getData(tab.title, index) }}
				>
					<div className="plan">
						{
							breakfast.length > 0 ?
								<div className="list">
									{
										breakfast.map(item=>(
											<Item data={item} key={item._id} />
										))
									}
								</div>
								:
								<Empty/>
						}
					</div>
					<div className="plan">
						{
							lunch.length > 0 ?
								<div className="list">
									{
										lunch.map(item=>(
											<Item data={item} key={item._id} />
										))
									}
								</div>
								:
								<Empty/>
						}
					</div>
					<div className="plan">
						{
							dinner.length > 0 ?
								<div className="list">
									{
										dinner.map(item=>(
											<Item data={item} key={item._id} />
										))
									}
								</div>
								:
								<Empty/>
						}
					</div>
				</Tabs>
			</div>
		)
	}
}

const Item = (props)=>{
	const data = props.data
	return(
		<div className="item">
			<div className="pic"><img src={data.cover} alt=""/></div>
			<div className="text">
				<div className="title">{data.title}</div>
				<div className="desc">{data.describe}</div>
			</div>
		</div>
	)
}
