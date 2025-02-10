---
title: 表单
lang: ch-ZH
---

# Form 表单

## 基础用法

:::demo

form/basic

:::

## 表单布局

表单有三种布局，通过 `labelPosition` 属性来配置。

:::demo

form/position

:::

## 表单尺寸

::: demo

form/size

:::

## 表单验证

Form 组件提供了表单验证的功能，只需要通过 `rules` 属性传入约定的验证规则，并将 FormItem 的 `prop` 属性设置为需校验的字段名即可。校验规则参见 [async-validator](https://github.com/yiminghe/async-validator)

:::demo

form/validation

:::

## 行内表单

:::demo

form/inline

:::

## Form API

### Form Props

| 属性名        | 描述             | 类型                                     | 默认值 |
| ------------- | ---------------- | ---------------------------------------- | ------ |
| model         | 表单数据         | ^[FormData]`Record<string, any>`         | ——     |
| rules         | 表单校验对象     | `object`                                 | ——     |
| labelPosition | 标签的对齐方式   | ^[enum]`'right' \| 'left' \| 'top'`      | left   |
| disabled      | 是否禁用表单     | `boolean`                                | false  |
| size          | 表单尺寸         | ^[enum]`'small' \| 'default' \| 'large'` | left   |
| requiredMark  | 是否显示必填星号 | `boolean`                                | false  |
| inline        | 行内表单         | `boolean`                                | false  |

### Form Emits

| 事件名   | 描述             | 类型                                                                   |
| -------- | ---------------- | ---------------------------------------------------------------------- |
| validate | 表单提交时的回调 | ^[Function]`(prop: string, isValid: boolean, message: string) => void` |

### Form Slots

| 插槽名  | 描述     |
| ------- | -------- |
| default | 表单内容 |

### Form Exposes

| 方法名        | 描述                                 | 类型                                                                                                                      |
| ------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| validate      | 表单验证方法                         | ^[FormValidate]`(callback: FormValidateCallback \| undefined): Promise<boolean>`                                          |
| resetField    | 重置表单数据，并且清除校验结果的方法 | ^[Function]`(): void`                                                                                                     |
| clearValidate | 清除校验结果的方法                   | ^[FormClearValidate]`(props?: FormItemProp) => void`                                                                      |
| validateField | 清除单个表单项的验证结果的方法       | ^[FormValidateField]`(props: FormItemProp \| undefined, callback: FormValidateCallback \| undefined) => Promise<boolean>` |
| scrollToField | 滚动到某个表单项的方法               | ^[FormScrollToField]`(prop: string, options: ScrollOptions) => void`                                                      |

## FormItem API

### FormItem Props

| 属性名        | 描述                     | 类型                                     | 默认值 |
| ------------- | ------------------------ | ---------------------------------------- | ------ |
| label         | 标签文本                 | `string`                                 | ——     |
| labelPosition | 标签的对齐方式           | ^[enum]`'right' \| 'left' \| 'top'`      | left   |
| rule          | 标签的对齐方式           | `object`                                 | ——     |
| prop          | 作为表单验证时的匹配字段 | `string`                                 | ——     |
| labelWidth    | 标签宽度                 | `string`/ `number`                       | ——     |
| disabled      | 是否禁用表单             | `boolean`                                | false  |
| size          | 表单尺寸                 | ^[enum]`'small' \| 'default' \| 'large'` | left   |

### FormItem Slots

| 插槽名  | 描述       |
| ------- | ---------- |
| default | 表单项内容 |

### FormItem Exposes

| 方法名        | 描述                                   | 类型                                                                              |
| ------------- | -------------------------------------- | --------------------------------------------------------------------------------- |
| validate      | 表单项验证方法                         | ^[Function]`(trigger: string, callback?: FormValidateCallback): Promise<boolean>` |
| resetField    | 重置表单项数据，并且清除校验结果的方法 | ^[Function]`(): void`                                                             |
| clearValidate | 清除校验结果的方法                     | ^[Function]`() => void`                                                           |
