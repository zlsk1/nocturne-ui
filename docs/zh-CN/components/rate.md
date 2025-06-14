---
title: 评分
lang: ch-ZH
---

# Rate 评分

## 基础用法

:::demo

rate/basic

:::

## 支持半选

:::demo

rate/allow-half

:::

## 自定义字符

:::demo

rate/character

:::

## Rate API

### Rate Props

| 属性名               | 描述             | 类型                   | 默认值 |
| -------------------- | ---------------- | ---------------------- | ------ |
| modelValue / v-model | 当前选中项的值   | `number`               | ——     |
| character            | 自定义字符       | `string` / `Component` | ——     |
| readonly             | 是否只读         | `boolean`              | false  |
| allowHalf            | 是否允许半选     | `boolean`              | false  |
| allowClear           | 是否允许取消选择 | `boolean`              | true   |
| count                | 选项的数量       | `number`               | 5      |
| disabled             | 是否禁用         | `boolean`              | false  |

### Rate Emits

| 事件名      | 描述                 | 类型                                                |
| ----------- | -------------------- | --------------------------------------------------- |
| change      | 选中项改变时触发     | ^[Function]`(value => number) => void`              |
| hoverChange | 鼠标悬浮在选项时触发 | ^[Function]`(value => number \| undefined) => void` |
| keydown     | 键盘事件             | ^[Function]`(event => KeyboardEvent) => void`       |
