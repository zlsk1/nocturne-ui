<template>
  <button :class="nextCls" @click="handleNextPage">
    <n-icon v-if="!nextText">
      <component :is="nextIcon" />
    </n-icon>
    <span v-else>{{ nextText }}</span>
  </button>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { NIcon } from '@/components'
import { useNamespace } from '@/composables'
import { PAGINATION_INJECTION_KEY } from '../constants'
import { nextProps } from './next'

const props = defineProps(nextProps)

const { _currentPage, totalPages, disabled, emit } = inject(
  PAGINATION_INJECTION_KEY,
  undefined
)!

const ns = useNamespace('pagination')

const more = computed(() => {
  return _currentPage.value >= totalPages.value
})

const nextCls = computed(() => [
  ns.e('button'),
  ns.is('not-allow', more.value),
  ns.is('text', !!props.nextText)
])

const handleNextPage = () => {
  if (more.value || disabled) return
  ++_currentPage.value
  emit('clickNext', _currentPage.value)
  emit('update:current-page', _currentPage.value)
}
</script>
