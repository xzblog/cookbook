/*
 * 基于pull-load封装的适合公司业务的上拉加载
 * @Author: Magical
 * @Date: 2018/8/20 0020
 */

import React, {Component} from 'react';

import PullLoad from './pull-load';
import request from 'utils/request';


export default class LoadGard extends Component{
    state = {
        dataList: [],
        loadSuccess: false,
        hasNextPage: true,
        pageNum: 1,
    };

    fetchData(pageNum=1){
        const {data={}, url, method='post'} = this.props;

        const newData = Object.assign({pageNum: pageNum, pageSize: 5}, data);
        request({
            url: url,
            method: method,
            data: newData
        }).then(res=>{
            this.setState({
                loadSuccess: true,
                dataList: res.list,
            });
            if(!res.hasNextPage){
                this.setState({
                    hasNextPage: false
                })
            }else{
                this.setState({
                    pageNum: res.pages + 1
                })
            }
        })
    }

    loadMore(){
        this.fetchData(this.state.pageNum)
    }

    componentDidMount(){
        this.fetchData()
    }

    render(){
        const {dataList, loadSuccess,hasNextPage} = this.state;
        const Item = this.props.item;

        let itemList = [];
        {dataList.map((item,i)=> {
            itemList.push(
                <Item data={item} key={i}/>
            )
        })}
        return(
            <div>
                <PullLoad
                    loadSuccess={loadSuccess}
                    hasNextPage={hasNextPage}
                    callback={this.loadMore}
                >
                    {itemList}
                </PullLoad>
            </div>
        )
    }
}
