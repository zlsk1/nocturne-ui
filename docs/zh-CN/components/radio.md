---
title: 单选框
lang: ch-ZH
---

# Radio 单选框

在一组备选项中进行单选

## 基本用法

:::demo

radio/basic

:::

## 禁用

:::demo 将 `disabled` 属性设置为 true，单选框将无法进行选择。

radio/disabled

:::

## 单选框组

:::demo 一组互斥的 `radio`。

radio/group

:::

## 按钮样式的单选框组

:::demo <radio-button> 按钮样式的 `radio` 组。

radio/radio-button

:::

## 填充样式的按钮单选框组

:::demo

radio/radio-button-solid

:::

## Radio API

### Radio Props

| 属性名                | 描述                                         | 类型 | 默认值 |
| -------------------- | --------------------------------------------| --- | --- |
| modelValue / v-model | 选中项绑定值                                  | `string`/ `number`/ `boolean` | —— |
| value                | 单选框的值    | `string`/ `number`/ `boolean` | —— |
| size                 | 单选框的尺寸     | ^[enum]`'small' \| 'default' \| 'large'`  | —— |
| disabled             | 是否禁用单选框 | `boolean`                                | false |
| label                | 单选框的 label 如果 `value` 没有值， `label`则作为`value`使用 | `string` | —— |

### Radio Emits

| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| change | 绑定值变化时触发的事件 | ^[Function]`(val: string \| number \| boolean) => val` |

### Radio Slots

| 插槽名   | 说明          |
| ------- | ------------ |
| default | 自定义默认内容 |

## RadioGroup API

### RadioGroup Props

| 属性名                | 描述                                         | 类型 | 默认值 |
| -------------------- | --------------------------------------------| --- | --- |
| modelValue / v-model | 绑定值                                       | `string`/ `number`/ `boolean` | —— |
| size                 | 控制单选框的尺寸     | ^[enum]`'small' \| 'default' \| 'large'`  | —— |
| disabled             | 是否禁用单选框组 | `boolean`                                | false |
| buttonType           | radio-button的类型 | ^[enum]`'default' \| 'solid'` | —— |

### RadioGroup Emits

| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| change | 绑定值变化时触发的事件 | ^[Function]`(val: string \| number \| boolean) => val` |

### RadioGroup Slots

| 插槽名   | 说明          |
| ------- | ------------ |
| default | 自定义默认内容 |

## RadioButton API

### RadioButton Props

| 属性名                | 描述                                         | 类型 | 默认值 |
| -------------------- | --------------------------------------------| --- | --- |
| modelValue / v-model | 选中项绑定值                                  | `string`/ `number`/ `boolean` | —— |
| value                | 单选框的值    | `string`/ `number`/ `boolean` | —— |
| size                 | 单选框的尺寸     | ^[enum]`'small' \| 'default' \| 'large'`  | —— |
| disabled             | 是否禁用单选框 | `boolean`                                | false |
| label                | 单选框的 label 如果 `value` 没有值， `label`则作为`value`使用 | `string` | —— |

### RadioButton Emits

| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| change | 绑定值变化时触发的事件 | ^[Function]`(val: string \| number \| boolean) => val` |

### RadioButton Slots

| 插槽名   | 说明          |
| ------- | ------------ |
| default | 自定义默认内容 |
