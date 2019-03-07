/*
 * 返回顶部
 * @Author: Miracle
 */
import React, { Component } from 'react';
import Icon from '../icon/icon'
import './index.scss';

export default class BackTop extends Component{
	state = {
		show: false,
	};
	handleBackTop = () => {
		let timer = null;
		cancelAnimationFrame(timer);
		timer = requestAnimationFrame(function fn(){
			const oTop = document.body.scrollTop || document.documentElement.scrollTop;
			if(oTop > 0){
				document.body.scrollTop = document.documentElement.scrollTop = oTop - 50;
				timer = requestAnimationFrame(fn);
			}else{
				cancelAnimationFrame(timer);
			}
		});
	};
	handleScroll = () => {
		const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		if(scrollTop > 100) {
			this.setState({
				show: true
			})
		} else {
			this.setState({
				show: false
			})
		}
	};

	componentWillMount() {
		window.addEventListener('scroll', this.handleScroll, true)
	}

	componentWillUnmount(){
		window.removeEventListener('scroll', this.handleScroll, true)
	}

	render(){
		const { show } = this.state;
		const element = show ?
			<div className="yg-back-top" onClick={this.handleBackTop}>
				<Icon type="backTop" size={0.4} />
			</div>
			:
			null
		return element

	}

}
