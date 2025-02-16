<template>
  <ul :class="[ns.e('pages'), ns.is('disables', disabled)]" @click="changePage">
    <li
      v-if="totalPages > 0"
      :class="[ns.e('num'), ns.is('active', _currentPage === 1)]"
    >
      1
    </li>
    <!-- prevMore -->
    <li
      v-if="showPrevMore"
      :class="ns.e('num')"
      @mouseenter="isPrevHover = true"
      @mouseleave="isPrevHover = false"
    >
      <More v-if="!isPrevHover" size="16" />
      <ArrowLeftDouble v-else size="16" />
    </li>
    <!-- pages -->
    <li
      v-for="item in pages"
      :key="item"
      :class="[ns.e('num'), ns.is('active', item === _currentPage)]"
    >
      {{ item }}
    </li>
    <!-- nextMore -->
    <li
      v-if="showNextMore"
      :class="[ns.e('num'), ns.is('disabled', disabled)]"
      @mouseenter="!disabled ? (isNextHover = true) : ''"
      @mouseleave="isNextHover = false"
    >
      <More v-if="!isNextHover" size="16" />
      <ArrowRightDouble v-else size="16" />
    </li>
    <li
      v-if="totalPages > 1"
      :class="[ns.e('num'), ns.is('active', _currentPage === totalPages)]"
    >
      {{ totalPages }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { computed, inject, ref, watchEffect } from 'vue'
import {
  RiArrowLeftDoubleFill as ArrowLeftDouble,
  RiArrowRightDoubleFill as ArrowRightDouble,
  RiMoreFill as More
} from '@remixicon/vue'
import { useNamespace } from '@nocturne-ui/composables'
import { PAGINATION_INJECTION_KEY } from '../constants'
import { pagerProps } from './pager'

const { totalPages, _currentPage, disabled, emit } = inject(
  PAGINATION_INJECTION_KEY,
  undefined
)!

const props = defineProps(pagerProps)

const ns = useNamespace('pagination')

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
  } else if (!showPrevMore && showNextMore) {
    for (let i = 2; i < pagerCount; i++) {
      array.push(i)
    }
  } else if (showPrevMore && showNextMore) {
    const offset = Math.floor(pagerCount / 2) - 1
    for (
      let i = _currentPage.value - offset;
      i <= _currentPage.value + offset;
      i++
    ) {
      array.push(i)
    }
  } else {
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
    } else if (className.includes('next')) {
      newPage = _currentPage.value + pageOffset
    }
  }
  emit('changePage', newPage)
  emit('update:current-page', newPage)
  _currentPage.value = newPage
}
</script>
