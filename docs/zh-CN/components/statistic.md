---
title: 统计
lang: ch-ZH
---

# Statistic 统计

## 基础用法

:::demo

statistic/basic

:::

## Statistic API

### Statistic Props

| 属性名         | 描述               | 类型                                   | 默认值 |
| -------------- | ------------------ | -------------------------------------- | ------ |
| value          | 内容数值           | `number`                               | 0      |
| title          | 是否禁用           | `string`                               | ——     |
| suffixIcon     | 后缀图标           | `string`、`Component`                  | ——     |
| prefixIcon     | 前缀图标           | `string`、`Component`                  | ——     |
| precision      | 数值精度           | `number`                               | 0      |
| valueStyle     | 自定义数值样式     | `string`、`object`                     | ——     |
| formatter      | 开关未激活时的文字 | ^[Function]`(value: number) => string` | ——     |
| groupSeparator | 千分位分隔符       | `string`                               | ','    |

## CountDown API

### CountDown Props
