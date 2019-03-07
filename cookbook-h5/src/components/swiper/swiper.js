import React, {Component} from 'react';
import './swiper.scss';

export default class Swiper extends Component{
    render(){
        const {children, slides} = this.props;
        const slideNum = children.length;
        const slideW = window.screen.width / slides;
        const allW = slideNum * slideW;
        return(
            <div className='yg-swiper'>
                <div className='yg-swiper-wrapper' style={{width:allW +'px'}}>
                    {children.map((item, i) => (
                        <div key={i}
                             className='yg-swiper-slide'
                             style={{width:slideW +'px'}}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}