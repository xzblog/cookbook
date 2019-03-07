import React, {Component} from 'react'

import Button from './button'

export default class ButtonDemo extends Component {

    handleClick = () =>{
        console.log('你点击了默认按钮')
    };

    render() {
        return(
            <div>
                <h1>Button</h1>

                <div className='flex'>
                    <Button onClick={this.handleClick}>default</Button>
                    <Button type='primary'>primary</Button>
                    <Button type='danger'>danger</Button>
                    <Button type='gray'>gray</Button>
                    <Button disabled >disabled</Button>
                    <Button className='my-btn'>custom</Button>
                </div>
            </div>
        )
    }
}