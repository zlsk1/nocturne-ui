---
title: 数字输入框
lang: ch-ZH
---

# Input Number 数字输入框

通过鼠标或键盘，输入允许范围内的数值。

## 基础用法

:::demo 以下示例展示了 `size`、`disabled`、`controls` 和 `readonly` 属性的使用。

input-number/basic

:::

## 步进

:::demo 通过 `step` 属性控制每次改变的值的大小

input-number/step

:::

## 最大值和最小值

:::demo 通过 `min` 和 `max` 属性来限制数字输入框的最大值和最小值

input-number/max

:::

## 精度

:::demo 使用 `precision` 可以控制数字输入框的精度，接收一个数字

input-number/precision

:::

## Input Number API

### Input Number Props

| 属性名                 | 描述                    | 类型                                        | 默认值       |
| --------------------- | ---------------------- | ------------------------------------------- | ----------- |
| model-value / v-model | 绑定值                  | ^[number]                                   | ——          |
| size                  | 输入框尺寸               | ^[enum]`'small' \| 'default' \| 'large'`    | default     |
| disabled              | 是否禁用                | ^[boolean]                                   | false |
| controls              | 是否显示控制按钮         | ^[boolean]                                   | true |
| readonly              | 是否为只读状态           | ^[boolean]                                  | false |
| min                   | 最小值                  | ^[number]                                   | -Infinity |
| max                   | 最大值                  | ^[number]                                   | Infinity |
| step                  | 步长                    | ^[number]                                   | 1 |
| precision             | 精度                    | ^[number]                                   | - |
| placeholder           | 占位符                  | ^[string]                                    | - |

### Input Number Emits

| 事件名    | 描述               | 类型                                       |
| -------- | ----------------- | ------------------------------------------ |
| change   | 绑定的值改变时触发   | ^[Function]`(val: Number) => val`          |
| blur     | 失去焦点时触发      | ^[Function]`(event: FocusEvent) => void`   |
| focus    | 获得焦点时触发      | ^[Function]`(event: FocusEvent) => void`   |
