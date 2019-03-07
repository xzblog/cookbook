/*
 * 项目入口文件
 * @Author: Magical
 */

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';  //react热更新模块
import App from './router'
import './static/css/common.scss'

// 开启热更新
if (module.hot) {
    module.hot.accept();
}

render(
    <AppContainer>
        <App/>
    </AppContainer>,
    window.document.getElementById('root')
);

