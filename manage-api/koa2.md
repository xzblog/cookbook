# koa2



## router

```
yarn add koa-router 
```

示例：

```javascript
const Koa = require('koa');
const router = require('koa-router')(); // 等同于 new一个实例

const app = new Koa();

router.get('/', async (ctx)=>{
    console.log(ctx)
    ctx.body = '网站首页'
})

router.get('/newsList', async (ctx)=>{
    const {a, c} = ctx.query  
    console.log(a)
    console.log(c)
    ctx.body = '新闻列表页'
})

router.get('/details/:id', async (ctx)=>{
    const {id} = ctx.params;
    ctx.body = `新闻详情页:${id}`; 
})


app.use(router.routes()); 

// 在端口3000监听:
app.listen(3000, ()=>{
    console.log('app listing at port 3000...');
});
```

## GET请求

**静态路由**：

​	常用 `ctx.query` , `ctx.querystring` 获取静态路由的参数，前者以对象形式存在，后者以字符串形式存在。

 **动态路由**

我们把类试这样的 `/details/:id`  路由称之为动态路由， 可用 `ctx.params` 获取参数



## POST请求

```
yarn add koa-bodyparser
```

使用：

```javascript
//处理post请求
app.use(bodyParser());

//示例
router.post('/login', async (ctx)=> {
    const {mobile, vCode} = ctx.request.body;
});
```



## 配置模板引擎

这里我们使用 [ejs](https://ejs.bootcss.com/) 作为模板引擎。

配置模板引擎前我们需要安装一个 `koa-views` 

```
yarn add koa-views ejs
```

结合：

```javascript
const views = require('koa-views');
//配置模板引擎
app.use(views(__dirname + '/views', {
    map: {
      html: 'ejs'
    }
}));
```

然后我们就可以新建一个文件 `/views/index.html` ，写上任意内容，在我们访问首页时，渲染该页面。

```javascript
router.get('/', async (ctx)=>{
    await ctx.render('index', {title: '我是首页'});  //在index.html 可通过 <%=title%>拿到值
})
```

## 静态资源处理

``` 
yarn add koa-static
=======
## 处理COOKIE 和Session

#### cookie

​```javascript
//设置
ctx.cookies.set(name, value, [options]);
//获取
ctx.cookies.get('name');
```

option详解

| 名称        | 值                                        |
| --------- | ---------------------------------------- |
| maxAge    | 一个数字表示从 Date.now() 得到的毫秒数                |
| expires   | cookie 过期的 Date                          |
| path      | cookie 路径, 默认是'/'                        |
| domain    | cookie 域名                                |
| secure    | 安全 cookie 默认 false，设置成 true 表示只有 https 可以访问 |
| httpOnly  | 是否只是服务器可访问 cookie, 默认是 true              |
| overwrite | 一个布尔值，表示是否覆盖以前设置的同名的 cookie (默认是 false). 如果是 true, 在同一个请求中设置相同名称的所有 Cookie（不管路径或域）是否在设置此 Cookie 时从Set-Cookie 标头中过滤掉。 |



#### session

```
yarn add koa-session
```



**配置**

```javascript
app.keys = ['some secret hurr'];
const CONFIG = {
key: 'koa:sess', //cookie key (default is koa:sess)
maxAge: 86400000, // cookie 的过期时间 maxAge in ms (default is 1 days)
overwrite: true, //是否可以 overwrite (默认 default true)
httpOnly: true, //cookie 是否只有服务器端可以访问 httpOnly or not (default true)
signed: true, //签名默认 true
rolling: false, //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
renew: false, //(boolean) renew session when session is nearly expired,
};
app.use(session(CONFIG, app));
```

**使用**

```javascript
//设置值 
ctx.session.username = "张三";
//获取值 
ctx.session.username
```


=======
#### cookie和session的区别

* cookie 数据存放在客户的浏览器上，session 数据放在服务器上。
* cookie 不是很安全，别人可以分析存放在本地的 COOKIE 并进行 COOKIE 欺骗考虑到安全应当使用 session。


* session 会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能考虑到减轻服务器性能方面，应当使用 COOKIE。


* 单个 cookie 保存的数据不能超过 4K，很多浏览器都限制一个站点最多保存 20 个 cookie。







## 使用MongoDB

```
yarn add mongodb
```

