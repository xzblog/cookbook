/*
 *  单选框Radio
 *  @Author: Magical
 */

import React from 'react';
import classNames from 'classnames';
import './checkbox.scss';


const Checkbox = (props) => {

    const { className, label, right,  ...others } = props;

    const cls = classNames({
        'yg-checkbox': true,
        [className]: className
    });

    const alignRight = right ? {order: 1} : {};

    return(
        <div className={cls} >
            <input type="checkbox"  {...others}/>
            <span style={alignRight} className="icon"> </span>
            <label>{label}</label>
        </div>
    )
};

export default Checkbox