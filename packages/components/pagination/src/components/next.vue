<template>
  <button
    :class="[
      'n-pagination__button',
      {
        'is-not-allow': more,
        'is-text': nextText
      }
    ]"
    @click="handleNextPage"
  >
    <n-icon v-if="!nextText" :icon="nextIcon"></n-icon>
    <span v-else>{{ nextText }}</span>
  </button>
</template>

<script lang="ts" setup>
import { inject, computed } from 'vue'
import { PAGINATION_INJECTION_KEY } from '../constants'
import { nextProps } from './next'
import { NIcon } from '@/components'

defineProps(nextProps)

const {
  _currentPage,
  totalPages,
  disabled,
  emit
} = inject(PAGINATION_INJECTION_KEY, undefined)!

const more = computed(() => {
  return _currentPage.value >= totalPages.value
})

const handleNextPage = () => {
  if (more.value || disabled) return
  ++_currentPage.value
  emit('clickNext', _currentPage.value)
  emit('update:current-page', _currentPage.value)
}
</script>
