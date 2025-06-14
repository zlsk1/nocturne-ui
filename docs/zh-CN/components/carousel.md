---
title: 轮播图
lang: ch-ZH
---

# Carousel 轮播图

一组不断滚动的内容

## 基础用法

:::demo

carousel/basic

:::

## Carousel API

### Carousel Props

| 属性名             | 描述             | 类型                                            | 默认值       |
| ------------------ | ---------------- | ----------------------------------------------- | ------------ |
| height             | 轮播图的高       | `string`、`number`                              | 300          |
| autoplay           | 是否自动播放     | `boolean`                                       | true         |
| interval           | 切换间隔         | `number`                                        | 300          |
| showArrow          | 是否显示切换箭头 | ^[boolean]                                      | true         |
| indicatorShape     | 指示器形状       | ^[enum]`'rectangle' \| 'circle'`                | 'rectangle'  |
| hideIndicator      | 是否隐藏指示器   | ^[boolean]                                      | false        |
| mode               | 轮播图的排列方向 | ^[enum]`'vertical' \| 'horizontal'`             | 'horizontal' |
| indicatorPlacement | 指示器位置       | ^[enum]`'bottom' \| 'top' \| 'right' \| 'left'` | ——           |
| trigger            | 触发方式         | ^[enum]`'hover' \| 'click'`                     | 'hover'      |
| loop               | 是否循环切换     | ^[boolean]                                      | true         |
| initialIndex       | 初始下标         | ^[number]                                       | 0            |

### Carousel Emits

| 事件名 | 描述       | 类型                                                      |
| ------ | ---------- | --------------------------------------------------------- |
| change | 切换时触发 | ^[Function]`(newIndex: number, oldIndex: number) => void` |

### Carousel Slots

| 插槽名    | 描述             |
| --------- | ---------------- |
| prev      | 切换上一张的按钮 |
| next      | 切换下一张的按钮 |
| indicator | 指示器           |

### Carousel Exposes

| 插槽名       | 描述               | 类型                                 |
| ------------ | ------------------ | ------------------------------------ |
| currentIndex | 当前下标           | `number`                             |
| switchTo     | 切换至指定项       | ^[Function]`(index: number) => void` |
| onPrev       | 切换至上一张的方法 | ^[Function]`() => void`              |
| onNext       | 切换至下一张的方法 | ^[Function]`() => void`              |
