---
title: 开关
lang: ch-ZH
---

# Switch 开关

## 基础用法

:::demo

switch/basic

:::

## 显示文字

:::demo

switch/text

:::

## 自定义图标

:::demo

switch/custom-icon

:::

## Switch API

### Switch Props

| 属性名               | 描述               | 类型                                     | 默认值  |
| -------------------- | ------------------ | ---------------------------------------- | ------- |
| modelValue / v-model | 绑定值             | `boolean`/ `string`/ `number`            | 绑定值  |
| disabled             | 是否禁用           | `boolean`                                | false   |
| size                 | 尺寸               | ^[enum]`'small' \| 'default' \| 'large'` | default |
| activeText           | 开关激活时的文字   | `string`                                 | ——      |
| inactiveText         | 开关未激活时的文字 | `string`                                 | ——      |

### Switch Emits

| 事件名 | 描述             | 类型                                                   |
| ------ | ---------------- | ------------------------------------------------------ |
| change | 绑定值变化时触发 | ^[Function]`(val: boolean \| string \| number) => val` |

### Switch Slots

| 插槽名        | 描述               |
| ------------- | ------------------ |
| active-icon   | 开关激活时的图标   |
| inactive-icon | 开关未激活时的图标 |
