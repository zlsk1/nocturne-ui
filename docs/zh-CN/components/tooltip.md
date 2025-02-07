---
title: 文字提示
lang: ch-ZH
---

# Tooltip 文字提示

使用于鼠标 hover 时展示的气泡式提示。

:::tip

此组件在 [n-popper](https://github.com/zlsk1/nocturne-ui/tree/master/packages/components/popper) 的基础上封装, 而 `n-popper`组件在[popper.js](https://popper.js.org/docs/v2/)的基础上开发

:::

## 基本用法

:::demo 你可以直接使用 `content` 属性，也可以传入一个 `content插槽`

tooltip/basic

:::

## 位置

:::demo 默认为 `bottom`

tooltip/position

:::

## 不同的触发方式

:::demo

tooltip/trigger

:::

## 虚拟触发

:::demo

tooltip/virtual-trigger

:::

## Tooltip API

### Tooltip Props

| 参数                      | 描述                                                                               | 类型                                                                    | 默认值  |
| ------------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------- |
| content                   | 提示内容                                                                           | string                                                                  | ——      |
| trigger                   | 触发方式                                                                           | ^[enum]`'hover' \| 'click' \| 'focus' \| 'contextmenu'`                 | hover   |
| effect                    | 亮色或暗色主题                                                                     | ^[enum]`'dark' \| 'light'`                                              | dark    |
| placement                 | 出现位置                                                                           | ^[enum][popper.js](https://popper.js.org/docs/v2/constructors/#options) | bottom  |
| appendTo                  | 浮层要挂载的DOM节点                                                                | `HTMLElement`\ `string`                                                 | body    |
| pure                      | 内边距是否为0                                                                      | `boolean`                                                               | false   |
| disabled                  | 是否禁用                                                                           | `boolean`                                                               | false   |
| visible / v-model:visible | 显示/隐藏                                                                          | `boolean`                                                               | ——      |
| offset                    | 出现位置的偏移量                                                                   | `number`                                                                | 12      |
| popperOptions             | `popper.js` 的配置项                                                               | `object` 参考[popper.js](https://popper.js.org/docs/v2/)文档            | ——      |
| rawContent                | `content` 中的内容是否作为HTML字符串处理                                           | `boolean`                                                               | `false` |
| showAfter                 | 延迟出现（毫秒）                                                                   | `number`                                                                | 0       |
| hideAfter                 | 延迟消失（毫秒）                                                                   | `number`                                                                | 200     |
| showArrow                 | 是否显示箭头                                                                       | `boolean`                                                               | `true`  |
| fallback-placements       | [popper.js](https://popper.js.org/docs/v2/modifiers/flip/#fallbackplacements) 属性 | ^[Array]`Placements`                                                    | ——      |
| popperClass               | 自定义 popper 类名                                                                 | `string`                                                                | ——      |
| autoClose                 | tooltip 出现后自动隐藏延时，单位毫秒                                               | `number`                                                                | 0       |
| virtual-triggering        | 是否使用虚拟触发                                                                   | `boolean`                                                               | `false` |
| virtual-ref               | 虚拟触发的元素                                                                     | `HTMLElement`                                                           | ——      |
| persistent                | 当popper长时间不触发，且persistent为false时, popconfirm 将会被删除                 | `boolean`                                                               | `false` |
| aria-label                | 无障碍属性                                                                         | `string`                                                                | ——      |

### Tooltip Emits

| 事件名         | 描述            | 类型                                                        |
| -------------- | --------------- | ----------------------------------------------------------- |
| update:visible | 出现/消失时触发 | ^[Function]`(visible: boolean) => void`                     |
| bofore-show    | 消失前时触发    | ^[Function]`(toggleReason: Ref<Event \| undefined>) =>void` |
| before-hide    | 出现前时触发    | ^[Function]`(toggleReason: Ref<Event \| undefined>) =>void` |
| show           | 出现时触发      | ^[Function]`(toggleReason: Ref<Event \| undefined>) =>void` |
| hide           | 消失时触发      | ^[Function]`(toggleReason: Ref<Event \| undefined>) =>void` |

### Tooltip Slots

| 插槽名  | 描述           |
| ------- | -------------- |
| default | 自定义内容     |
| content | tooltip 的内容 |

### Tooltip Exposes

| 名称                 | 描述                                            | 类型                                                |
| -------------------- | ----------------------------------------------- | --------------------------------------------------- |
| popperRef            | n-popper 组件实例                               | ^[object]`Ref<PopperInstance  \| undefined>`        |
| contentRef           | n-tooltip-content 组件实例                      | ^[object]`Ref<TooltipContentInstance \| undefined>` |
| isFocusInsideContent | 验证当前焦点事件是否在 n-tooltip-content 中触发 | ^[Function]`()=>boolean \| undefined`               |
| updatePopper         | 更新 n-tooltip 组件                             | ^[Function]`()=>void`                               |
| onOpen               | 显示 tooltip 的内容                             | ^[Function]`(event?: Event)=>void`                  |
| onClose              | 隐藏 tooltip 的内容                             | ^[Function]`(event?: Event)=>void`                  |
| hide                 | 隐藏 tooltip 的内容                             | ^[Function]`(event?: Event)=>void`                  |
