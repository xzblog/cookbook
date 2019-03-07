/*
 * 下拉刷新
 * @Author: Magical
 */

import React, {Component} from 'react'


import './pullRefresh.scss'


export default class pullRefresh extends Component{
    state ={
        moveY: '0',
        showTips: false,
    };
    static defaultProps = {
        callBack: function(){}
    };
    handleTouchStar = (e) => {
        this.setState({
            startY: e.targetTouches[0].clientY
        })
    };
    handleTouchMove = (e) => {
        const moveHeight = e.changedTouches[0].clientY - this.state.startY;
        const moveY = moveHeight > 120 ? 120 : moveHeight;
        if(40< moveY && moveY < 60){
            this.setState({
                tips: '下拉即可刷新',
                showTips: true
            })
        }else if (moveY > 60){
            this.setState({
                tips: '松开即可刷新',
                showTips: true
            })
        }

        this.setState({
            moveY: moveY
        });

    };
    handleTouchEnd = (e) => {
        const moveHeight = e.changedTouches[0].clientY - this.state.startY;
        if(moveHeight > 60){
            this.setState({
                moveY: '40',
                tips: '加载中...'
            });
            const func = () => {
                this.props.callBack();
            }

            this.setState({
                tips: '刷新成功',
                moveY: '0',
                showTips: false,
            })

        }else{
            this.setState({
                moveY: '0',
                showTips: false,
            });
        }
    };


    render(){
        const {children} = this.props;
        const {showTips} = this.state;
        const style = {
            transform:`translate3d(0, ${this.state.moveY}px, 0)`,

        };
        return(
            <div className='yg-pull-refresh'>
                <div className={`tips ${showTips ?'show':''}`}>{this.state.tips}</div>
                <div className='content'
                     onTouchStart={this.handleTouchStar}
                     onTouchMove={this.handleTouchMove}
                     onTouchEnd={this.handleTouchEnd}
                     style={style}
                >{children}</div>
            </div>
        )
    }
}
