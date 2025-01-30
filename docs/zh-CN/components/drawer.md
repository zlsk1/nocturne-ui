---
title: 抽屉
lang: ch-ZH
---

# Drawer 抽屉

## 基础用法

:::demo

drawer/basic

:::

## Drawer API

### Drawer Props

| 属性名               | 描述                   | 类型                                            | 默认值 |
| -------------------- | ---------------------- | ----------------------------------------------- | ------ |
| modelValue / v-model | 控制显隐               | `boolean`                                       | ——     |
| placement            | 显示的位置             | ^[enum]`'right' \| 'left' \| 'top' \| 'bottom'` | right  |
| size                 | 抽屉的尺寸             | `string`/ `number`                              | ——     |
| maskerClass          | 遮罩层的自定义类名     | `string`                                        | ——     |
| masker               | 是否需要遮罩层         | `boolean`                                       | true   |
| clickMaskerToClose   | 点击遮罩层是否关闭抽屉 | `boolean`                                       | true   |
| beforeClose          | 抽屉关闭前的回调函数   | ^[Function]`(success: () => void) => void`      | ——     |
| zIndex               | 抽屉的zIndex           | `number`/ `string`                              | ——     |
| showClose            | 是否显示关闭按钮       | `boolean`                                       | true   |

### Drawer Emits

| 事件名 | 描述           | 类型                    |
| ------ | -------------- | ----------------------- |
| close  | 抽屉关闭时触发 | ^[Function]`() => void` |
| open   | 抽屉打开时触发 | ^[Function]`() => void` |

### Dialog Slots

| 插槽名  | 描述           |
| ------- | -------------- |
| header  | 抽屉的头部内容 |
| footer  | 抽屉的底部内容 |
| content | 抽屉的核心内容 |
