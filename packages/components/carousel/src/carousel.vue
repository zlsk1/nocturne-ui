<template>
  <div
    class="n-carousel"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
  >
    <button
      v-if="showArrow && !$slots.prev"
      :class="[
        'n-carousel__button',
        'n-carousel__button--left',
        { 'is-animation': isHover }
      ]"
      @click="handlePrev"
    >
      <NIcon icon="arrow-left"></NIcon>
    </button>
    <div
      v-else
      class="n-carousel__slot--prev"
      @click="handlePrev"
    >
      <slot name="prev"></slot>
    </div>
    <div
      ref="contentRef"
      class="n-carousel__content"
      :style="{ height: height + 'px' }"
    >
      <slot></slot>
    </div>
    <ul v-if="!hideIndicator" class="n-carousel__indicator">
      <li
        v-for="(_, i) in itemCount"
        :key="i"
        :class="[
          'n-carousel__indicator__item'
        ]"
        @click="clickIndicator(i)"
      >
        <button
          :class="[
            { 'is-active': i === currentIndex,
              'is-round': indicatorShape === 'round'
            },
          ]"
        ></button>
      </li>
    </ul>
    <button
      v-if="showArrow && !$slots.next"
      :class="[
        'n-carousel__button',
        'n-carousel__button--right',
        { 'is-animation': isHover }
      ]"
      @click="handleNext"
    >
      <NIcon v-if="!$slots.next" icon="arrow-right"></NIcon>
    </button>
    <div
      v-else
      class="n-carousel__slot--next"
      @click="handleNext"
    >
      <slot name="next"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, provide, ref, watch } from 'vue'
import { carouselProps, carouselEmits } from './carousel'
import { NIcon } from '@/components'
import { CAROUSEL_INJECT_KEY } from './constants'
import { useIntervalFn, useThrottleFn } from '@vueuse/core'

defineOptions({
  name: 'NCarousel'
})

const props = defineProps(carouselProps)
const emit = defineEmits(carouselEmits)

let stopInterval: (() => void) | undefined
let startInterval: (() => void) | undefined
const delay = 300

const contentRef = ref<HTMLUListElement>()

const itemCount = ref<number>(0)
const currentIndex = ref(0)
const isHover = ref(false)

onMounted(() => {
  setInterval()
})

watch(currentIndex, (newVal, oldVal) => {
  emit('change', newVal, oldVal)
})

const onPrev = () => {
  if (currentIndex.value === 0) {
    currentIndex.value = itemCount.value - 1
  }
  else {
    --currentIndex.value
  }
}
const onNext = () => {
  if (currentIndex.value === itemCount.value - 1) {
    currentIndex.value = 0
  }
  else {
    ++currentIndex.value
  }
}

const handlePrev = useThrottleFn(onPrev, delay)
const handleNext = useThrottleFn(onNext, delay)

const clickIndicator = (val: number) => {
  currentIndex.value = val
}

const onMouseenter = () => {
  stopInterval?.()

  isHover.value = true
}

const onMouseleave = () => {
  startInterval?.()

  isHover.value = false
}

const setInterval = () => {
  if (!props.autoplay) return
  ({ pause: stopInterval, resume: startInterval } = useIntervalFn(() => {
    handleNext()
  }, props.interval))
}

provide(CAROUSEL_INJECT_KEY, {
  itemCount,
  currentIndex,
  contentRef
})
</script>

<style lang="scss" scoped>
@use '@/theme-chalk/src/carousel.scss';
</style>
