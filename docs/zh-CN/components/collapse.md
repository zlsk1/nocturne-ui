---
title: 折叠面板
lang: ch-ZH
---

# Collapse 折叠面板

## 基础用法

:::demo

collapse/basic

:::

## 手风琴模式

:::demo

collapse/accordion

:::

## Collapse API

### Collapse Props

| 属性名    | 描述                | 类型               | 默认值 |
| --------- | ------------------- | ------------------ | ------ |
| value     | 当前激活面板的 name | `string`/ `number` | -      |
| accordion | 是否手风琴模式      | `boolean`          | false  |

### Collapse Emits

| 事件名 | 描述             | 类型                                        |
| ------ | ---------------- | ------------------------------------------- |
| change | 切换当前活动面板 | ^[Function]`(val: string \| number) => val` |

## CollapseItem API

### CollapseItem Props

| 属性名   | 描述     | 类型               | 默认值 |
| -------- | -------- | ------------------ | ------ |
| title    | 标题     | `string`           | ——     |
| name     | 标识     | `string`/ `number` | ——     |
| disabled | 是否禁用 | `boolean`          | false  |
