/*
 * 滚动加载
 * @Author: Magical
 */

import React, {Component} from 'react'
import './pull-load.scss'


export default class PullLoad extends Component{
    state ={
        tips: '加载中...',
        hasNextPage: true,
    };

    handleScroll = () => {
        const {hasNextPage} = this.state;
        const rootBox= this.refs.rootBox;
        const scrollHeight = rootBox.scrollHeight;
        const clientHeight = rootBox.clientHeight;
        const scrollTop = rootBox.scrollTop;

        if(scrollHeight <= clientHeight + scrollTop && hasNextPage){
            this.setState({
                tips: '加载中...',
            });
            this.props.callback();
        }
    };

    componentWillReceiveProps(props){
        if(props.loadSuccess){
            this.setState({
                tips: props.hasNextPage? '加载中...' : '没有更多了~',
                hasNextPage: props.hasNextPage
            });
        }
    }


    render(){
        const {children, style} = this.props;
        const { tips} = this.state;

        return(
            <div
                ref="rootBox"
                className='yg-pull-load'
                style={style ? style: null}
                onScroll={this.handleScroll}
            >
                <div className='yg-pull-load-content'>
                    {children}
                    <p className="tips show" >{tips}</p>
                </div>
            </div>
        )
    }
}
