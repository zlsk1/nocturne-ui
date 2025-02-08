---
title: 标签页
lang: ch-ZH
---

# Tabs 标签页

## 基础用法

:::demo

tabs/basic

:::

## 位置

:::demo

tabs/position

:::

## 可滚动

:::demo

tabs/scroll

:::

## 卡片型标签页

:::demo

tabs/card

:::

## 可编辑的标签页

:::demo

tabs/editable

:::

## Tabs API

### Tabs Props

| 属性名               | 描述                   | 类型                                            | 默认值 |
| -------------------- | ---------------------- | ----------------------------------------------- | ------ |
| modelValue / v-model | 当前激活tab面板的 name | string / number                                 | ——     |
| position             | 标签位置               | ^[enum]`'top' \| 'bottom' \| 'left' \| 'right'` | top    |
| disabled             | 是否禁用               | boolean                                         | false  |
| popperClass          | 自定义popper类名       | `String`、`Array`、`Object`                     | ——     |
| type                 | tab类型                | ^[enum]`'line' \| 'card' \| 'editable-card'`    | ——     |
| size                 | 尺寸                   | ^[enum]`'large' \| 'default' \| 'small'`        | ——     |

### Tabs Emits

| 事件名 | 描述           | 类型                                                  |
| ------ | -------------- | ----------------------------------------------------- |
| change | 切换标签时触发 | ^[enum]`(label: string) => void`                      |
| click  | 点击标签时触发 | ^[enum]`(label: string) => void`                      |
| edit   | 编辑时触发     | ^[enum]`(type: 'add' \| 'del',label: string) => void` |

### Tabs Slots

| 插槽名  | 描述       |
| ------- | ---------- |
| default | 自定义内容 |

### TabPane API

### TabPane Props

| 属性名    | 描述       | 类型      | 默认值 |
| --------- | ---------- | --------- | ------ |
| label     | 标签       | `string`  | ——     |
| disabled  | 是否禁用   | `boolean` | false  |
| closeable | 是否可关闭 | `boolean` | true   |

### TabPane Slots

| 插槽名  | 描述       |
| ------- | ---------- |
| default | 自定义内容 |
