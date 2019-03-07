# Checkbox

简单示例：

```javascript
state = {
  hobby: ['basketball']
};

handleChange =(e) =>{
  const {checked, value} = e.target;
  let {hobby} = this.state;
  if(checked && !hobby.includes(value)){ 
    hobby.push(value);
  }else{
    hobby = hobby.filter(i=>i !== value)
  }
  this.setState({
    hobby
  })
};

<h3>爱好是：{this.state.hobby.join()}</h3>
<Checkbox label='篮球' value='basketball' onChange={this.handleChange}  defaultChecked />
<Checkbox label='足球' value='football' onChange={this.handleChange}/>
<Checkbox label='排球' value='volley' onChange={this.handleChange}/>
<Checkbox label='打游戏' disabled />
```



## API

| 属性             | 说明     | 类型      | 默认值   |
| -------------- | ------ | ------- | ----- |
| label          | 提示文字   | any     | 无     |
| defaultChecked | 默认选中   | boolean | false |
| right          | 图标显示在右 | boolean | false |
| className      | 自定义样式  | string  | false |

除了上面的属性，还支持所有 所有 `react` 事件和 `input[type="checkbox"]` 的所有属性。



