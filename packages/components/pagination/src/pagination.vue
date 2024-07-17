<script lang="ts" setup>
import { computed, ref, provide, toRef } from 'vue'
import { paginationProps, paginationEmits } from './pagination'
import { PAGINATION_INJECTION_KEY } from './constants'
import jumper from './components/jumper.vue'
import pager from './components/pager.vue'
import prev from './components/prev.vue'
import next from './components/next.vue'
import total from './components/total.vue'

defineOptions({
  name: 'NPagination'
})

const props = defineProps(paginationProps)
const emit = defineEmits(paginationEmits)

const _currentPage = ref(props.currentPage || props.defaultPage)

const totalPages = computed(() => {
  return props.pageCount || Math.ceil(props.total! / props.pageSize)
})

provide(
  PAGINATION_INJECTION_KEY,
  {
    _currentPage,
    totalPages,
    disabled: props.disabled,
    pageSize: toRef(props.pageSize),
    emit
  }
)
</script>

<template>
  <div
    :class="[
      'n-pagination',
      {
        'is-background': background,
        'is-small': small,
        'is-disabled': disabled
      }
    ]"
  >
    <total :total="props.total as unknown as number"></total>
    <jumper :disabled="disabled"></jumper>
    <prev></prev>
    <pager :max-pages="maxPages"></pager>
    <next></next>
  </div>
</template>

<style lang="scss" scoped>
@use '@/theme-chalk/pagination.scss';
</style>
