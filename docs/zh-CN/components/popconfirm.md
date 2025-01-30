---
title: 气泡确认框
lang: ch-ZH
---

# Popconfirm 气泡确认框

## 基础用法

:::demo

popconfirm/basic

:::

## 自定义图标

:::demo

popconfirm/icon

:::

## Popconfirm API

### Popconfirm Props

| 属性名      | 描述             | 类型                  | 默认值         |
| ----------- | ---------------- | --------------------- | -------------- |
| title       | 气泡确认框的标题 | `string`              | ——             |
| confirmText | 确认按钮的文字   | `string`              | ——             |
| cancelText  | 取消按钮的文字   | `string`              | ——             |
| showIcon    | 是否显示图标     | `boolean`             | true           |
| icon        | 自定义图标       | `string`/ `Component` | RiQuestionFill |

### Popconfirm Emits

| 事件名  | 描述               | 参数                    |
| ------- | ------------------ | ----------------------- |
| confirm | 按下确认按钮时触发 | ^[Function]`() => void` |
| cancle  | 按下取消按钮时触发 | ^[Function]`() => void` |

### Popconfirm Slots

| 插槽名  | 描述     | 参数 |
| ------- | -------- | ---- |
| default | 触发元素 | ——   |
| icon    | 自定图标 | ——   |
