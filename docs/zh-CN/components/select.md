---
title: 选择器
lang: ch-ZH
---

# Select 选择器

提供一组选项供用户选择，当选项较少时使用 `radio` 组件应该是更好的选择

## 基础用法

:::demo

select/basic

:::

## 禁用

:::demo

select/disabled

:::

## 多选

:::demo

select/multiple

:::

## Select API

### Select Props

| 属性名                 | 描述                                               | 类型                                                               | 默认值   |
| ---------------------- | -------------------------------------------------- | ------------------------------------------------------------------ | -------- |
| modelValue / v-model   | 绑定值                                             | `string`/ `number`/ `boolean`/ `object`/ `array`                   | ——       |
| placeholder            | 占位符                                             | `string`                                                           | ——       |
| disabled               | 是否禁用                                           | `boolean`                                                          | false    |
| size                   | 组件尺寸                                           | `string`                                                           | ——       |
| clearValue             | 选中值是否可以被清除                               | `boolean`                                                          | false    |
| multiple               | 是否多选                                           | `boolean`                                                          | false    |
| valueKey               | 当option的value为对象时 做为判定对象是否相等的键名 | `string`                                                           | ——       |
| persistent             | 持久显示popper                                     | `boolean`                                                          | true     |
| popperClass            | popper的class                                      | `string`                                                           | ——       |
| popperOption           | `popper.js` 的配置项                               | `object` 参考[popper.js](https://popper.js.org/docs/v2/)文档       | ——       |
| placement              | popper出现的方向                                   | ^[eum]`'bottom' \|  'top' \| 'left' \| 'right'`                    | 'bottom' |
| tagType                | 标签类型                                           | ^[eum]`'primary' \|  'success' \| 'warning' \| 'info' \| 'danger'` | 'info'   |
| height                 | 组件高度                                           | `number`                                                           | 288      |
| showSearch             | 是否可搜索                                         | `boolean`                                                          | false    |
| filterOption           | 是否筛选选项 接收一个布尔值或自定义函数            | `string` / ^[Function]`SelectFilterMethod`                         | true     |
| maxTagCount            | 最大tag数量                                        | `number`                                                           | ——       |
| maxTagCountWithTooltip | 超过最大tag数量后显示tooltip                       | `boolean`                                                          | false    |
| showArrow              | 是否显示popper的箭头                               | `boolean`                                                          | true     |
| loading                | 是否显示loading                                    | `boolean`                                                          | false    |
| showSuffix             | 是否显示后缀                                       | `boolean`                                                          | true     |

### Select Emits

| 属性名 | 描述                           | 类型                                    |
| ------ | ------------------------------ | --------------------------------------- |
| select | 选择后触发的事件               | ^[Function]`(val: SelectValue) => void` |
| change | select所绑定的值发生变化时触发 | ^[Function]`(val: SelectValue) => void` |
| search | 搜索时触发                     | ^[Function]`(query: string) => query`   |
| focus  | select聚焦时触发               | ^[Function]`(e: FocusEvent) => void`    |
| blur   | select失焦时触发               | ^[Function]`(e: FocusEvent) => void`    |

### Select Slots

| 插槽名 | 描述           |
| ------ | -------------- |
| suffix | select前缀内容 |
| prefix | select后缀内容 |
