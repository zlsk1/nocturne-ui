---
title: checkbox
lang: cn-ZH
---

# Checkbox 复选框

在一组选项中进行选择

## 基础用法

你可以使用插槽的方式设置或者添加 `label` 属性来添加box右侧的文字介绍

:::demo 

checkbox/basic

:::

## 禁用

:::demo 

checkbox/disabled

:::

## 多选框组

`n-checkbox-group` 中的 `v-model` 属性是整个多选框组的值，`n-checkbox`中的 `value` 是单个多选款的值, 当被选中时，`value` 会被添加进 `v-model` 绑定的变量当中。

你还可以添加 `indeterminate` 属性来更好的控制全选和反选

:::demo 

checkbox/checkbox-group

:::

## 可选数量

使用 `min` 和 `max` 控制可选的 `checkbox` 数量

:::demo 

checkbox/restrict

:::

## Checkbox API

### Checkbox Props

| 属性名                | 描述                   | 类型                                     | 默认值     |
| -------------------- | ---------------------- | ---------------------------------------- | -------   |
| modelValue / v-model | 选中项绑定的值           | ^[string] / ^[number] / ^[boolean]      | -         |
| value                | 选中状态的值             | ^[string] / ^[number] / ^[boolean] / ^[object] | -  |
| disabled             | 是否禁用                | ^[boolean]                               | false     |
| size                 | checkbox尺寸            | ^[eum]`'large'\|'default'\|'small'`      | default   |
| checked              | 是否选中                | ^[boolean]                               | false     |
| indeterminate        | 待定状态，一般用于控制checkbox-group         | ^[boolean]            | false   |
| label          | 选中状态的值，只有在绑定对象类型为^[array]时有效。如果没有^[value]，^[label]则作为value使用           | ^[string]  |  —      |
| trueValue            | 选中时的值              | ^[string] / ^[number]                     | —   |
| falseValue           | 未选中时的值            | ^[string] / ^[number]                     | —       |
| name                 | 原生name属性            | ^[string]                                 | —       |

### Checkbox Emits

| 事件名                | 描述                   | 类型                                     |
| -------------------- | ---------------------- | ---------------------------------------- |
| change               | 选中项值发生变化时触发   | ^[Function]`(val: string \| number \| boolean ) => void` |

### Checkbox Slots

| 插槽名  | 描述              |
| ------ | ----------------- |
| default| 默认插槽           |

## Checkbox API

### Checkbox-group Props

| 属性名                | 描述                   | 类型                                     | 默认值     |
| -------------------- | ---------------------- | ---------------------------------------- | -------   |
| modelValue / v-model | 选中项绑定的值           | ^[string] / ^[number] / ^[boolean]      | -         |
| disabled             | 是否禁用                | ^[boolean]                               | false     |
| checked              | 是否选中                | ^[boolean]                               | false     |
| label                | 选中状态的值，只有在绑定对象类型为^[array]时有效。如果没有^[value]，^[label]则作为value使用           | ^[string]  |  —      |
| max                  | 可选中的最大数量         | ^[number]                               | —   |
| min                  | 可选中的最小选中数量      | ^[number]                               | —       |

### Checkbox-group Emits

| 事件名                | 描述                   | 类型                                     |
| -------------------- | ---------------------- | ---------------------------------------- |
| change               | 选中项值发生变化时触发   | ^[Function]`(val: string \| number \| boolean ) => void` |

### Checkbox-group Slots

| 插槽名  | 描述              |
| ------ | ----------------- |
| default| 默认插槽           |