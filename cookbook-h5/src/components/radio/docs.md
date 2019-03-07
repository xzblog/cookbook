# Radio

简单示例：

```javascript
<Radio name='sex' label='男生' defaultChecked />
<Radio name='sex' label='女生' />
<Radio name='sex' label='人妖' disabled />
```

展示在一行

```javascript
<div style={{display:'flex'}}>
    <Radio name='sex' label='男生' defaultChecked />
	<Radio name='sex' label='女生' />
</div>
```

## API

| 属性             | 说明     | 类型      | 默认值   |
| -------------- | ------ | ------- | ----- |
| label          | 提示文字   | any     | 无     |
| defaultChecked | 默认选中   | boolean | false |
| right          | 图标显示在右 | boolean | false |
| className      | 自定义样式  | string  | false |

除了上面的属性，还支持所有 所有 `react` 事件和 `input[type="radio"]` 的所有属性。



**注** 一个组的 `radio` 的 `name` 值应该一样

