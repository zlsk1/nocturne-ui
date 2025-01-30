---
title: 徽标
lang: ch-ZH
---

# Badge 徽标

## 基础用法

:::demo

badge/basic

:::

## 不同的样式

:::demo

badge/type

:::

## 最大值

:::demo

badge/max

:::

## Badge API

### Badge Props

| 参数   | 描述                             | 类型                                                               | 默认值  |
| ------ | -------------------------------- | ------------------------------------------------------------------ | ------- |
| value  | 显示值                           | `number`/ `string`                                                 | -       |
| type   | 徽标的样式类型                   | ^[enum]`'primary' \| 'success' \| 'warning' \| 'info' \| 'danger'` | warning |
| dot    | 用点代替数值                     | `boolean`                                                          | false   |
| max    | 最大值，超过后将在数值后加上加号 | `number`                                                           | 99      |
| hidden | 是否隐藏徽标                     | `boolean`                                                          | false   |
