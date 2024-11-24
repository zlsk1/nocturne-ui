# NocturneUI

A vue3 component library

## Install

```sh

npm install or pnpm install

```

## Usage

### Full import

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

If you use `volar`, add type definition in tsconfig.json

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["nocturne-ui/global"]
  }
}
```

### On-demand Import

#### Manually import

Typing code in you vue file

```vue
<script lang="ts" setup>
import { NButton } from 'nocturne-ui'
import 'nocturne-ui/theme-chalk/n-button.css'
import 'nocturne-ui/theme-chalk/src/button.scss'
</script>

<template>
  <n-button>nocturne-ui</n-button>
</template>
```

#### Auto Import

You should add addtional dependencies in you program to auto import component

##### Vite

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

##### Webpack

```ts
// webpack.config.js
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { NocturneUIReslover } = require('nocturne-ui-resolver')

module.exports = {
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ]
}
```
