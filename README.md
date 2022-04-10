# wxmini-canvas2d

[![NPM Version](https://img.shields.io/npm/v/@skit/wxmini-canvas2d.svg?sanitize=true)](https://www.npmjs.com/package/@skit/wxmini-canvas2d)
[![NPM Download](https://img.shields.io/npm/dm/@skit/wxmini-canvas2d.svg?sanitize=true)](https://www.npmjs.com/package/@skit/wxmini-canvas2d)
[![License](https://img.shields.io/github/license/fudiwei/wxmini-canvas2d)](https://mit-license.org/)

---

## 特性

-   将微信小程序或小游戏中提供的 Canvas 2D API，转化为链式调用形式；
-   除了完整封装原生 API，还提供了以下几个便捷方法；
    1.  `rectWithRadius`：类似 `rect`，但支持绘制指定半径的圆角。
    2.  `fillRectWithRadius`：类似 `rect` + `fill`，但支持绘制指定半径的圆角。
    3.  `strokeRectWithRadius`：类似 `rect` + `stroke`，但支持绘制指定半径的圆角。
    4.  `drawImageWithRadius`：类似 `drawImage`，但支持绘制指定半径的圆角。
    5.  `fillTextWithWrap`：类似 `fillText`，但支持指定最大高度的自动换行。
    6.  `strokeTextWithWrap`：类似 `strokeText`，但支持指定最大高度的自动换行。
-   可单独拷贝到项目中使用；
-   支持离屏画布（OffscreenCanvas）；
-   支持 TypeScript。

---

## 用法

### 安装：

```shell
npm install @skit/wxmini-promisify
```

### 导入：

```javascript
import { FluentCanvas2D } from '@skit/wxmini-canvas2d';
```

### 使用链式方法：

```javascript
FluentCanvas2D.select({
    selector: '#myCanvasId',
    autoScaleWithDPR: true
}).then((fcanvas) => {
    fcanvas
        .beginPath()
        .arc(20, 20, 2, 0, 2 * Math.PI)
        .setFillStyle('red')
        .fill()
        .closePath();
});

/**
 * @example 以上示例代码等同于下方原生实现：
 */
wx.createSelectorQuery()
    .select('#myCanvasId')
    .fields({
        node: true,
        size: true
    })
    .exec((res) => {
        const canvas = res[0].node;
        const dpr = wx.getSystemInfoSync().pixelRatio;
        canvas.width = res[0].width * dpr;
        canvas.height = res[0].height * dpr;

        const context = canvas.getContext('2d');
        context.beginPath();
        context.arc(20, 20, 2, 0, 2 * Math.PI);
        context.fillStyle = 'red';
        context.fill();
        context.closePath();
    });
```

更多用法请参考示例项目和 TypeScript 声明文件。

---

## 迭代计划

-   [ ] 异步链式方法。

-   [ ] 配置式海报工具。

-   [ ] rpx 单位自动转换。

-   [ ] `fillTextWithWrap`、`strokeTextWithWrap` 支持指定单词截断方式。
