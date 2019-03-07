/*
 * 常用底部菜单组件
 * @Author: Magical
 */

import React, {Component} from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Icon from '../icon/icon';
import './navigator.scss';

export default class Navigator extends Component{
    // 用于检测传入的值得类型
    static propTypes = {
        index: PropTypes.number
    };
    //默认选中第一个
    static defaultProps = {
        index : 0,
    };
    constructor(props){
        super(props);
        this.state = {navList:[
            {
                url:'/', icon:'home', text:'菜谱'
            },{
                url:'/classify', icon:'edit', text:'分类'
            },{
                url:'/discover', icon:'discover', text:'发现'
            },{
                url:'/personal', icon:'personal', text:'我的'
            }
        ]};
    }

    render(){
        const menu = [];
        this.state.navList.map((nav,i)=>{
            menu.push(
                <Link to={nav.url}
                      key={i}
                      className={i === this.props.index ? 'active':'' }
                      data-index={i}>
                    <Icon type={nav.icon} size={0.2}> </Icon>
                    <p>{nav.text}</p>
                </Link>);
        });
        return(
            <nav className="yg-navigator">
                {menu}
            </nav>
        );
    }
}




