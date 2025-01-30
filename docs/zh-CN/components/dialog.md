---
title: 模态框
lang: ch-ZH
---

# Dialog 模态框

## 基础用法

:::demo

dialog/basic

:::

## Dialog API

### Dialog Props

| 属性                 | 描述                        | 类型                                             | 默认值        |
| -------------------- | --------------------------- | ------------------------------------------------ | ------------- |
| modelValue / v-model | 控制 `dialog` 的显隐状态    | `boolean`                                        | false         |
| title                | 标题                        | `string`                                         | ——            |
| content              | 内容                        | `string`                                         | ——            |
| confirmText          | 取消按钮的文字              | `string`                                         | 确定          |
| cancelText           | 确认按钮的文字              | `string`                                         | 取消          |
| showConfirm          | 是否显示确认按钮            | `boolean`                                        | true          |
| showCancel           | 是否显示取消按钮            | `boolean`                                        | true          |
| width                | 宽度                        | `string`/ `number`                               | ——            |
| offsetTop            | `dialog` 离上的距离         | `string`/ `number`                               | 16vh          |
| callback             | `dialog` 关闭时的回调函数   | ^[Function]`(action: confirm \| cancle) => void` | ——            |
| beforeClose          | `dialog` 关闭前的回调函数   | ^[Function]`(success: () => void) => void`       | ——            |
| clickMaskerToClose   | 点击遮罩层是否关闭 `dialog` | `boolean`                                        | `true`        |
| showClose            | 是否显示关闭按钮            | `boolean`                                        | `true`        |
| closeIcon            | 自定义关闭图标              | `icon`/ `Component`                              | ——            |
| center               | 是否居中显示内容            | `boolean`                                        | false         |
| transition           | 过渡效果                    | `string`                                         | n-dialog-fade |
| maskerClass          | 遮罩层自定义类名            | `string`                                         | ""            |
| masker               | 是否需要遮罩层              | `boolean`                                        | true          |
| customClass          | 自定义类名                  | `string`                                         | ""            |

### Dialog Emits

| 事件名 | 描述                | 类型                    |
| ------ | ------------------- | ----------------------- |
| close  | `dialog` 关闭时触发 | ^[Function]`() => void` |
| open   | `dialog` 打开时触发 | ^[Function]`() => void` |

### Dialog Slots

| 插槽名 | 描述                |
| ------ | ------------------- |
| header | `dialog` 的头部内容 |
| footer | `dialog` 的底部内容 |
