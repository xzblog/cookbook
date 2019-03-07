/*
 * Icon组件
 * @Author： Magical
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import './iconfont';
const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('static/icons', false, /\.svg$/);
requireAll(req);

import './icon.scss';

export default class Icon extends Component{
    // 检测类型
    static propTypes = {
        type: PropTypes.string.isRequired,
        className:PropTypes.string,
        size:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
    };

    static defaultProps ={
        size: 0.24,
		className:''
    };

    render(){
        const {size, type, className}  =this.props;
        return(
            <svg className={`yg-icon ${className}`} style={{width:`${size}rem`,height:`${size}rem`}} aria-hidden="true">
                <use xlinkHref={`#yg-${type}`}> </use>
            </svg>
        )
    }
}
