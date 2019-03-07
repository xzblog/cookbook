/*
 * 短信验证码
 * @Author: Magical
 * @Date: 2018/8/3 0003
 */

import React, {Component} from 'react';
import ClassNames from 'classnames';
import {fetchSmsCode} from 'api/common';

export default class SmsCode extends Component{
    state = {
        disable: false,
        children: this.props.children
    };

    handleClick = () =>{

        const {data, parent} = this.props;
        this.setState({
            children: '发送中...',
            disable: true
        });
        fetchSmsCode(data).then(res=>{
            let delayTime =  120;
            this.timer = setInterval( ()=>{
                if(delayTime < 1){
                    this.setState({
                        children: '重新发送',
                        disable: false,
                    });
                    // 此处需要使用者手动在调用组件内的图片验证码组件上绑定一个叫 imgCode 的ref, 作为单独的组件使用， 不怎么科学。待优化
                    parent.refs.imgCode.handleClick();
                    clearInterval(this.timer)
                }else{
                    this.setState({
                        children: `已发送（${delayTime--}）`,
                    });
                }
            },1000)

        }).catch(err=>{
            this.setState({
                children: '重新发送',
                disable: false
            });
            // 此处需要使用者手动在调用组件内的图片验证码组件上绑定一个叫 imgCode 的ref, 作为单独的组件使用， 不怎么科学。待优化
            parent.refs.imgCode.handleClick();
        })
    };


    componentWillUnmount(){
        clearInterval(this.timer)
    }

    render(){
        const { children, disable} = this.state;
        const cls = ClassNames({
            'yg-send-btn' : true,
            'disabled': disable
        });
        return(
            <a
                className={cls}
                onClick={this.handleClick}
            >
                {children}
            </a>
        )
    }
}
