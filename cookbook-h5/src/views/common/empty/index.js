/*
 * 数据为空
 * @Author: Miracle
 */

import React from "react";
import { Icon } from 'components';
import './index.scss';

const Empty = ()=> {
	return(
		<div className="empty">
			<Icon type="empty" size={0.8} className="empty-icon"/>
			暂无相关内容
		</div>
	)
}
export default Empty
