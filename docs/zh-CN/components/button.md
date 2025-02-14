---
title: 按钮
lang: ch-ZH
---

# Button 按钮

常用化按钮

## 基础用法

:::demo 设置 `type`、`plain`、`circle`、`round` 和 `text` 展现不同的样式

button/basic

:::

## 禁用按钮

:::demo 添加 `disabled` 属性将按钮禁用

button/disabled

:::

## 加载按钮

:::demo 添加 `loading` 属性应用loading图标，也可以通过 `loadingicon` 传入自定义图标

button/loading

:::

## 自定义图标

:::demo 添加 `icon` 属性为按钮添加图标，也可以通过默认插槽的方式

button/icon

:::

## 尺寸

:::demo 提供 `small`、`medium` 和 `large` 三种尺寸

button/size

:::

## 按钮组

:::demo 添加 `icon` 属性为按钮添加图标，也可以通过默认插槽的方式

button/button-group

:::

## Button API

### Button Props

| 属性名                | 描述                   | 类型                                 | 默认值   |
| -------------------- | ---------------------- | ------------------------------------ | ------- |
| size                 | 按钮尺寸                | ^[enum]`'large' \| 'default' \| 'small'`| —       |
| type                 | 按钮类型                | ^[enum]`'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'text'`| — |
| plain                | 是否为镂空按钮           | ^[boolean]                           | false   |
| round                | 是否为圆角按钮           | ^[boolean]                           | false   |
| circle               | 是否为圆形按钮           | ^[boolean]                           | false   |
| loading              | 是否添加加载图标         | ^[boolean]                           | false   |
| loadingIcon          | 自定义加载图标           | ^[string]/ ^[Component]             |  —      |
| disabled             | 是否禁用                 | ^[boolean]                           | false   |
| icon              | 要添加的icon组件            | ^[string]/ ^[Component]             | —       |
| text              | 是否为文字按钮           | ^[boolean]                               | —       |

### Button Slots

| 插槽名  | 描述              |
| ------ | ----------------- |
| default| 默认插槽           |

## ButtonGroup API

### ButtonGroup Slots

| 插槽名  | 描述              |
| ------ | ----------------- |
| default| 默认插槽           |
