

import React from 'react';
import {Input, Icon} from "components";
import T from 'utils/utils';
import ListView from '../list-view'
import Empty from '../common/empty';
import './search.scss'


export default class Search extends React.Component{
	state = {
		hotSearch : [],
		record: [],
		keyword: '',
		dataArr: [],
		showEmpty: false
	};

	getHotSearch = () =>{
		T.ajax.get('/common/hotSearch').then(res => {
			this.setState({
				hotSearch: res.data
			})
		})
	};

	toSearch = (arg) =>{
		const {keyword, record} = this.state;
		const title = arg || keyword
		T.ajax.get(`/article?title=${title}`).then(res => {
			if(res.data.content.length > 0){
				record.unshift(title);
				this.setState({
					showEmpty: false
				})
			} else {
				this.setState({
					showEmpty: true
				})
			}
			const newRecord = T.distinct(record).slice(0,10); //去重和限制个数
			T.setCookie('record', newRecord); // 搜索成功就把搜索记录存到本地
			this.setState({
				record: newRecord,
				dataArr: res.data.content
			})
		});
	};

	clearCookie = () => {
		T.delCookie('record');
		this.setState({
			record: []
		})
	};

	changeValue = (key,value) => {
		this.setState({
			[key]:value
		})
	};

	handleClickKeyWord = (keyword) => {
		this.toSearch(keyword)
	}

	componentDidMount(){
		this.getHotSearch();
		const record = T.getCookie('record') && T.getCookie('record').split(',') || [];  //获取本地搜索记
		this.setState({
			record
		})
		const keyword = T.getQuery('keyword')
		keyword && this.toSearch(keyword)
	}
	render(){
		const { dataArr, showEmpty, hotSearch, record } = this.state;
		return(
			<div className='searchSec'>
				<div className='search-nav'>
					<div className='back-icon' onClick={()=>history.back()}><Icon type='back'/></div>
					<div className='search-cont'>
						<span className='search-icon'><img src={require('./images/search-icon.png')} alt=""/></span>
						<Input type='search'
							   onChange={(v)=>{this.changeValue('keyword',v)}}
							   placeholder='想吃什么这里搜. 如牛排'
						/>
					</div>
					<button
						className='search-btn'
						onClick = {()=>this.toSearch()}
					>搜索</button>
				</div>
				{
					dataArr.length > 0 ?
						<ListView data={dataArr}/>
					:
						<div className="search-cont">
							{
								showEmpty?
									<Empty/>:null
							}
							<div className="title">热门搜索</div>
							<div className="hot-list">
								{
									hotSearch.map((item, i)=>{
										return <span key={i} className="item" onClick={()=>this.handleClickKeyWord(item)}>{item}</span>
									})
								}
							</div>

							<div className="title" style={{marginTop:'0.1rem'}}>搜索记录
								<span className="clear-record" onClick={this.clearCookie}>清除</span>
							</div>
							<div className="lately-search">
								<ul>
									{
										record.map((item, i)=>{
											return <li key={i} className="item" onClick={()=>this.handleClickKeyWord(item)}>{item}</li>
										})
									}
								</ul>
							</div>
						</div>
				}
			</div>
		)
	}
}
