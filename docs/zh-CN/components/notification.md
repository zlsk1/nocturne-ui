---
title: 通知
lang: ch-ZH
---

# Notification 通知

:::tip

你可以使用 `notification.success` 的方式来调用不同的消息类型，也可以使用 `notification({ type: 'success', content: 'this is a notification' })` 的方式来调用。

:::

## 基础用法

:::demo

notification/basic

:::

## 唤出消息的位置

:::demo

notification/placement

:::

## Notification API

### Notification Props

| 属性名      | 描述             | 类型                                                                  | 默认值        |
| ----------- | ---------------- | --------------------------------------------------------------------- | ------------- |
| type        | 消息的类型       | ^[enum]`'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'`    | 'info'        |
| content     | 消息内容         | `string`、`object`、`Function`                                        | ——            |
| title       | 消息标题         | `string`                                                              | ——            |
| duration    | 消息持续的时间   | `number`                                                              | 3000          |
| placement   | 通知出现的位置   | ^[enum]`'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'` | 'top-right'   |
| offset      | 距离顶部的偏移量 | `number`                                                              | 16            |
| appendTo    | 插入到哪个元素上 | `object`                                                              | document.body |
| onClose     | 消息关闭时的回调 | `Function`                                                            | undefined     |
| id          | 消息的id属性     | `string`                                                              | ——            |
| customClass | 自定义类名       | `string`                                                              | ——            |
| zIndex      | css属性          | `number`                                                              | ——            |
