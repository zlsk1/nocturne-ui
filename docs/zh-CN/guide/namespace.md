---
title: 命名空间
lang: ch-ZH
---

# 命名空间

命名空间应用在组件前缀和class前缀上，nocturne-ui的默认命名空间为 `n` ，替换默认命名空间需要配置 `config-provider` 和 `scss` 全局变量

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

假设你有如下路径文件 styles/namespace.scss，使用 `@forward` 指令更改默认的变量

```scss
// styles/namespace.scss
@forward 'nocturne-ui/theme-chalk/src/mixins/config.scss' with (
  $namespace: 'noc'
);
```

此外，你还需要在vite中配置

```ts
// vite.config.ts
import { defineConfig } from 'vite'

export default {
  scss: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/namespace.scss" as *;`
        }
      }
    }
  }
}
```
