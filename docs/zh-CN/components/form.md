---
title: 表单
lang: ch-ZH
---

# Form 表单

## 基础用法

:::demo

form/basic

:::

## Form API

### Form Props

| 属性名         | 描述           | 类型                                     | 默认值   |
| ------------- | ------------- | --------------------------------------- | -------- |
| model         | 表单数据       | `object`                                 | ——      |
| rules         | 表单校验对象    | `object`                                 | ——      |
| labelPosition | 标签的对齐方式   | ^[enum]`'right' \| 'left' \| 'top'`     | left    |
| disabled      | 是否禁用表单    | `boolean`                                | false   |
| size          | 表单尺寸       | ^[enum]`'small' \| 'default' \| 'large'` | left    |

### Form Exposes

| 方法名         | 描述                          | 类型                                                   |
| ------------- | ---------------------------- | ------------------------------------------------------ |
| validate      | 表单验证方法                   | ^[Function]`(callback: Callback): Promise<boolean>`    |
| resetField    | 重置表单的方法                 | ^[Function]`(): void`                                  |
| clearField    | 清除单个表单项的验证结果的方法    | ^[Function]`(prop: string \| undefined) => void`    |
