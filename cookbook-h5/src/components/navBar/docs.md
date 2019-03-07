导航栏

使用场景： 网页顶部

### 使用方式

```javascript
<NavBar>网站首页</NavBar>
```

### API

| 属性           | 说明        | 类型                | 默认值          |
| ------------ | --------- | ----------------- | ------------ |
| fixed        | 是否固定头部    | boolean           | false        |
| icon         | 出现在最左边的图标 | string            | arrow-left-o |
| leftContent  | 导航左边内容    | any               | 无            |
| rightContent | 导航右边内容    | any               | 无            |
| onLeftClick  | 导航左边点击回调  | (e: Object): void | 返回上一页        |
| children     | 标题        | any               | 无            |
| className    | 自定义样式     | string            | 无            |
| transparent  | 是否支持滚动变色  | boolean           | false        |
| bgColor      | 背景色(rgb)  | string            | 255,255,255  |
| opacity      | 透明度       | number            | 0            |
| height       | 滚动渐变的高度   | number            | 300          |



### Example

```
<NavBar>常规导航</NavBar>

<NavBar fixed>固定在顶部</NavBar>

<NavBar fixed transparent>滚动渐变</NavBar>
```