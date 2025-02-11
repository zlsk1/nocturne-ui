<template>
  <ul class="api-content-item">
    <li v-for="{ children, link, title, level } in headers" :key="title">
      <a :href="link" :class="['api-content-anchor', `level-${level}`]">
        {{ title }}
      </a>
      <template v-if="children?.length">
        <VpApiAsideItem :headers="children" />
      </template>
    </li>
  </ul>
</template>

<script lang="ts" setup>
defineProps({
  headers: Object
})
</script>
