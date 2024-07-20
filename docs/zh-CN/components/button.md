---
title: 按钮
lang: ch-ZH
---

# Button 按钮

常用化按钮

## 基础用法

:::demo 添加 `type`、`plain`、`round` 和 `circle` 属性设置不同的样式 **deprecated** ^(3.0.0)

button/basic

:::

## 禁用按钮

:::demo 添加 `disabled` 属性将按钮禁用

button/disabled

:::

## 加载按钮

:::demo 添加 `loading` 属性应用loading图标

button/loading

:::

## Button API

### Button 属性

| 属性名                | 描述                   | 类型                                 | 默认值   |
| -------------------- | ---------------------- | ------------------------------------ | ------- |
| size                 | 按钮尺寸                | ^[enum]`'large'\| 'default'\|'small'`| —       |
| type                 | 按钮类型                | ^[enum]`'primary'\| 'success'\| 'warning'\| 'danger'\| 'info'\| 'text'(delete)` | —       |
| plain                | 是否为镂空按钮           | ^[boolean]                           | false   |
| round                | 是否为圆角按钮           | ^[boolean]                           | false   |
| circle               | 是否为圆形按钮           | ^[boolean]                           | false   |
| loading              | 是否添加加载图标         | ^[boolean]                           | false   |
| disabled             | 是否禁用                 | ^[boolean]                           | false   |
| icon              | 要添加的icon组件            | ^[string] / ^[Component]             | —       |
