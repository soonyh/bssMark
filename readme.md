给背景添加水印，依赖jquery

## 用法

```html
<div id="main" style="height:100vh; width:100vw;"></div>
```

```javascript
new bssmark($('#main'), {
  text: 'soon 001298420',
  docWidth: 1000,  //默认取的是容器宽度
  docHeight: 1000,
  fontColor:'rgba(100, 100, 100, 0.125)',
  fontStyle:'20px 黑体', //水印字体设置
  rotateAngel: -20 * Math.PI / 180, //水印字体倾斜角度设置
})
```

以上options，只有text是必填项

## 兼容性

支持IE9+,包含IE9
