/**
 * Created by zsf on 2017/11/6 0006.
 */
/*
 * 轻提示
 * @Author: Magical
 */

// Notice是Toast最底层组件
// 每个黑色的小框框其实都是一个Notice
// Notice核心就是组件初始化的时候 生成一个定时器
// 根据输入的时间 加载一个动画 然后执行输入的回调
// Notice的显示和隐藏受父组件Notification的绝对控制

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './toast.scss';

function empty() {}

class Notice extends Component {
    //检测类型
    static propTypes = {
        duration: PropTypes.number, // Notice显示时间
        prefixCls: PropTypes.string, // 前缀class
        type: PropTypes.oneOf(['info', 'success', 'warning', 'fail']), // notice类型
        iconClass: PropTypes.string, // icon的class
        content: PropTypes.any, // Notice显示的内容
        onClose: PropTypes.func // 显示结束回调
    };

    //默认属性
    static defaultProps = {
        prefixCls: 'yg-notice',
        duration: 3000,
        onClose: empty
    };


    state = {
        shouldClose: false, // 是否开启关闭动画
    };


    // 清理定时器
    clearCloseTimer () {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
            this.closeTimer = null;
        }
    }


    close () {
        // 关闭的时候 应该先清掉倒数定时器
        // 然后开启过场动画
        // 等待动画结束 执行回调
        this.clearCloseTimer();
        this.setState({shouldClose: true});
        this.timer = setTimeout(()=>{
            if(this.props.onClose){
                this.props.onClose();
            }
            clearTimeout(this.timer);
        }, 300);
    }


    componentDidMount () {
        if(this.props.duration > 0){
            this.closeTimer = setTimeout(() => {
                this.close();
            }, this.props.duration -300); //减去动画的过渡时间
        }
    }


    componentWillUnmount () {
        // 清掉定时器
        this.clearCloseTimer();
    }


    render () {
        const {shouldClose} = this.state;
        const {prefixCls, type, iconClass, content} = this.props;

        return (
            <div
                className={classNames([prefixCls,
                    {'info': type === 'info'},
                    {'success': type === 'success'},
                    {'warning': type === 'warning'},
                    {'fail': type === 'fail'},
                    {'leave': shouldClose}
                ])}
            >
                {iconClass ? <div className={`${prefixCls}-icon`}><span className={classNames(['fa', iconClass])} /></div> : null}
                <div className={`${prefixCls}-content`}>{content}</div>
            </div>
        )
    }
}


export default Notice