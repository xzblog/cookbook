/*
 * 路由文件
 * @Author: Miracle
 */

import React, {Component} from 'react'
import {BrowserRouter, Switch, Route, withRouter, Redirect} from 'react-router-dom'
import T from 'utils/utils'
import Home from './views/home';
import Classify from './views/classify';
import Discover from './views/discover';
import Personal from './views/personal';
import Login from './views/form/login';

import Search from './views/search/search';
import Article from './views/article';
import ListView from './views/list-view';
import Collect from './views/collect';
import TabsPage from './views/tabs';




// 权限验证
const PrivateRoute = ({ component: Component, ...rest }) => {
    const code = T.getCookie('code');
    return <Route
        {...rest}
        render={props =>
            code === '0' ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: props.location   //将原本跳转的页面带到登录页去，带登录成功之后在跳转回来
                    }}
                />
            )
        }
    />
};


export default class App extends Component {
    render() {
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
					<Route path="/classify" component={Classify} />
					<Route path="/discover" component={Discover} />
					<Route path='/search' component={Search}/>
					<Route path='/article/:id' component={Article}/>
					<Route path='/listView' component={ListView}/>
					<Route path='/listView' component={ListView}/>
					<Route path='/tabsPage' component={TabsPage}/>

					<Route path="/login" component={Login} />

					<PrivateRoute path="/personal" component={Personal} />
					<PrivateRoute path="/collect" component={Collect} />
                </Switch>
            </BrowserRouter>
        )
    }
}
