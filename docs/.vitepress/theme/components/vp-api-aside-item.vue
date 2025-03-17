<template>
  <n-anchor-item
    v-for="{ children, link, title } in headers"
    :key="title"
    :title="title"
    :href="link"
  >
    <template v-if="children?.length" #subLink>
      <VpApiAsideItem :headers="children" />
    </template>
  </n-anchor-item>
</template>

<script lang="ts" setup>
defineProps({
  headers: Object
})
</script>
