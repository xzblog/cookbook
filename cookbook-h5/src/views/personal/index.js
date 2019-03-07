/*
 * 个人中心
 * @Author: Miracle
 */

import React, {Component} from 'react'
import {DocumentTitle, Navigator, Button, Toast } from 'components';
import { Link } from 'react-router-dom';
import {Modal, WhiteSpace  } from 'antd-mobile';
import T from '../../utils/utils';
import './index.scss';


export default class Index extends Component{
	state = {
		userInfo: {}
	}
	getUserInfo() {
		T.ajax.get('/user/info').then(res => {
			this.setState({
				userInfo: res.data
			})
		})
	}

	logout = () =>{
		Modal.alert('确定要退出吗？','', [
			{ text: '取消'},
			{ text: '确定', onPress: () => {

					// 删除本地cookie
					T.delCookie('code');
					T.delCookie('userId');

					// 清除本地的state,并跳转到指定页面
					this.props.history.push('/login');
				} },
		]);
	};

	componentDidMount(){
		this.getUserInfo();
	}

	render(){
		const { userInfo } = this.state;
		return(
			<DocumentTitle title='个人中心'>
				<div className='person'>
						<div className='person-top'>
							<div className='top-left'>
								<h2>{userInfo.nickname ? userInfo.nickname : userInfo.mobile}</h2>
								<p className='desc'>{userInfo.saying ? userInfo.saying : '随便说点什么，介绍下自己！'}</p>
								<Link className='redact' to='/resume'>编辑</Link>
							</div>
							<div className='avatar'>
								<span> <img src={userInfo.avatar ? userInfo.avatar : require(`./images/avatar.jpg`)} alt="" />   </span>
							</div>
						</div>
						<div className='order-management'>
							<div className='item'>
								<i><img src={require('./images/order-dfk.png')} alt=""/></i>
								<p>待付款</p>
							</div>
							<div className='item'>
								<i><img src={require('./images/order-dsh.png')} alt=""/></i>
								<p>待收货</p>
							</div>
							<div className='item'>
								<i><img src={require('./images/order-dpj.png')} alt=""/></i>
								<p>待评价</p>
							</div>
							<div className='item'>
								<i><img src={require('./images/order-sh.png')} alt=""/></i>
								<p>售后</p>
							</div>
							<div className='item'>
								<i><img src={require('./images/order-all.png')} alt=""/></i>
								<p>全部订单</p>
							</div>
						</div>



						<div className='person-list'>
							<div className='item'>
								<i className='icon'> </i>
								<span className='title'>我的足迹</span>
								<span className='result'>我爱逛的</span>
								<i className='arrow'> </i>
							</div>
							<WhiteSpace />
							<Link to='/collect' className='item'>
								<i className='icon'> </i>
								<span className='title'>我的收藏</span>
								<i className='arrow'> </i>
							</Link>
							<div className='item'>
								<i className='icon'> </i>
								<span className='title'>设置</span>
								<i className='arrow'> </i>
							</div>
							{/*<div className='item'>*/}
								{/*<i className='icon'> </i>*/}
								{/*<span className='title'>地址管理</span>*/}
								{/*<i className='arrow'> </i>*/}
							{/*</div>*/}
							<div className='item'>
								<i className='icon'> </i>
								<span className='title'>反馈</span>
								<i className='arrow'> </i>
							</div>
						</div>




						<div className='btn-cont'>
							<Button onClick={this.logout}>退出登录</Button>
						</div>

					<Navigator index={3}/>
				</div>
			</DocumentTitle>
		)
	}
}

