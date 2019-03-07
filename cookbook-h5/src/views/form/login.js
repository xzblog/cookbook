/*
 * 注册
 * @Author: Magical
 */

import React, {Component} from 'react'
import {DocumentTitle, Toast, NavBar, Button, Input, Icon } from 'components';
import T from 'utils/utils';
import './form.scss';

export default class Login extends Component {

    state = {
        mobile: '',
        password: '',
    };

    changeValue = (key,value) =>{
        this.setState({
            [key]:value
        })
    };

    getVCode = () => {
        const mobile = T.delSpace(this.state.mobile);
        if(mobile.length === 0 ) {
            Toast.show('手机号码不能为空')
        }else if(mobile.length < 11 ){
            Toast.show('手机号码格式不对')
        }else{
            T.ajax.post('/user/getVCode',{
                mobile: mobile
            }).then((res)=>{
                Toast.success(res.data)
            }).catch((err)=>{
                Toast.fail(err)
            })
        }
    };

    handleClick = () => {
        const {mobile, vCode} = this.state;
        const newMobile = T.delSpace(mobile)
        T.ajax.post('/user/login',{
            mobile: newMobile,
            vCode: vCode
        }).then((res)=>{
            T.setCookie('code', res.code);
            Toast.success(res.msg, 2000, ()=> {
                this.props.history.push(this.props.location.state)
            })
        }).catch((err)=>{
            Toast.fail(err)
        })
    };

	componentDidMount(){
        document.body.style.backgroundColor = '#fff'
    }
    componentWillUnmount(){
        document.body.style.backgroundColor = '#f8f9fa'
    }

    render() {
        return(
            <DocumentTitle title='登录'>
                <div>
                    <NavBar className='form-navbar'>登录</NavBar>
                    <div className='login'>
                        <Input
                            type="tel"
                            placeholder='请输入您手机号码'
                            onChange={(v)=>{this.changeValue('mobile',v)}}
                        />
                        <Input
                            type="text"
                            placeholder='请输入验证码'
                            rightContent= {<span onClick={this.getVCode} className='code'>获取验证码</span>}
                            maxLength={4}
                            onChange={(v)=>{this.changeValue('vCode',v)}}
                        />

                        <Button type='primary' onClick={this.handleClick}>登录</Button>
                        <p className='tips'>进入即代表你同意《用户使用协议》</p>

                        <div className='login-bottom'>
                            <div className='login-line'><span>第三方登录</span></div>
                            <div className='other-login'>
                                <Icon type='emoji-complacent' size={0.5} className='icon'/>
                                <Icon type='emoji-smile' size={0.5} className='icon'/>
                            </div>
                            <p className='tips'>未注册用户将直接为您创建账户</p>
                        </div>
                    </div>

                </div>
            </DocumentTitle>

        )
    }
}
