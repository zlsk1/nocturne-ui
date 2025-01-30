---
title: 警告
lang: ch-ZH
---

# Alert 警告

用于页面中展示重要的提示信息。

## 基础用法

添加 `type` 属性设置不同的样式

:::demo

alert/basic

:::

## 自定义关闭文字

:::demo

alert/close-text

:::

## 主题

:::demo

alert/effect

:::

## 图标

:::demo

alert/icon

:::

## Alert API

### Alert Props

| 属性名      | 描述                               | 类型                                                  | 默认值 |
| ----------- | ---------------------------------- | ----------------------------------------------------- | ------ |
| type        | 样式类型                           | ^[enum]`'success' \| 'warning' \| 'info' \| 'danger'` | info   |
| title       | 标题                               | `string`                                              | ——     |
| description | 额外描述                           | `string`                                              | ——     |
| closable    | 是否可关闭                         | `boolean`                                             | true   |
| effect      | 主题                               | ^[enum]`'light' \| 'dark'`                            | light  |
| showIcon    | 是否在左侧显示图标，图标跟类型相关 | `boolean`                                             | false  |
| closeText   | 自定义关闭图标                     | `string`                                              | ——     |
| center      | 是否为居中布局                     | `boolean`                                             | false  |

### Alert Emits

| 事件名 | 描述         | 类型                                   |
| ------ | ------------ | -------------------------------------- |
| close  | 关闭时的回调 | ^[Function]`(evt: MouseEvent) => void` |

### Alert Slots

| 插槽名 | 描述     |
| ------ | -------- |
| title  | 标题内容 |
