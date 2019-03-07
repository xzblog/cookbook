#### 项目介绍

基于koa2+mongoose的后台管理系统API

#### 项目架构

```
├── componnet                  // 组件
├── model                      // 数据库表相关
├── routes                     // 接口文件
├── sql                        // 数据库备份
├── server.js                  // 入口文件
├── router.js                  // 路由入口文件
├── .travis.yml                // 自动化CI配置
├── koa2.md                    // koa2笔记
├── code.md                    // code含义文档
└── package.json               // package.json
```

#### 安装教程

1. 项目依赖nodemon，更改文件后会即时更新

   ```
   npm install -g nodemon
   ```

2. 安装依赖包

   ```
   npm install
   ```

3. 启动项目

   ```
   npm start
   ```

   ​

#### 使用说明

- [接口文档](http://www.xiaoyaoji.cn/doc/dxHsySwac)
- [mongoose文档](https://mongoosejs.com/docs/)
- [koa2文档](https://koajs.cn/)
- 项目托管[地址](https://gitee.com/petfamily)
- mongodb数据库可视化工具 ： [mongodb compass](https://www.mongodb.com/download-center?jmp=nav#compass)

#### 参与贡献

1. 克隆[本项目](https://gitee.com/petfamily/manage-api.git)
2. 新建 feat_xxx 分支
3. 提交代码