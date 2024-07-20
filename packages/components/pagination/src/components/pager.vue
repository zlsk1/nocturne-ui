<template>
  <ul
    class="n-pagination__pages"
    :class="{ 'is-disabled': disabled }"
    @click="changePage"
  >
    <li
      v-if="totalPages > 0"
      class="n-pagination__num"
      :class="_currentPage === 1 ? 'is-active' : ''"
    >
      1
    </li>
    <!-- prevMore -->
    <li
      v-if="showPrevMore"
      class="n-pagination__num is-more prev"
      @mouseenter="isPrevHover = true"
      @mouseleave="isPrevHover = false"
    >
      <More v-if="!isPrevHover" size="16"></More>
      <ArrowLeftDouble v-else size="16"></ArrowLeftDouble>
    </li>
    <!-- pages -->
    <li
      v-for="item in pages"
      :key="item"
      :class="[
        'n-pagination__num',
        item === _currentPage ? 'is-active' : ''
      ]"
    >
      {{ item }}
    </li>
    <!-- nextMore -->
    <li
      v-if="showNextMore"
      class="n-pagination__num is-more next"
      :class="{ 'is-disabled': disabled }"
      @mouseenter="!disabled ? isNextHover = true : ''"
      @mouseleave="isNextHover = false"
    >
      <More v-if="!isNextHover" size="16"></More>
      <ArrowRightDouble v-else size="16"></ArrowRightDouble>
    </li>
    <li
      v-if="totalPages > 1"
      class="n-pagination__num"
      :class="_currentPage === totalPages ? 'is-active' : ''"
    >
      {{ totalPages }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ref, computed, inject, watchEffect } from 'vue'
import { PAGINATION_INJECTION_KEY } from '../constants'
import { pagerProps } from './pager'
import {
  RiArrowRightDoubleFill as ArrowRightDouble,
  RiArrowLeftDoubleFill as ArrowLeftDouble,
  RiMoreFill as More
} from '@remixicon/vue'

const {
  totalPages,
  _currentPage,
  disabled,
  emit
} = inject(PAGINATION_INJECTION_KEY, undefined)!

const props = defineProps(pagerProps)

const isPrevHover = ref(false)
const isNextHover = ref(false)
const showPrevMore = ref(false)
const showNextMore = ref(false)

const pages = computed(() => {
  const pagerCount = props.maxPages
  const halfPagerCount = (pagerCount - 1) / 2
  let showPrevMore = false
  let showNextMore = false
  if (totalPages.value > pagerCount) {
    if (_currentPage.value > pagerCount - halfPagerCount) {
      showPrevMore = true
    }
    if (_currentPage.value < totalPages.value - halfPagerCount) {
      showNextMore = true
    }
  }
  const array = []
  if (showPrevMore && !showNextMore) {
    const startPage = totalPages.value - (pagerCount - 2)
    for (let i = startPage; i < totalPages.value; i++) {
      array.push(i)
    }
  }
  else if (!showPrevMore && showNextMore) {
    for (let i = 2; i < pagerCount; i++) {
      array.push(i)
    }
  }
  else if (showPrevMore && showNextMore) {
    const offset = Math.floor(pagerCount / 2) - 1
    for (let i = _currentPage.value - offset; i <= _currentPage.value + offset; i++) {
      array.push(i)
    }
  }
  else {
    for (let i = 2; i < totalPages.value; i++) {
      array.push(i)
    }
  }
  return array
})

watchEffect(() => {
  const halfPagerCount = (props.maxPages - 1) / 2
  showPrevMore.value = false
  showNextMore.value = false
  if (totalPages.value > props.maxPages) {
    if (_currentPage.value > props.maxPages - halfPagerCount) {
      showPrevMore.value = true
    }
    if (_currentPage.value < totalPages.value - halfPagerCount) {
      showNextMore.value = true
    }
  }
})

const changePage = (e: any) => {
  if (e.target.tagName === 'UL' || disabled) return
  let newPage = Number(e.target.textContent)
  const pageOffset = props.maxPages - 2

  const className = e.target.className
  if (className.includes('more')) {
    if (className.includes('prev')) {
      newPage = _currentPage.value - pageOffset
    }
    else if (className.includes('next')) {
      newPage = _currentPage.value + pageOffset
    }
  }
  emit('changePage', newPage)
  emit('update:current-page', newPage)
  _currentPage.value = newPage
}
</script>

<style>
@use '@/theme-chalk/src/pagination.scss';
</style>
