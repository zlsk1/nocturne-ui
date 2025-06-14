---
title: 分页器
lang: ch-ZH
---

# Pagination 分页器

当数据过多时，用于分别展示的控件

## 基础用法

:::demo

pagination/basic

:::

## 进阶

:::demo

pagination/advanced

:::

## Pagination API

### Pagination Props

| 属性名      | 描述                     | 类型                    | 默认值                                    |
| ----------- | ------------------------ | ----------------------- | ----------------------------------------- |
| jumperText  | 跳转组件的文字           | `string`                | ——                                        |
| disabled    | 是否禁用                 | `boolean`               | false                                     |
| maxPages    | 超过多少页时显示更多按钮 | ^[number]               | 7                                         |
| prevText    | 自定义上一页文字         | ^[boolean]              | false                                     |
| prevIcon    | 自定义上一页图标         | ^[boolean]              | false                                     |
| nextText    | 自定义下一页文字         | ^[boolean]              | false                                     |
| nextIcon    | 自定义下一页图标         | ^[string]/ ^[Component] | —                                         |
| total       | 全部页数                 | ^[number]               | ——                                        |
| pageSizes   | 可以选择的页数           | ^[object]               | [10, 20, 30, 40, 50, 100]                 |
| pageSize    | 每页的条数               | ^[number]               | 10                                        |
| small       | 是否为小型分页器         | ^[boolean]              | false                                     |
| pageCount   | 是否为文字按钮           | ^[boolean]              | —                                         |
| background  | 是否有背景               | ^[boolean]              | false                                     |
| layout      | 分页器的布局             | ^[string]               | 'total, prev, pager, next, sizes, jumper' |
| defaultPage | 默认页数                 | ^[number]               | 1                                         |
| currentPage | 当前页数                 | ^[number]               | —                                         |

### Pagination Emits

| 事件名     | 描述             | 类型                               |
| ---------- | ---------------- | ---------------------------------- |
| changePage | page改变时触发   | ^[Function]`(val: number) => void` |
| clickPrev  | 点击上一页时触发 | ^[Function]`(val: number) => void` |
| clickNext  | 点击下一页时触发 | ^[Function]`(val: number) => void` |
| changeSize | 切换尺寸时触发   | ^[Function]`(val: number) => void` |
