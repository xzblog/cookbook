import React, {Component} from 'react'

import NavBar from './navBar'

export default class NavBarDemo extends Component {

    render() {
        return(
            <div>
                <NavBar>常规导航</NavBar>

                <NavBar fixed>固定在顶部</NavBar>

                <NavBar fixed transparent>滚动渐变</NavBar>
            </div>
        )
    }
}