---
title: 时间轴
lang: ch-ZH
---

# Timeline 时间轴

## 基础用法

:::demo

timeline/basic

:::

## TimelineItem API

### TimelineItem Props

| 属性名        | 描述           | 类型                                                               | 默认值   |
| ------------- | -------------- | ------------------------------------------------------------------ | -------- |
| timestamp     | 时间戳         | `string`                                                           | ''       |
| type          | 时间轴类型     | ^[enum]`'primary' \| 'success' \| 'warning' \| 'info' \| 'danger'` | false    |
| hollow        | Tag的尺寸      | `boolean`                                                          | false    |
| center        | 是否居中       | `boolean`                                                          | false    |
| hideTimestamp | 是否隐藏时间戳 | `boolean`                                                          | false    |
| placement     | 时间轴位置     | ^[enum]`'bottom' \| 'top'`                                         | 'bottom' |
| size          | 时间轴大小     | ^[enum]`'normal' \| 'large'`                                       | 'normal' |
| color         | 自定义颜色     | ^[enum]`'dark' \| 'light' \| 'plain'`                              | light    |
| icon          | 自定义图标     | `string`、`Component`                                              | ——       |
