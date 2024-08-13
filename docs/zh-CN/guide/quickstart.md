---
title: 快速上手
lang: ch-ZH
---

# 快速上手

## 使用方式

### 全量引入

如果你不怎么在乎代码体积，全量引入也许更加方便

```ts
// main.ts
import { createApp } from 'vue'
import App from './src/App.vue'
import NocturneUI from 'nocturne-ui'
import 'nocturne-ui/dist/index.css'

const app = createApp(App)

app.use(NocturneUI)
app.mount('#app')
```

如果你使用 ```volar``` ，可以在tsconfig.json文件中添加如下规则获取类型提示

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["nocturne-ui/global"],
  },
}
```


### 按需引入

根据你的需要来使用组件，未使用的组件将不会出现在当前项目的打包结果中

#### 手动引入

```vue
<script lang="ts" setup>
import { NButton } from 'nocturne-ui'
// 引入以css为后缀的样式文件
import 'nocturne-ui/theme-chalk/n-button.css'
// 或者scss
import 'nocturne-ui/theme-chalk/src/button.scss'
</script>

<template>
  <n-button>nocturne-ui</n-button>
</template>
```

:::tip

暂不支持样式的自动引入

:::

#### 自动引入

自动引入时你需要将 ```unplugin-vue-component``` 、```unplugin-auto-import``` 和 ```nocturne-ui-resolver``` 这三个依赖下载至你的项目中

关于[unplugin-vue-components](./link.md#basic)

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import NocturneUIReslover from 'nocturne-ui-resolver'

export default defineConfig({
  plugins: [
    Components(
      resolver: [
        NocturneUIReslover()
      ]
    ),
    AutoImport(
      resolver: [
        NocturneUIReslover()
      ]
    ),
  ],
})
```
