/*
 * 图片验证码
 * @Author: Magical
 * @Date: 2018/8/3 0003
 */

import React, {Component} from 'react';
import {server} from '../../../config/config';
import {fetchImgCode} from 'api/common';

class ImgCode extends Component{
    state = {
        vCodeKey: ''
    };

    handleClick = () =>{
        fetchImgCode().then(res=>{
            this.setState({
                vCodeKey: `${server.ip}/api/${server.version}/vCode/imgCode?vCodeKey=${res.vcodeKey}`
            });

            // 暂时吧key存到本地， 以后改成全局或者用状态管理
            localStorage.setItem('vCodeKey', res.vcodeKey)
        })
    };

    componentDidMount(){
        this.handleClick();
    }

    render(){
        return(
            <img style={{height: '100%'}} src={this.state.vCodeKey} onClick={this.handleClick} />
        )
    }
}
export default  ImgCode

