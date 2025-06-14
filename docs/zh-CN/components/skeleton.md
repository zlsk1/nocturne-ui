---
title: 骨架屏
lang: ch-ZH
---

# Skeleton 骨架屏

## 基础用法

:::demo

skeleton/basic

:::

## 开启动画

:::demo

skeleton/animated

:::

## Skeleton API

### Skeleton Props

| 属性名   | 描述           | 类型      | 默认值 |
| -------- | -------------- | --------- | ------ |
| loading  | 是否显示骨架屏 | `boolean` | false  |
| animated | 是否开启动画   | `boolean` | false  |
| rows     | 行数           | `number`  | 3      |

## SkeletonItem API

### SkeletonItem Props

| 属性名  | 描述       | 类型                                                                                     | 默认值 |
| ------- | ---------- | ---------------------------------------------------------------------------------------- | ------ |
| variant | 渲染的类型 | ^[enum]`'circle' \|'rect' \|'h1' \|'h3' \|'text' \|'caption' \|'p' \|'image' \|'button'` | 'text' |
