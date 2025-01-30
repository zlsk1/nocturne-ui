---
title: 下拉框
lang: ch-ZH
---

# Dropdown 下拉框

## 基础用法

:::demo

dropdown/basic

:::

## 浮层位置

:::demo

dropdown/placement

:::

## 触发方式

:::demo

dropdown/trigger

:::

## Dropdown API

### Dropdown Props

| 属性名         | 描述            | 类型                                                                                     | 默认值 |
| -------------- | --------------- | ---------------------------------------------------------------------------------------- | ------ |
| trigger        | 触发方式        | ^[enum]`'hover' \| 'click' \| 'focus' \| 'contextmenu'`                                  | hover  |
| placement      | 浮层位置        | ^[enum]`'bottom' \| 'bottom-start' \| 'bottom-end' \| 'top' \| 'top-start' \| 'top-end'` | bottom |
| popperClass    | 自定义浮层class | `string`                                                                                 | ''     |
| popperOptions  | 自定义浮层配置  | [popper.js](https://popper.js.org/docs/v2/)参数                                          | {}     |
| disabled       | 是否禁用        | `boolean`                                                                                | false  |
| tabindex       | tabindex        | `number`/ `string`                                                                       | 0      |
| hideAfterClick | 点击后是否隐藏  | `boolean`                                                                                | true   |

### Dropdown Emits

| 事件名        | 描述                        | 类型                                    |
| ------------- | --------------------------- | --------------------------------------- |
| visibleChange | 浮层的显隐状态变化时触发    | ^[Function]`(visible: boolean) => void` |
| click         | `dropdown-item`被点击时触发 | ^[Function]`(e: Event) => void`         |

### Dropdown Slots

| 插槽名  | 描述           |
| ------- | -------------- |
| default | 触发下拉的元素 |
| content | 自定义下拉内容 |

## DropdownItem API

### DropdownItem Props

| 属性名   | 描述         | 类型                  | 默认值 |
| -------- | ------------ | --------------------- | ------ |
| disabled | 是否禁用     | `boolean`             | false  |
| divided  | 是否为分割线 | `boolean`             | false  |
| icon     | 自定义图标   | `string`/ `Component` | ——     |

### DropdownItem Slots

| 插槽名  | 描述           |
| ------- | -------------- |
| default | 触发下拉的元素 |
