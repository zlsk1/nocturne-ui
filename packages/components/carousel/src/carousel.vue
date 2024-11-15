<template>
  <div :class="ns.b()" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <button
      v-if="showArrow && !$slots.prev"
      :class="[
        ns.e('button'),
        ns.em('button', 'left'),
        ns.is('animation', isHover)
      ]"
      @click="handlePrev"
    >
      <NIcon>
        <component :is="ArrowLeft" />
      </NIcon>
    </button>
    <div v-else :class="ns.em('slot', 'prev')" @click="handlePrev">
      <slot name="prev" />
    </div>
    <div
      ref="contentRef"
      :class="ns.e('content')"
      :style="{ height: height + 'px' }"
    >
      <slot />
    </div>
    <ul v-if="!hideIndicator" :class="ns.e('indicator')">
      <li
        v-for="(_, i) in itemCount"
        :key="i"
        :class="ns.e('indicator__item')"
        @click="clickIndicator(i)"
      >
        <button
          :class="[
            ns.is('active', i === currentIndex),
            ns.is('round', indicatorShape === 'round')
          ]"
        />
      </li>
    </ul>
    <button
      v-if="showArrow && !$slots.next"
      :class="[
        ns.e('button'),
        ns.em('button', 'right'),
        ns.is('animation', isHover)
      ]"
      @click="handleNext"
    >
      <NIcon v-if="!$slots.next">
        <component :is="ArrowRight" />
      </NIcon>
    </button>
    <div v-else :class="ns.em('slot', 'next')" @click="handleNext">
      <slot name="next" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, provide, ref, watch } from 'vue'
import { useIntervalFn, useThrottleFn } from '@vueuse/core'
import {
  RiArrowLeftSFill as ArrowLeft,
  RiArrowRightSFill as ArrowRight
} from '@remixicon/vue'
import { carouselEmits, carouselProps } from './carousel'
import { CAROUSEL_INJECT_KEY } from './constants'
import { NIcon } from '@/components'
import { useNamespace } from '@/composables'

defineOptions({
  name: 'NCarousel'
})

const props = defineProps(carouselProps)
const emit = defineEmits(carouselEmits)

const ns = useNamespace('carousel')

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
  } else {
    --currentIndex.value
  }
}
const onNext = () => {
  if (currentIndex.value === itemCount.value - 1) {
    currentIndex.value = 0
  } else {
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
  ;({ pause: stopInterval, resume: startInterval } = useIntervalFn(() => {
    handleNext()
  }, props.interval))
}

provide(CAROUSEL_INJECT_KEY, {
  itemCount,
  currentIndex,
  contentRef
})
</script>
