<script setup>
import { computed, ref, watchEffect } from 'vue'
import { paginationProps, paginationEmits } from './index'

defineOptions({
  name: 'FrPagination'
})

const props = defineProps(paginationProps)
const emit = defineEmits(paginationEmits)

const _currentPage = ref(props.currentPage || props.defaultPage)
const showPrevMore = ref(false)
const showNextMore = ref(false)
const isPrevHover = ref(false)
const isNextHover = ref(false)

const totalPages = computed(() => {
  return props.pageCount || Math.ceil(props.total / props.pageSize)
})

const more = computed(() => {
  return _currentPage.value >= totalPages.value
})

const less = computed(() => {
  return _currentPage.value <= 1
})

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
    for (let i = _currentPage.value - offset; i <= _currentPage.value + offset; i++) {
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

const changePage = e => {
  if (e.target.tagName === 'UL') {
    return
  }
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
  _currentPage.value = newPage
}

const handlePrevPage = () => {
  if (less.value) return
  --_currentPage.value
  emit('clickPrev', _currentPage.value)
}

const handleNextPage = () => {
  if (more.value) return
  ++_currentPage.value
  emit('clickNext', _currentPage.value)
}
</script>

<template>
  <div
    :class="[
      'fr-pagination',
      {
        'is-background': background,
        'is-small': small
      }
    ]"
  >
    <button
      v-if="layout.includes('prev')"
      :class="[
        'fr-pagination__button',
        {
          'is-not-allow': less
        }
      ]"
      @click="handlePrevPage"
    >
      <fr-icon icon="arrow-left"></fr-icon>
    </button>
    <ul
      v-if="layout.includes('pages')"
      class="fr-pagination__pages"
      @click="changePage"
    >
      <li
        v-if="totalPages > 0"
        class="fr-pagination__num"
        :class="_currentPage === 1 ? 'is-active' : ''"
      >
        1
      </li>
      <!-- prevMore -->
      <li
        v-if="showPrevMore || isPrevHover"
        class="fr-pagination__num is-more prev"
        @mouseenter="isPrevHover = true"
        @mouseleave="isPrevHover = false"
      >
        <fr-icon v-if="!isPrevHover" icon="more"></fr-icon>
        <fr-icon v-else icon="arrow-left-double"></fr-icon>
      </li>
      <!-- pages -->
      <li
        v-for="item in pages"
        :key="item"
        class="fr-pagination__num"
        :class="item === _currentPage ? 'is-active' : ''"
      >
        {{ item }}
      </li>
      <!-- nextMore -->
      <li
        v-if="showNextMore || isNextHover"
        class="fr-pagination__num is-more next"
        @mouseenter="isNextHover = true"
        @mouseleave="isNextHover = false"
      >
        <fr-icon v-if="!isNextHover" icon="more"></fr-icon>
        <fr-icon v-else icon="arrow-right-double"></fr-icon>
      </li>
      <li
        v-if="totalPages > 1"
        class="fr-pagination__num"
        :class="_currentPage === totalPages ? 'is-active' : ''"
      >
        {{ totalPages }}
      </li>
    </ul>
    <button
      v-if="layout.includes('next')"
      :class="[
        'fr-pagination__button',
        {
          'is-not-allow': more
        }
      ]"
      @click="handleNextPage"
    >
      <fr-icon icon="arrow-right"></fr-icon>
    </button>
  </div>
</template>

<style>
@import '@/theme-chalk/pagination.scss';
</style>
