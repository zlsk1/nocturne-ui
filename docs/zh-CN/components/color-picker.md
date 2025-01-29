---
title: 颜色选择器
lang: ch-ZH
---

# Color Picker 颜色选择器

方便用户选取颜色，主要用于一些设计站点

## 基础用法

:::demo 定义 `v-model` 绑定变量，设置size属性控制 `n-color-picker` 大小

color-picker/basic

:::

## 透明度

:::demo 添加 `showAlpha` 属性启用透明度控制条

color-picker/alpha

:::

## 预设

:::demo 定义 `predefine` 绑定预设颜色，为用户提供选择

color-picker/preset

:::

## 显示文字

:::demo 显示已选颜色的值

color-picker/show-text

:::

## Color Picker API

### Color Picker Props

| 属性名                | 描述                   | 类型                                 | 默认值   |
| -------------------- | ---------------------- | ------------------------------------ | ------- |
| modelValue / v-model | color-picker的值        | ^[string]                           | —       |
| id                   | 原生id属性              | ^[string]                            | —       |
| showAlpha            | 是否显示alpha控制条      | ^[boolean]                          | false   |
| colorFormat          | 颜色格式                | ^[enum]`'hsl' \| 'hsv' \| 'hex' \|'rgb'`| —       |
| disabled             | 是否禁用                | ^[boolean]                           | false  |
| size                 | 尺寸                   | ^[enum]`'large' \| 'default' \| 'small'` | false   |
| popperClass          | 下拉框的类名             | ^[string]                            |  —      |
| label                | 原生label属性           | ^[string]                            | false   |
| tabindex             | 原生tabindex属性        | ^[string]/ ^[number]                | 0       |
| teleported           | 是否插入到body下         | ^[boolean]                           | true    |
| predefine            | 预设颜色组               | ^[object]`string[]`                  | []     |
| validateEvent        | 是否触发表单验证          | ^[boolean]                           | true   |
| showText             | 是否显示文字             | ^[boolean]                            | false  |

### Color Picker Emits

| 属性名                | 描述                      | 类型                                  |
| -------------------- | ------------------------- | ------------------------------------|
| change               | color-picker的值变化时触发  | ^[Function]`(val: string \| null) => voiid` |
| activeChange         | 面板中当前显示的颜色发生改变时触发 | ^[Function]`(val: string \| null) => voiid` |
| focus                | 获取焦点时触发              | ^[Function]`(e: FocusEvent) => void` |
| blur                 | 失去焦点时触发              | ^[Function]`(e: FocusEvent) => void` |

### Color Picker Exposes

| 属性名                | 描述                      | 类型                                  |
| -------------------- | ------------------------- | ------------------------------------|
| color                | 当前色彩对象                | ^[object]`Color`                     |
| show                 | 手动显示color-picker       | ^[Function]`() => void`              |
| hide                 | 手动隐藏color-picker        | ^[Function]`() => void`             |
| focus                | 使color-picker获得焦点    | ^[Function]`() => void`             |
| blur                 | 使color-picker失去焦点    | ^[Function]`() => void`             |
