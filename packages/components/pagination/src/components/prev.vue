<template>
  <button
    :class="[
      'n-pagination__button',
      {
        'is-not-allow': less,
        'is-text': prevText
      }
    ]"
    @click="handlePrevPage"
  >
    <n-icon v-if="!prevText" :icon="prevIcon"></n-icon>
    <span v-else>{{ prevText }}</span>
  </button>
</template>

<script lang="ts" setup>
import { inject, computed } from 'vue'
import { PAGINATION_INJECTION_KEY } from '../constants'
import { prevProps } from './prev'
import { NIcon } from '@/components'

defineProps(prevProps)

const {
  _currentPage,
  disabled,
  emit
} = inject(PAGINATION_INJECTION_KEY, undefined)!

const less = computed(() => {
  return _currentPage.value <= 1
})

const handlePrevPage = () => {
  if (less.value || disabled) return
  --_currentPage.value
  emit('clickPrev', _currentPage.value)
  emit('update:current-page', _currentPage.value)
}
</script>
