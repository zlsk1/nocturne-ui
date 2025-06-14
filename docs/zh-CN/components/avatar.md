---
title: 头像
lang: ch-ZH
---

# Avatar 头像

## 基础

:::demo 三种基础大小和两种形状

avatar/basic

:::

## 图标头像

:::demo

avatar/icon

:::

## 适应容器

设置图片在容器中的布局方式，与[object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)一致

:::demo

avatar/fit

:::

## Avatar API

### Avatar Props

| 参数  | 描述                                         | 类型                                                             | 默认值   |
| ----- | -------------------------------------------- | ---------------------------------------------------------------- | -------- |
| shape | 头像形状                                     | ^[enum]`'circle' \| 'square'`                                    | 'circle' |
| size  | 头像的大小                                   | `string`、`number`                                               | ——       |
| icon  | 图标                                         | `string`、`Component`                                            | ——       |
| src   | 图片地址                                     | `string`                                                         | ——       |
| alt   | img原生属性                                  | `string`                                                         | ——       |
| fit   | 当展示类型为图片的时候，设置图片如何适应容器 | ^[enum]`'fill'\| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | 'cover'  |

### Avatar Emits

| 事件名 | 描述               | 类型                          |
| ------ | ------------------ | ----------------------------- |
| error  | 图片加载失败时触发 | ^[enum]`(evt: Event) => void` |
