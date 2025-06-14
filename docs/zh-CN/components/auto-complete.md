---
title: 自动完成
lang: ch-ZH
---

# Auto Complete 自动完成

辅助输入

## 基础使用

:::demo

auto-complete/basic

:::

## Auto Complete API

### Auto Complete Props

| 属性名                   | 描述                 | 类型                                     | 默认值   |
| ------------------------ | -------------------- | ---------------------------------------- | -------- |
| modelValue / v-model     | 绑定值               | `string`、`number`                       | —        |
| placeholder              | 占位符               | `string`                                 | —        |
| options                  | 提示选项             | ^[object]`AutoCompleteOptionType[]`      |
| disabled                 | 是否禁用             | ^[boolean]                               | false    |
| clearable                | 是否可清除           | ^[boolean]                               | false    |
| showArrow                | 是否显示popper的箭头 | ^[boolean]                               | false    |
| popperClass              | 自定义popper类名     | ^[string]/ ^[object]`ClassType`          | —        |
| popperStyle              | 自定义popper样式     | ^[object]`CSSProperties`                 | false    |
| placement                | popper出现的位置     | ^[string]`Placement`                     | 'bottom' |
| autofocus                | 是否自动聚焦         | ^[boolean]                               | false    |
| afterBlur                | 失焦过后的回调       | ^[Function]                              | —        |
| filterOption             | 筛选选项             | ^[Function]/ ^[boolean]                  | false    |
| defaultActiveFirstOption | 是否激活第一个选项   | ^[boolean]                               | true     |
| defaultOption            | 是否默认展开popper   | ^[boolean]                               | true     |
| size                     | 组件尺寸             | ^[enum]`'large' \| 'default' \| 'small'` | —        |

### Auto Complete Emits

| 事件名 | 描述                   | 类型                                         |
| ------ | ---------------------- | -------------------------------------------- |
| change | 选中项值发生变化时触发 | ^[Function]`(val: string \| number) => void` |
| search | 搜索时触发             | ^[Function]`(val: string) => void`           |
| select | 选中选项时触发         | ^[Function]`(val: string \| number) => void` |
| focus  | 聚焦时触发             | ^[Function]`(e: FocusEvent) => void`         |
| blur   | 失焦时触发             | ^[Function]`(e: FocusEvent) => void`         |

### Auto Complete Slots

| 插槽名  | 描述     |
| ------- | -------- |
| default | 默认插槽 |
| suffix  | 后缀插槽 |
