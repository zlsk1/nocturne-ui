---
title: 标签
lang: ch-ZH
---

# Tab 标签

## 基础用法

:::demo

tag/basic

:::

## 可移除标签

:::demo

tag/closable

:::

## Tag API

### Tag Props

| 属性名     | 描述             | 类型                                                               | 默认值  |
| ---------- | ---------------- | ------------------------------------------------------------------ | ------- |
| type       | 样式类型         | ^[enum]`'primary' \| 'success' \| 'warning' \| 'info' \| 'danger'` | primary |
| closable   | 是否可关闭       | `boolean`                                                          | false   |
| size       | Tag的尺寸        | ^[enum]`'small' \| 'default' \| 'large'`                           | ——      |
| round      | 是否为圆形标签   | `boolean`                                                          | false   |
| transition | 是否开启过渡效果 | `boolean`                                                          | false   |
| border     | 是否保留边框     | `boolean`                                                          | false   |
| effect     | 是否保留边框     | ^[enum]`'dark' \| 'light' \| 'plain'`                              | light   |
