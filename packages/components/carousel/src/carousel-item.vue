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
import { computed, inject, onMounted, onUnmounted, ref, watch } from 'vue'
import { useNamespace } from '@nocturne-ui/composables'
import { CAROUSEL_INJECT_KEY } from './constants'
import { useCarouselItem } from './use-carousel-item'

defineOptions({
  name: 'NCarouselItem'
})

const { itemCount, contentRef, currentIndex, mode, addItem, removeItem } =
  inject(CAROUSEL_INJECT_KEY, undefined)!

const ns = useNamespace('carousel__content')

const itemRef = ref<HTMLLIElement>()
const itemIndex = ref<number>(0)
const itemRect = ref<number>(0)
const isAnimation = ref(false)

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

watch(currentIndex, (val, oldVal) => {
  isAnimation.value = val === itemIndex.value || oldVal === itemIndex.value
})

onMounted(() => {
  addItem()

  if (itemRef.value) {
    itemIndex.value = Array.from(contentRef.value!.children).indexOf(
      itemRef.value
    )
  }
  itemRect.value =
    mode.value === 'horizontal'
      ? contentRef.value!.getBoundingClientRect().width
      : contentRef.value!.getBoundingClientRect().height
})

onUnmounted(() => removeItem())
</script>
