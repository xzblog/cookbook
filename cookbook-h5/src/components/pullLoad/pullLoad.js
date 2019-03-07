/*
 * 上拉加载
 * @Author: Magical
 */

import React, {Component} from 'react'


import './pullLoad.scss'


export default class PullLoad extends Component{
    state ={
        moveY: '0',
        showTips: false,
    };
    handleTouchStar = (e) => {
        this.setState({
            startY: e.targetTouches[0].clientY
        })
    };
    handleTouchMove = (e) => {
        const moveHeight = e.changedTouches[0].clientY - this.state.startY;
        // const moveY = moveHeight > 100 ? 100 : moveHeight;
        console.log(moveHeight);
        if(40< moveHeight && moveHeight < 60){
            this.setState({
                tips: '下拉即可刷新',
                showTips: true
            })
        }else if (moveHeight > 60){
            this.setState({
                tips: '松开即可刷新',
                showTips: true
            })
        }

        this.setState({
            moveY: moveHeight
        });

    };
    handleTouchEnd = (e) => {
        console.log('滑动结束')
        const moveHeight = e.changedTouches[0].clientY - this.state.startY;
        if(moveHeight > 60){
            this.setState({
                moveY: '40',
                tips: '加载中...'
            });

           setTimeout(()=>{
                this.setState({
                    tips: '刷新成功',
                    moveY: '0',
                    showTips: false,
                });
            },2000)

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

        }
        return(
            <div className='yg-pull-load'>
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
