---
title: 命名空间
lang: ch-ZH
---

# 命名空间

class的前缀，nocturne-ui的默认命名空间为 `n` ，替换默认命名空间需要配置 `config-provider` 和 `scss` 全局变量

## config-provider
```vue
<template>
  <config-provider :namespace="customNamespace"></config-provider>
</template>
<script>
import { ref } from 'vue'

const customNamespace = ref('noc')
</script>
```

## scss全局变量

假设你有如下路径 styles/namespace.scss

```scss
// styles/namespace.scss
@forward 'nocturne-ui/theme-chalk/src/mixins/config.scss' with (
  $namespace: 'noc'
);
```

你还需要在vite中配置
```ts
// vite.config.ts
import { defineConfig } from 'vite'

export default({
  scss: {
    css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/namespace.scss" as *;`,
      },
    },
  },
  }
})
```