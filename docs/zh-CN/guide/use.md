---
title: 快速上手
lang: ch-ZH
---

# 快速上手

## 使用方式

### 全量引入

如果你不怎么在乎代码体积，全量引入也许起来更加方便

```ts
import { createApp } from 'vue'
import App from './src/App.vue'
import NocturneUI from 'nocturne-ui'
import 'nocturne-ui/dist/index.css'

const app = createApp(App)

app.use(NocturneUI)
app.mount('#app')
```