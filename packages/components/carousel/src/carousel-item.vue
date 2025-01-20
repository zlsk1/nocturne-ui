<template>
  <div
    ref="itemRef"
    :class="carouselItemCls"
    :style="{
      transform:
        mode === 'horizontal'
          ? `translateX(${translateStyle})`
          : `translateY(${translateStyle})`
    }"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, ref, watch } from 'vue'
import { useNamespace } from '@/composables'
import { CAROUSEL_INJECT_KEY } from './constants'
import { useCarouselItem } from './use-carousel-item'

defineOptions({
  name: 'NCarouselItem'
})

const { itemCount, contentRef, currentIndex, mode, addItem } = inject(
  CAROUSEL_INJECT_KEY,
  undefined
)!

const ns = useNamespace('carousel__content')

const itemRef = ref<HTMLLIElement>()
const itemIndex = ref<number>(0)
const itemRect = ref<number>(0)
const isAnimation = ref(false)

onMounted(() => addItem())

const carouselItemCls = computed(() => [
  ns.e('item'),
  ns.is('animation', isAnimation.value)
])

const { translateStyle } = useCarouselItem(
  currentIndex,
  itemCount,
  itemIndex,
  itemRect
)

watch(contentRef, (val) => {
  itemIndex.value = Array.from(val!.children).findIndex(
    (v) => v === itemRef.value
  )
  itemRect.value =
    mode.value === 'horizontal'
      ? val!.getBoundingClientRect().width
      : val!.getBoundingClientRect().height
})

watch(currentIndex, (val, oldVal) => {
  isAnimation.value = val === itemIndex.value || oldVal === itemIndex.value
})
</script>
