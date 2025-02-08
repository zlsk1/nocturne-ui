---
title: 分段控制器
lang: ch-ZH
---

# Segmented 分段控制器

用于展示多个选项并允许用户选择其中单个选项

## 基础用法

你需要提供 `options` 属性来定义用户可选的选项。

:::demo

segmented/basic

:::

## 可禁用

你可以通过 `disabled` 属性来禁用 `Segmented`。你也可以在 `options` 中设置 `disabled` 来禁用某个选项。

:::demo

segmented/disabled

:::

## 尺寸

:::demo

segmented/size

:::

## 垂直模式

添加 `vertical` 属性，组件变为垂直排列。

:::demo

segmented/vertical

:::

## Block 模式

添加 `block` 属性，组件将适应父元素的宽度。

:::demo

segmented/block

:::

## 带图标的分段控制器

:::demo

segmented/icon

:::

## Segmented API

### Segmented Props

| 属性名               | 描述               | 类型                                | 默认值    |
| -------------------- | ------------------ | ----------------------------------- | --------- |
| modelValue / v-model | 当前选中项的值     | `number`/ `string`                  | ——        |
| options              | 配置选项内容的数组 | ^[array]`SegmentedOption[]`         | ——        |
| size                 | 组件尺寸           | ^[enum]`small \| default \| 'large` | ——        |
| disabled             | 是否禁用           | `boolean`                           | false     |
| block                | 适应父元素的宽度   | `boolean`                           | false     |
| vertical             | 组件是否为垂直排列 | `boolean`                           | false     |
| ariaLabel            | 无障碍属性         | `string`                            | segmented |

### Segmented Emits

| 事件名 | 描述             | 类型                                             |
| ------ | ---------------- | ------------------------------------------------ |
| change | 选中项改变时触发 | ^[Function]`(value => string \| number) => void` |
