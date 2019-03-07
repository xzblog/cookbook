/*
 *  单选框Radio
 *  @Author: Magical
 */

import React from 'react';
import classNames from 'classnames';
import './radio.scss';


const Radio = (props) => {

    const { className, label, right,  ...others } = props;

    const cls = classNames({
        'yg-radio': true,
        [className]: className
    });

    const alignRight = right ? {order: 1} : {};

    return(
        <div className={cls} >
            <input type="radio"  {...others}/>
            <span style={alignRight} className="icon"> </span>
            <label>{label}</label>
        </div>
    )
};

export default Radio