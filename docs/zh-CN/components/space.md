---
title: 间隔
lang: ch-ZH
---

# Space 间隔

## 基础用法

:::demo 控制水平方向上的间距

space/basic

:::

## Space API

### Space Props

| 属性名    | 描述         | 类型                                                | 默认值       |
| --------- | ------------ | --------------------------------------------------- | ------------ |
| size      | 间隔大小     | ^[enum]`'small' \| 'default' \| 'large'`、`number`  | 'small'      |
| direction | 排列方向     | ^[enum]`'horizontal' \| 'vertical'`                 | 'horizontal' |
| align     | 纵轴排列方式 | ^[enum]`'start' \| 'end' \| 'center' \| 'baseline'` | ——           |
| wrap      | 是否自动换行 | `boolean`                                           | false        |
