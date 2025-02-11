<template>
  <a
    ref="sidebarItem"
    :class="['sidebar-item', { active: actived }]"
    :href="item?.link"
    @click="$emit('close')"
  >
    <span v-for="text in item?.text.split(' ')" :key="text">{{ text }}</span>
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
