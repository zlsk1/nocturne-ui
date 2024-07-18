<template>
  <a
    ref="sidebarItem"
    :class="[
      'sidebar-item',
      { 'active': actived }
    ]"
    :href="item.link"
    @click="$emit('close')"
  >
    <p>{{ item.text }}</p>
  </a>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()

const props = defineProps({
  item: Object
})

const actived = computed(() => {
  return props.item!.link === route.path.slice(0, -5)
})
</script>