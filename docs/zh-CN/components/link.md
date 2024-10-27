---
title: 链接
lang: ch-ZH
---

# Link 链接

跳转到指定URL地址

## 基础用法

:::demo 设置 `type`、`underline` 应用不同的样式

link/basic

:::

## 禁用

:::demo 添加 `disabled` 属性禁用链接

link/disabled

:::

## Target

:::demo 通过 `target` 可以触发不同的点击行为

link/target

:::

## 图标链接

:::demo 使链接的跳转目的更加明确

link/icon

:::

## Link API

### Link 属性

| 属性名                | 描述                   |  类型                                | 默认值   |
| -------------------- | ---------------------- | ------------------------------------ | ------- |
| type                 | 链接类型                | ^[enum]`'primary'\| 'success'\| 'warning'\| 'danger'\| 'info'`| —    |
| href                 | 链接地址                | ^[string]                            | —       |
| target               | 链接行为                | ^[string]                            | _self   |
| underline            | 悬浮时是否显示下划线     | ^[boolean]                           | false   |
| disabled             | 禁用链接                | ^[boolean]                           | false   |
| icon                 | 链接的图标              | ^[string] / ^[Compopnent]            | —       |
