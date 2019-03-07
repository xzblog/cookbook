/*
 *
 * @Author: Miracle
 */

import React, { Component } from 'react';
import { NavBar, Icon } from "components";
import axios from 'axios';
import T from 'utils/utils';
import './index.scss';

export default class Collect extends Component{
	state = {
		collectList: []
	};
	getCollectList = () => {
		T.ajax.get('/user/collect').then(res => {
			console.log(res.data)
			this.setState({
				collectList: res.data
			})
		})
	};
	handleToDetails = (id) => {
		this.props.history.push(`/article/${id}`)
	};
	handleCancelCollect = () => {
		axios.delete('/user/collect?ids=sdadsa').then(res=> {
			console.log(res)
		})
	};

	handleCancelAllCollect = () => {

	};

	componentDidMount(){
		this.getCollectList();
	}
	render(){
		return(
			<div className="collect">
				<NavBar fixed rightContent={<span onClick={this.handleCancelAllCollect} className="cancel-collect-all">全部清除</span>}>我的收藏</NavBar>
				<div className="collect-list">
					{
						this.state.collectList.map(item => (
							<div className="collect-list-item" onClick={()=>this.handleToDetails(item._id)}>
								<div className="pic"><img src={item.cover} alt={item.title}/></div>
								<div className="title">
									{item.title}
									<span onClick={this.handleCancelCollect} className="cancel-collect-btn"><Icon type='like_fill' /></span>
								</div>
							</div>
						))
					}
				</div>
			</div>
		)
	}
}
