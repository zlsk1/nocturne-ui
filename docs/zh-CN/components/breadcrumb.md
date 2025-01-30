---
title: 面包屑
lang: ch-ZH
---

# Breadcrumb 面包屑

## 基础用法

:::demo

breadcrumb/basic

:::

## 分隔符

:::demo

breadcrumb/separator

:::

## Breadcrumb API

### Breadcrumb Props

| 属性名    | 描述   | 类型     | 默认值 |
| --------- | ------ | -------- | ------ |
| separator | 分隔符 | `string` | `/`    |

### Breadcrumb Emits

| 事件名 | 描述                 | 类型                                |
| ------ | -------------------- | ----------------------------------- |
| click  | 点击面包屑子项时触发 | ^[Function]`(path: string) => path` |

### Breadcrumb Slots

| 插槽名  | 描述           | 参数 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

## BreadcrumbItem API

### BreadcrumbItem Props

| 属性名 | 描述     | 类型     | 默认值 |
| ------ | -------- | -------- | ------ |
| path   | 跳转路径 | `string` | `/`    |

### BreadcrumbItem Slots

| 插槽名  | 描述           | 参数 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |
