/*
 * 进度条
 * @Author: Magical
 */

import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './progress.scss';

export default class Progress extends Component {
    // 用于检测传入的值得类型
    static propTypes = {
        percent: PropTypes.number,
        prefixCls: PropTypes.string,
        transition: PropTypes.bool
    };
    static defaultProps = {
        percent: 0,
        prefixCls: 'yg-progress',
        transition: true,
    };

    componentDidMount() {
        if (this.props.transition) {
            setTimeout(() => {
                this.refs.bar.style.width = `${this.props.percent}%`;
            }, 10);
        }else{
            this.refs.bar.style.width = `${this.props.percent}%`;
        }
    }


    render() {

        const {className, prefixCls, style = {}} = this.props;
        const wrapCls = classNames({
            [className]: className,
            [prefixCls]: true,
        });
        return (
            <div className={wrapCls}>
                <div className={`${prefixCls}-outer`}> </div>
                <div ref="bar" className={`${prefixCls}-bar`} style = {{...style}}> </div>
            </div>
        )
    }

}