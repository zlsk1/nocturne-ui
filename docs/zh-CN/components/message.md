---
title: 消息
lang: ch-ZH
---

# Message 消息

展示用户操作后反馈的信息

## 基本用法

:::demo

message/basic

:::

## 多种消息类型

:::tip

你可以使用 `message.success` 的方式来调用不同的消息类型，也可以使用 `message({ type: 'success', content: 'this is a message' })` 的方式来调用。

:::

:::demo

message/type

:::

## 重复的次数

:::demo

message/repeat-num

:::

## 归为同一组别

:::demo

message/grouping

:::

## 可以手动关闭的消息

:::tip

当 `duration` 设为0后，代表这条消息永远不会自动关闭

:::

:::demo

message/show-close

:::

## Message API

### Message Props

| 属性名      | 描述               | 类型                                                               | 默认值        |
| ----------- | ------------------ | ------------------------------------------------------------------ | ------------- |
| type        | 消息的类型         | ^[enum]`'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | 'info'        |
| message     | 消息内容           | `string`、`object`、`Function`                                     | ——            |
| duration    | 消息持续的时间     | ^[number]                                                          | 3000          |
| showClose   | 是否显示关闭按钮   | `boolean`                                                          | false         |
| offset      | 距离顶部的偏移量   | `number`                                                           | 16            |
| appendTo    | 插入到哪个元素上   | `object`                                                           | document.body |
| onClose     | 消息关闭时的回调   | `Function`                                                         | undefined     |
| id          | 消息的id属性       | `string`                                                           | ——            |
| grouping    | 是否归为同一组展示 | `boolean`                                                          | false         |
| repeatNum   | 重复的次数         | `string`                                                           | 1             |
| customClass | 自定义类名         | `string`                                                           | ——            |
| zIndex      | css属性            | `number`                                                           | ——            |
