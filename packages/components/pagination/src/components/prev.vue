<template>
  <button :class="prevCls" @click="handlePrevPage">
    <n-icon v-if="!prevText">
      <component :is="prevIcon" />
    </n-icon>
    <span v-else>{{ prevText }}</span>
  </button>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { NIcon } from '@nocturne-ui/components'
import { useNamespace } from '@nocturne-ui/composables'
import { PAGINATION_INJECTION_KEY } from '../constants'
import { prevProps } from './prev'

const props = defineProps(prevProps)

const { _currentPage, disabled, emit } = inject(
  PAGINATION_INJECTION_KEY,
  undefined
)!

const ns = useNamespace('pagination')

const less = computed(() => {
  return _currentPage.value <= 1
})

const prevCls = computed(() => [
  ns.e('button'),
  ns.is('not-allow', less.value),
  ns.is('text', !!props.prevText)
])

const handlePrevPage = () => {
  if (less.value || disabled) return
  --_currentPage.value
  emit('clickPrev', _currentPage.value)
  emit('update:current-page', _currentPage.value)
}
</script>
