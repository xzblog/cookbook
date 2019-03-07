/*
 * 食谱大全
 * @Author: Magical
 */

import React, {Component} from 'react';
import {Carousel, DocumentTitle, Icon, Navigator} from 'components';
import { Link } from 'react-router-dom';
import T from 'utils/utils';
import './index.scss'

import pic1 from 'static/imgs/cookbook/swiper-pic1.jpg'
import pic2 from 'static/imgs/cookbook/swiper-pic2.png'
import pic3 from 'static/imgs/cookbook/swiper-pic3.png'

const IMAGE_DATA = [
    {
        pic: pic1,
        alt: '早餐',
    },
    {
		pic: pic2,
        alt: '中餐',
    },
    {
		pic: pic3,
        alt: '晚餐',
    },
];

export default class Index extends Component{
	state = {
		hotClassify: [],
		recommendArticle: []
	};

	getRecommendClassify = () => {
		T.ajax.get('/classify?recommend=true&limit=8').then(res => {
			this.setState({
				hotClassify: res.data
			})
		})
	};
	getRecommendArticle = () => {
		T.ajax.get('/article').then(res => {
			this.setState({
				recommendArticle: res.data.content
			})
		})
	};
	LinkToDetails = (id) => {
		this.props.history.push(`/article/${id}`)
	};
	handleClickMenu = (keyword) => {
		this.props.history.push(`/search?keyword=${keyword}`)
	};
	componentDidMount(){
		this.getRecommendClassify();
		this.getRecommendArticle();
	}
    render(){
		const { hotClassify, recommendArticle } = this.state
        return(
            <DocumentTitle title='菜谱大全'>
                <div className='cookbook'>
                    <div className='cookbook-top'>
                        <div className='search' onClick={()=>{this.props.history.push('/search')}}>
                            <Icon className='search-icon' type='search' size='0.18'/>
                            <span style={{marginLeft:'0.05rem'}}>搜索菜谱，食材</span>
                        </div>
                        <div className='hot-menu'>
                            <div className='item'><img src={require('../../static/imgs/cookbook/hot-pic2.jpg')} alt='本周热门菜谱' /> </div>
                            <div className='item'><img src={require('../../static/imgs/cookbook/hot-pic1.jpg')} alt='热门菜谱排行' /> </div>
                        </div>
                    </div>
					<Carousel className='swiper-menu'>
						{
							IMAGE_DATA.map((item, index) => {
								return <Link to={`/tabsPage/?id=${index}`} key={item.pic}><img src={item.pic} alt={item.alt} width='100%' /></Link>
							})
						}
					</Carousel>
                    <div className='menu'>
						{ hotClassify.map(item => {
							return <div className='item' key={item._id} onClick={()=>this.handleClickMenu(item.name)}>{ item.name }</div>
						})}
                    </div>

                    <div className='perch'> </div>

                    <div className='popular'>
                        <h3>精选</h3>
                        <ul className='popular-list'>
							{
								recommendArticle.map(item => (
									<li className='popular-item' key={item._id} onClick={() => this.LinkToDetails(item._id)}><img src={item.cover} alt={item.name} /> </li>
								))
							}
                        </ul>
                    </div>

					<div className="end"> — END — </div>

                    <Navigator index={0} />
                </div>
            </DocumentTitle>
        )
    }
}
