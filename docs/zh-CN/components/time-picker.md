---
title: 时间选择器
lang: ch-ZH
---

# Time Picker 时间选择器

选择或输入一天中某个时间的控件

## 基础用法

:::demo

time-picker/basic

:::

## 三种尺寸

:::demo 时间选择器提供 `large`、`default` 和 `small` 三种尺寸

time-picker/size

:::

## 间隔

:::demo 可选时间的间隔，默认都为1

time-picker/step

:::

## 禁用部分时间

:::demo 通过函数的方式返回可选的时间

time-picker/disabled

:::

## 自定义后缀图标

:::demo

time-picker/custom-ssuffix

:::

## Time Picker API

### Time Picker Props

| 属性名          | 描述                 | 类型                                                                   | 默认值     |
| --------------- | -------------------- | ---------------------------------------------------------------------- | ---------- |
| modelValue      | 绑定值               | `Dayjs`、`string`                                                      | ——         |
| placeholder     | 占位符               | `string`                                                               | ——         |
| tabindex        | tabindex             | `string`、`number`                                                     | ——         |
| id              | id                   | `string`                                                               | ——         |
| name            | 是否开启过渡效果     | `string`                                                               | ——         |
| readonly        | 只读                 | `boolean`                                                              | false      |
| suffixIcon      | 后缀图标             | `string`、`Component`                                                  | ——         |
| clearIcon       | 清除图标             | `string`、`Component`                                                  | ——         |
| disabled        | 禁用                 | `boolean`                                                              | false      |
| popperClass     | 禁用                 | `string`                                                               | ——         |
| size            | 组件的尺寸           | ^[enum]`'small' \| 'default' \| 'large'`                               | ''         |
| hourStep        | 小时间隔             | `number`                                                               | 1          |
| minuteStep      | 分钟间隔             | `number`                                                               | 1          |
| secondStep      | 秒间隔               | `number`                                                               | 1          |
| disabledHours   | 禁用的小时数         | ^[GetDisabledHour]`() => number[]`                                     | ——         |
| disabledMinutes | 禁用的分钟数         | ^[GetDisabledMinute]`(hour: number) => number[]`                       | ——         |
| disabledSeconds | 禁用的秒数           | ^[GetDisabledSecond]`(hour: number, minute: number) => number[]`       | ——         |
| popperOptions   | `popper.js` 的配置项 | `object` 参考[popper.js](https://popper.js.org/docs/v2/)文档           | () => ({}) |
| format          | 格式                 | `string` 参考[dayjs](https://day.js.org/docs/zh-CN/display/format)文档 | HH:mm:ss   |
| defaultValue    | 默认值               | `Dayjs`                                                                | ——         |

### Time Picker Emits

| 事件名         | 描述                    | 类型                                        |
| -------------- | ----------------------- | ------------------------------------------- |
| change         | 绑定值发生变化时        | ^[Function]`(val: Dayjs \| string) => void` |
| visible-change | popper展开时/收起时触发 | ^[Function]`(visible: boolean) => void`     |
| focus          | 聚焦时触发              | ^[Function]`(e: FocusEvent) => void`        |
| blur           | 失焦时触发              | ^[Function]`(e: FocusEvent) => void`        |
