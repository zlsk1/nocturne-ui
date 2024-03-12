<script setup>
import { computed, ref } from 'vue'
import { paginationProps, paginationEmits } from './index'

defineOptions({
  name: 'FrPagination'
})

const props = defineProps(paginationProps)
const emit = defineEmits(paginationEmits)

const selectedPage = ref(0)

const _pageCount = computed(() => {
  return typeof (props.pageCount) === 'number'
    ? props.pageCount
    : Number(props.pageCount)
})

const more = computed(() => {
  return selectedPage.value >= props.pageCount - 1
})

const less = computed(() => {
  return selectedPage.value <= 0
})

const changePage = (index) => {
  selectedPage.value = index
  emit('changePage', ++index)
}

const handlePrevPage = () => {
  if (selectedPage.value <= 0) return
  --selectedPage.value
}

const handleNextPage = () => {
  if (selectedPage.value >= props.pageCount - 1) return
  selectedPage.value++
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
    <ul v-if="layout.includes('pages')" class="fr-pagination__pages">
      <li
        v-for="(item, index) in _pageCount"
        :key="index"
        class="fr-pagination__num"
        :class="index === selectedPage ? 'is-active' : ''"
        @click="changePage(index)"
      >
        {{ item }}
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
