/*
 * 常用顶部导航
 * @Author: Magical
 */

import React, {Component} from 'react';
import {Icon} from '../index'
import classNames from 'classnames';
import './navBar.scss';

export default class NavBar extends Component{

    static defaultProps = {
        prefixCls: 'yg-navbar',     //默认的样式前缀
        fixed: false,               //默认浮在顶部
        transparent: false,         //是否支持滚动变色
        bgColor: '255,255,255',     //默认背景色RGB
        opacity: 0,                 //初始的透明度（设置滚动渐变才有效）
        icon: 'back',               //默认的最左边图标
        height: 180                 //默认的渐变滚动的高度。
    };

    constructor(props){
        super(props);
        this.state ={
            opacity: this.props.transparent ? this.props.opacity : 1
        }
    }

    /**
     * 导航栏下拉渐变
     * (this.props.height)指的是渐变执行的高度，默认300。
     */
    handleScroll =()=> {
        const opacity = window.scrollY / this.props.height;
        if(opacity < this.props.opacity){
            this.setState({opacity: this.props.opacity});
        }else if(opacity >= 1) {
            this.setState({opacity: 1});
        }else{
            this.setState({opacity: opacity});
        }
    };

    /**
     * 返回按钮点击
     * 当不传方法过来时默认返回上一层
     */
    onLeftClick = () => {
        this.props.onLeftClick ? this.props.onLeftClick() : history.back();
    };

    componentDidMount() {
        //transparent执行
        this.props.transparent && this.handleScroll();
        this.props.transparent && window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount(){
        //组件卸载时移除事件
        window.removeEventListener('scroll', this.handleScroll);
    }


    render(){
        const {fixed, prefixCls, icon, className, leftContent, children, rightContent, bgColor} = this.props;

        let wrapCls = classNames({
            [`${prefixCls}`]: true,
            [className]:className,
            'yg-fixed-top': fixed
        });

        return(
            <div className={wrapCls} style={{backgroundColor:`rgba(${bgColor},${this.state.opacity})`}}>
                <div className={`${prefixCls}-left`} role="button" onClick={this.onLeftClick}>
                    <span className={`${prefixCls}-left-icon`} aria-hidden="true">
                        <Icon type= {icon} />
                    </span>
                    {leftContent}
                </div>
                <div className={`${prefixCls}-title`}>{children}</div>
                <div className={`${prefixCls}-right`}>{rightContent}</div>
            </div>
        );
    }
}
