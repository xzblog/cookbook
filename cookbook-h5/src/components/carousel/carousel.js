/*
 * 幻灯片
 * @Author: Magical
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import "./carousel.scss";


export default class Carousel extends Component{
    static propTypes = {
        speed: PropTypes.number,
        delay: PropTypes.number,
        autoplay: PropTypes.bool,
        dots: PropTypes.bool,
        loop: PropTypes.bool,
        num: PropTypes.number,
        vertical: PropTypes.bool
    };

    static defaultProps = {
        speed: 0.6,        // 过渡时间
        delay: 5,          // 滑动间隔s
        autoplay: false,   // 自动播放
        dots: false,        // 是否显示底部点点
        loop: true,        // 是否循环
        vertical: false,   // 是否垂直显示
        num: 1,            // 每屏显示的slide的个数
    };

    constructor(props){
        super(props);
        const count =React.Children.count(props.children);
        this.state = {
            activeIndex: 0,        // 当前是第几个
            startX: 0,             // 鼠标开始的位置
            movedWith: 0,          // 滑动的距离
            count: count,          // children个数
        };


    }

    timer = null;   //用来中途停止自动播放的。
	style = null;   //控制样式

    // 向前向后滑动几个slide
    turn = (num) =>{
    	const {speed, loop, children} = this.props;
    	const count = React.Children.count(children);
    	const {activeIndex} = this.state;
        let n = (activeIndex) + num;

        if(loop && count > 1){
            if(n < 0){
                setTimeout(()=>{
                    this.style = {
                        transitionDuration: 'unset'
                    };
                    this.setState({
                        activeIndex: n + count
                    })
                },speed*1000)

            }else if(n >= count){
                setTimeout(()=>{
                    this.style = {
                        transitionDuration: 'unset'
                    };
                    this.setState({
                        activeIndex: n - count
                    })
                },speed*1000)
            }else{
                this.style = null
            }
        }else{
            if(n < 0){
                n = 0;
            }
            if(n >= count){
                n = count-1
            }
        }

        this.setState({activeIndex: n});
    };


    // 自动轮播
    autoPlay = () => {
    	const {autoplay, delay, children} = this.props;
    	const count = React.Children.count(children);
        if(autoplay && count > 1) {
            this.timer = setInterval(() => {
                this.turn(1);
            }, delay * 1000);
        }
    };

    handleTouchStart = (e) =>{
        clearInterval(this.timer);  // 在操作时停止自动轮播
        this.setState({
            startX: e.changedTouches[0].pageX,
        });
        this.style = {
        	transitionDuration: 'unset'
        }
    };

    handleTouchMove = (e) =>{
        const onMoveWidth = e.changedTouches[0].pageX -this.state.startX;
        this.setState({
            movedWith: onMoveWidth
        });
    };

    handleTouchEnd = (e) =>{
        const moveWidth =  e.changedTouches[0].pageX - this.state.startX;
        if(moveWidth > 100){      // 当滑动距离超过一百的时候才触发翻动效果
            this.turn(-1)
        }else if(moveWidth < -100){
            this.turn(1)
        }
        this.setState({
            movedWith: 0,
        });

        this.style = null;
        this.autoPlay();    //操作的时候停止播放， 操作完成继续
    };

    componentDidMount() {
        this.autoPlay();
    }
    componentWillReceiveProps(props){
        const count = React.Children.count(props.children);    // 实际children个数
        count > 1 && this.autoPlay();  // 防止 当children是异步获取的时候，组件加载完成时拿到的children是空时不会自动轮播

    }
    componentWillUnmount () {
        clearInterval(this.timer)
    }

    render() {
        const {speed, children, className, dots, loop, num, vertical } = this.props;
        const {activeIndex, movedWith} = this.state;
        const count = React.Children.count(children);
        const newCount = count === 1 ? count : count + 2;              // children大于1的时给他加2，用于无限训循环
        const clientWidth = this.refs.carousel && this.refs.carousel.offsetWidth;     // 外容器的宽度
        const clientHeight = this.refs.carousel && this.refs.carousel.offsetHeight;     // 外容器的高度
        const childWidth = clientWidth && clientWidth * 1 / num;                // 每个children的宽
        const childHeight = clientHeight && clientHeight * 1 / num;                // 每个children的高
        const index = loop && count > 1 ? activeIndex + 1 : activeIndex;
        const moveW = (- (childWidth* index)) + movedWith;
        const moveH = (- (childHeight* index));
        const style = vertical ?
            {
                flexDirection: 'column',
                transform: `translate3d(0, ${moveH}px, 0)`,
                transitionDuration: speed + "s",
                height: newCount * childHeight + "px",
                ...this.style
            }
            :
            {
                transform: `translate3d(${moveW}px, 0, 0)`,
                transitionDuration: speed + "s",
                width: newCount * childWidth + "px",
                ...this.style
            };
        const cls = classNames({
            'yg-carousel': true,
            [className] : className
        });
        // 处理children， 当大于1个的时候， 加上第一个和最后个
        const newChildren = children.length > 1 ? children.slice(-1).concat(children).concat(children[0]) : children;
        // 处理新的children, 重置 key值
        const cloneChildren =  React.Children.map(newChildren, function (child, i) {
            return React.cloneElement(
                child,
                {
                    key: i
                },
            );
        });
        return (
            <div ref='carousel' className={cls}
                onTouchStart={this.handleTouchStart}
                onTouchMove={this.handleTouchMove}
                onTouchEnd={this.handleTouchEnd}
            >
                <div className='yg-carousel-wrap' style={style} >
                    {
                        React.Children.map(cloneChildren, function (child) {
                            return <div  className='slide' style={vertical ? {height: childHeight, width: '100%'}:{width: childWidth}}>{child}</div>
                        })
                    }
                </div>

                {dots && count > 1 ? <Dots count={count} activeIndex={activeIndex} /> : null}
            </div>
        );
    }
}



/*
 * 下面的点
 */
class Dots extends Component {
    render() {
        let dotNodes = [];
        const { count, activeIndex } = this.props;
        for(let i = 0; i < count; i++) {
            dotNodes[i] = (
                <span
                    key={i}
                    className={i === activeIndex ? " dot-active": null}>
                </span>
            );
        }
        return (
            <div className="slider-dots">
                {dotNodes}
            </div>
        );
    }
}



