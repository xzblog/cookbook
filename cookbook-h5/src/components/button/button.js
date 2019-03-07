/*
 * Button组件
 * @Author： Magical
 */

 import React, {Component} from 'react';
 import PropTypes from 'prop-types';
 import classNames from 'classnames';

 import './button.scss'

export default class Button extends Component{
    static propTypes = {
        type: PropTypes.oneOf(['primary', 'gray', 'danger', '']),
        disabled: PropTypes.bool,
        onCLick: PropTypes.func,

    };
    static defaultProps = {
        type: '',
        onClick: function(){},
    };
    render(){
        const defaultClass = 'yg-button';
        const {disabled ,type, children, className, onClick,} = this.props;

        const  prefixCls = classNames({
            [defaultClass]: true,
            [className]: className,
            [`${defaultClass}-${type}`]: type !== '',
            'disabled': disabled,
        });

        return(
            <div className={prefixCls}
                 onClick={onClick}
            >
                {children}
            </div> 
        )
    }
}