---
title: 按钮
lang: ch-ZH
---

# Button 按钮

常用化按钮

## 基础用法

添加 `type`, `plain`, `circle`和 `icon` 属性设置不同的样式

:::demo

button/basic

:::

```js
<template>
  <div class="mb-4">
    <n-button>Defualt</n-button>
    <n-button type="primary">Primary</n-button>
    <n-button type="danger">Danger</n-button>
    <n-button type="warning">Warning</n-button>
    <n-button type="info">Info</n-button>
    <n-button type="success">Success</n-button>
  </div>
  <div class="mb-4">
    <n-button plain>Defualt</n-button>
    <n-button type="primary" plain>Primary</n-button>
    <n-button type="danger" plain>Danger</n-button>
    <n-button type="warning" plain>Warning</n-button>
    <n-button type="info" plain>Info</n-button>
    <n-button type="success" plain>Success</n-button>
  </div>
  <div class="mb-4">
    <n-button circle>Round</n-button>
    <n-button type="primary" circle>Primary</n-button>
    <n-button type="danger" circle>Danger</n-button>
    <n-button type="warning" circle>Warning</n-button>
    <n-button type="info" circle>Info</n-button>
    <n-button type="success" circle>Success</n-button>
  </div>
  <div class="mb-4">
    <n-button circle :icon="Search"></n-button>
    <n-button type="primary" circle :icon="Upload"></n-button>
    <n-button type="danger" circle :icon="Delete"></n-button>
    <n-button type="warning"circle :icon="Walk"></n-button>
    <n-button type="info" circle :icon="CodeView"></n-button>
    <n-button type="success" circle :icon="Game"></n-button>
  </div>
</template>

<script lang="ts" setup>
import {
  RiSearchLine as Search,
  RiUploadLine as Upload,
  RiDeleteBinLine as Delete,
  RiWalkLine as Walk,
  RiCodeView as CodeView,
  RiGameLine as Game
} from '@remixicon/vue'
</script>


```

## 禁用按钮

添加 `disabled` 属性将按钮禁用

:::demo

button/disabled

:::

```js
<template>
  <div class="mb-4">
    <n-button disabled>Defualt</n-button>
    <n-button disabled type="primary">Primary</n-button>
    <n-button disabled type="danger">Danger</n-button>
    <n-button disabled type="warning">Warning</n-button>
    <n-button disabled type="info">Info</n-button>
    <n-button disabled type="success">Success</n-button>
  </div>
  <div class="mb-4">
    <n-button disabled plain>Defualt</n-button>
    <n-button disabled type="primary" plain>Primary</n-button>
    <n-button disabled type="danger" plain>Danger</n-button>
    <n-button disabled type="warning" plain>Warning</n-button>
    <n-button disabled ="info" plain>Info</n-button>
    <n-button disabled type="success" plain>Success</n-button>
  </div>
</template>

<script lang="ts" setup></script>

```

## Button API

### Button 属性

| 属性        |      说明      |  类型 | 默认值 |
| :------------ | :----------- | :---- | :---- |
| type | 按钮类型 | `enum` | — |
| plain | 是否为朴素按钮 | `boolean` | false |
| circle | 是否为圆形按钮 | `boolean` | false |
