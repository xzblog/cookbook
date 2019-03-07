# 项目概览 #

### 项目介绍 ###

基于React + webpack搭建的单页脚手架

### 项目依赖 ###

node8+、  webpack4+、 react-router4+、react16+

### 项目特性 ###

支持scss、 结合 ant-mobile


#使用方法#

```javascript
1. yarn install      //安装依赖
2. yarn start        //开启项目
3. yarn build        //项目打包
```

# 项目结构 #


	│  .babelrc             —— babel 配置文件
	│  .gitignore           —— git过滤
	│  package.json
	│
	├─config                —— webpack 的及主要配置(待完善)
	│      config.js        —— 常用配置文件，如端口等
	│      webpack.config.common.js  —— 基础配置文件
	│      webpack.config.dev.js   —— 开发环境配置
	│      webpack.config.prod.js  —— 生产环境配置
	│
	├─public                
	│   │  index.html		—— 打包生成html时指定的模板文件
	│
	│
	├─src                   —— 项目源文件(前端主要页面)
	│  │  index.js			—— 入口文件
	│  │  router.js         —— 路由文件
	│  │
	│  ├─components         —— 公用组件
	│  │  
	│  │
	│  ├─views              —— 页面文件，存放各种页面
	│  │
	│  │
	│  ├─utils              —— 工具函数库
	│  │
	│  │
	│  └─static             —— 存放 静态资源
	│          common.scss      --公用样式
	│		   normalize.scss   --初始化样式
	│		   animation.scss   --动画库
	│		   theme.scss       --皮肤
	│
	└─node_modules          —— 外部包



注意：该 `webpack` 配置没有在线上项目中运用过， 慎用...

### Futuer

基于该配置封装出一套自己的组件库，工具库。

基于改配置和上面的组件做一个实际的项目。

正在进行中...

