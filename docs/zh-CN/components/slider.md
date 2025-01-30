---
title: 滑动输入器
lang: ch-ZH
---

# Slider 滑动输入器

## 基础用法

:::demo

slider/basic

:::

## 步长

:::demo

slider/step

:::

## Slider API

### Slider Props

| 属性名                | 描述     | 类型      | 默认值 |
| --------------------- | -------- | --------- | ------ |
| modeleValue / v-model | 绑定值   | `number`  | ——     |
| step                  | 步长     | `number`  | 1      |
| disabled              | 是否禁用 | `boolean` | false  |
| min                   | 最小值   | `number`  | 0      |
| max                   | 最大值   | `number`  | 100    |

### Slider Emits

| 属性名 | 描述   | 类型                              |
| ------ | ------ | --------------------------------- |
| change | 绑定值 | ^[Function]`(val: number) => val` |
