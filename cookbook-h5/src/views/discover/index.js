/*
 * 菜谱分类
 * @Author: Miracle
 */

import React, { Component } from 'react';
import { Navigator } from "components";

export default class Discover extends Component{
	render(){
		return(
			<div>
				发现
				<Navigator index={2}/>
			</div>
		)
	}
}
