<template>
  <div
    ref="itemRef"
    :class="carouselItemCls"
    :style="{ transform: `translateX(${elTranslateX})`}"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { inject, onMounted, ref, watch, computed } from 'vue'
import { CAROUSEL_INJECT_KEY } from '../../carousel/src/constants'
import { useNamespace } from '@/composables'

defineOptions({
  name: 'NCarouselItem'
})

const { itemCount, contentRef, currentIndex } = inject(CAROUSEL_INJECT_KEY, undefined)!

const ns = useNamespace('carousel__content')

const itemRef = ref<HTMLLIElement>()
const itemIndex = ref<number>(0)
const itemWidth = ref<number>()
const isAnimation = ref(false)

onMounted(() => {
  itemCount.value += 1
})

const carouselItemCls = computed(() => [
  ns.e('item'),
  ns.is('animation', isAnimation.value)
])

const elTranslateX = computed<string>(() => {
  if (currentIndex.value === itemCount.value - 1 && itemIndex.value === 0) {
    return itemWidth.value! + 'px'
  }

  if (currentIndex.value === 0 && itemIndex.value === itemCount.value - 1) {
    return -itemWidth.value! + 'px'
  }

  if (itemIndex.value <= Math.floor(itemCount.value / 2)) {
    return Math.abs(currentIndex.value - itemIndex.value) > Math.floor(itemCount.value / 2)
      ? Math.ceil((currentIndex.value - itemIndex.value) / 2) * itemWidth.value! + 'px'
      : (itemIndex.value - currentIndex.value) * itemWidth.value! + 'px'
  }
  else {
    return Math.abs(currentIndex.value - itemIndex.value) > Math.floor(itemCount.value / 2)
      ? -Math.ceil((itemIndex.value - currentIndex.value) / 2) * itemWidth.value! + 'px'
      : (itemIndex.value - currentIndex.value) * itemWidth.value! + 'px'
  }
})

watch(contentRef, (val) => {
  itemIndex.value = Array.from(val!.children).findIndex(v => v === itemRef.value)
  itemWidth.value = val!.getBoundingClientRect().width
})

watch(currentIndex, (val, oldVal) => {
  isAnimation.value = val === itemIndex.value || oldVal === itemIndex.value
})
</script>
