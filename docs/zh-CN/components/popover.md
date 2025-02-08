---
title: 气泡卡片
lang: ch-ZH
---

# Popover 气泡卡片

相比于 `tooltip` 组件，`popover` 组件可以承载更多复杂的内容。

:::tip

`popover` 组件是在 `tooltip` 上进行开发的，因而在此不做太多的赘述。

:::

## 基础用法

:::demo

popover/basic

:::

## Popover API

### Popover Props

| 参数名        | 描述                 | 类型                                    | 默认值 |
| ------------- | -------------------- | --------------------------------------- | ------ |
| title         | 标题                 | `string`                                | ——     |
| width         | 组件的宽度           | `string`/ `number`                      | 160px  |
| updateVisible | 显隐切换时的回调函数 | ^[Function]`(visible: boolean) => void` | ——     |

### Popover Slots

| 插槽名    | 描述             | 参数 |
| --------- | ---------------- | ---- |
| default   | 弹出层的内容     | ——   |
| reference | 弹出层的触发内容 | ——   |

### Popover Emits

| 事件名         | 描述           | 类型                                    |
| -------------- | -------------- | --------------------------------------- |
| update:visible | 显隐切换时触发 | ^[Function]`(visible: boolean) => void` |
| after-enter    | 显示后触发     | ^[Function]`() => void`                 |
| after-leave    | 消失后触发     | ^[Function]`() => void`                 |
| before-enter   | 显示前触发     | ^[Function]`() => void`                 |
| before-leave   | 消失前触发     | ^[Function]`() => void`                 |
