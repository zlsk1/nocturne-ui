---
title: 输入框
lang: ch-ZH
---

# Input 输入框

字符输入控件

:::warning

不支持 `v-model` 修饰符

:::

## 基础用法

:::demo 你可以添加 `disabled` 属性来禁用input，使其无法进行输入。

input/basic

:::

## 尺寸

:::demo 提供三种尺寸的输入框，`small`、`default` 和 `large`，通过设置 `size` 来配置它们，默认为 `default`。

input/size

:::

## 可清除的输入框

:::demo 添加 `clearable` 属性即可。

input/clearable

:::

## 密码输入框

:::demo 将 `type` 属性设置为 `password` 并添加 `showPassword` 属性即可。

input/password

:::

## 变体

:::demo 提供三种变体的输入框，`outlined`、`borderless` 和 `filled`，通过 `variant` 来配置它们，默认为 `outlined`。

input/variant

:::

## Input API

### Input Props

| 属性名               | 描述                                             | 类型         | 默认值 |
| -------------------- | ------------------------------------------------| ----------- | -------|
| type                 | 输入框类型                                       | ^[enum]`'text' \| 'area' \| 'textarea' \| 'radio' \| 'checkbox' \| 'file' ...`等[原生类型](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#input_%E7%B1%BB%E5%9E%8B) | text   |
| size                 | 输入框的尺寸，仅在 `type` 不为"textraea"时有效    | ^[enum]`'large' \| 'default' \| 'small'`  | ——     |
| v-model / modelValue | 输入框的尺寸，仅在 `type` 不为"textraea"时有效    | ^[string]/ ^[number]  | ——     |
| placeholder          | 提示符                                          | ^[string]  | ——        |
| disabled             | 是否禁用                                         | ^[boolean]  | false    |
| showPassword         | 是否显示密码                                      | ^[boolean]  | false    |
| clearable            | 输入框的值是否可以被清除                            | ^[boolean]  | false    |
| readonly             | 是否为只读输入框                                   | ^[boolean]  | false    |
| tabindex             | 输入框的tabindex                                  | ^[string]/ ^[number]  | false    |
| maxLength            | 最大输入长度，同原生 `maxlength` 属性                | ^[string]/ ^[number]  | ——    |
| minLength            | 最小输入长度，同原生 `maxlength` 属性                | ^[string]/ ^[number]  | ——    |
| max                  | 最大值，同原生 `max` 属性                           | ——                    | ——    |
| min                  | 最小值，同原生 `min` 属性                           | ——                    | ——    |
| suffixIcon           | 前缀图标                                          | ^[string]/ ^[Component] | ——    |
| prefixIcon           | 后缀图标                                          | ^[string]/ ^[Component] | ——    |
| showLimit            | 是否显示字数，只在 `type` 为"text"和"textarea"时有效 | ^[boolean]          | false    |
| autoFocus            | 是否自动聚焦                                      | ^[boolean]          | false    |
| rows                 | 字符行数，用原生 `rows` 属性                        | ^[number]          | ——    |
| noResize             | 不改变textarea的高度                               | ^[boolean]         | false    |
| afterBlur            | 输入框失焦后的回调                                  | ^[Function]         | ——    |
| autoResize           | 自动适应高度，仅在 `type` 为"textarea"时有效          | ^[boolean]         | false    |
| variant              | 样式变体                                           | ^[enum]`'outlined' \| 'borderless' \| 'filled'` | outlined    |

### Input Emits

| 事件名                   | 描述                  | 类型                                            |
| ----------------------- | -------------------- | ----------------------------------------------- |
| input                   | 输入时触发             | ^[Function]`(val: string) => val`              |
| change                  | 输入框的值发生变化时触发 | ^[Function]`(val: string) => val`              |
| clearValue              | 清除输入框的值时触发     | ^[Function]`() => void`                        |
| focus                   | 输入框聚焦时触发        | ^[Function]`(e: FocusEvent) => void`           |
| blur                    | 输入框失焦时触发        | ^[Function]`(e: FocusEvent) => void`           |
| compositionstart        | 合成开始时触发          | ^[Function]`(e: CompositionEvent) => void`     |
| compositionupdate       | 合成中字符被输入时触发    | ^[Function]`(e: CompositionEvent) => void`    |
| compositionend          | 合成完成或取消时触发     | ^[Function]`(e: CompositionEvent) => void`     |

### Input Slots

| 插槽名                   | 描述                  |
| ----------------------- | -------------------- |
| suffix                  | 输入框前缀内容          |
| prefix                  | 输入框后缀内容          |

### Input Exposes

| 属性名        | 描述               | 类型                                     |
| ------------ | ----------------- | ---------------------------------------- |
| inputRef     | input 元素         | ^[object]`Ref<HTMLInputElement>`         |
| isFocused    | 输入框聚焦状态       | ^[boolean]                               |
| focus        | 输入框聚焦方法       | ^[Function]`(e: FocusEvent) => void`     |
| blur         | 输入框失焦方法       | ^[Function]`(e: FocusEvent) => void`     |
| clearValue   | 输入框清除值的方法   | ^[Function]`() => void`                   |
