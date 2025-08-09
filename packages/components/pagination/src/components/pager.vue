<template>
  <ul :class="[ns.e('pages'), ns.is('disables', disabled)]" @click="changePage">
    <li
      v-if="totalPages > 0"
      :class="[ns.e('num'), ns.is('active', _currentPage === 1)]"
    >
      1
    </li>
    <!-- prevMoreOutlined -->
    <li
      v-if="showPrevMoreOutlined"
      :class="[
        ns.e('num'),
        ns.is('disabled', disabled),
        'quickPrev',
        'MoreOutlined'
      ]"
      :aria-label="t('noc.pagination.prevPages', { pager: maxPages - 2 })"
      @mouseenter="isPrevHover = true"
      @mouseleave="isPrevHover = false"
    >
      <EllipsisOutlined v-if="!isPrevHover" size="16" />
      <DoubleLeftOutlined v-else size="16" />
    </li>
    <!-- pages -->
    <li
      v-for="item in pages"
      :key="item"
      :class="[ns.e('num'), ns.is('active', item === _currentPage)]"
      :aria-label="t('noc.pagination.currentPage', { pager: item })"
    >
      {{ item }}
    </li>
    <!-- nextMoreOutlined -->
    <li
      v-if="showNextMoreOutlined"
      :class="[
        ns.e('num'),
        ns.is('disabled', disabled),
        'quickNext',
        'MoreOutlined'
      ]"
      :aria-label="t('noc.pagination.nextPages', { pager: maxPages - 2 })"
      @mouseenter="!disabled ? (isNextHover = true) : ''"
      @mouseleave="isNextHover = false"
    >
      <EllipsisOutlined v-if="!isNextHover" size="16" />
      <DoubleRightOutlined v-else size="16" />
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
  DoubleLeftOutlined,
  DoubleRightOutlined,
  EllipsisOutlined
} from '@ant-design/icons-vue'
import { useLocale, useNamespace } from '@nocturne-ui/composables'
import { PAGINATION_INJECTION_KEY } from '../constants'
import { pagerProps } from './pager'

const { totalPages, _currentPage, disabled, emit } = inject(
  PAGINATION_INJECTION_KEY,
  undefined
)!

const props = defineProps(pagerProps)

const ns = useNamespace('pagination')
const { t } = useLocale()

const isPrevHover = ref(false)
const isNextHover = ref(false)
const showPrevMoreOutlined = ref(false)
const showNextMoreOutlined = ref(false)

const pages = computed(() => {
  const pagerCount = props.maxPages
  const halfPagerCount = (pagerCount - 1) / 2
  let showPrevMoreOutlined = false
  let showNextMoreOutlined = false
  if (totalPages.value > pagerCount) {
    if (_currentPage.value > pagerCount - halfPagerCount) {
      showPrevMoreOutlined = true
    }
    if (_currentPage.value < totalPages.value - halfPagerCount) {
      showNextMoreOutlined = true
    }
  }
  const array = []
  if (showPrevMoreOutlined && !showNextMoreOutlined) {
    const startPage = totalPages.value - (pagerCount - 2)
    for (let i = startPage; i < totalPages.value; i++) {
      array.push(i)
    }
  } else if (!showPrevMoreOutlined && showNextMoreOutlined) {
    for (let i = 2; i < pagerCount; i++) {
      array.push(i)
    }
  } else if (showPrevMoreOutlined && showNextMoreOutlined) {
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
  showPrevMoreOutlined.value = false
  showNextMoreOutlined.value = false
  if (totalPages.value > props.maxPages) {
    if (_currentPage.value > props.maxPages - halfPagerCount) {
      showPrevMoreOutlined.value = true
    }
    if (_currentPage.value < totalPages.value - halfPagerCount) {
      showNextMoreOutlined.value = true
    }
  }
})

const changePage = (e: any) => {
  if (e.target.tagName === 'UL' || disabled) return
  let newPage = Number(e.target.textContent)
  const pageOffset = props.maxPages - 2

  const className = e.target.className
  if (className.includes('MoreOutlined')) {
    if (className.includes('quickPrev')) {
      newPage = _currentPage.value - pageOffset
    } else if (className.includes('quickNext')) {
      newPage = _currentPage.value + pageOffset
    }
  }
  // handle boundary
  if (!Number.isNaN(+newPage)) {
    if (newPage < 1) {
      newPage = 1
    }
    if (newPage > totalPages.value) {
      newPage = totalPages.value
    }
  }
  emit('changePage', newPage)
  emit('update:current-page', newPage)
  _currentPage.value = newPage
}
</script>
