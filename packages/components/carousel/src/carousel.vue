<template>
  <div :class="ns.b()" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <button
      v-if="showArrow && !$slots.prev && mode !== 'vertical'"
      :class="[
        ns.e('button'),
        ns.em('button', 'left'),
        ns.is('animation', isHover)
      ]"
      :aria-label="t('noc.carousel.leftArrow')"
      :style="{ display: !loop && currentIndex === 0 ? 'none' : 'block' }"
      @click="handlePrev"
    >
      <n-icon>
        <component :is="ArrowLeft" />
      </n-icon>
    </button>
    <slot v-else name="prev" @click="handlePrev" @mouseenter="handlePrev" />
    <div
      ref="contentRef"
      :class="ns.e('content')"
      :style="{ height: height + 'px' }"
    >
      <slot />
    </div>
    <ul
      v-if="!hideIndicator"
      :class="[ns.e('indicator'), ns.em('indicator', indicatorPlacement)]"
    >
      <li
        v-for="(_, i) in itemCount"
        :key="i"
        :class="ns.e('indicator__item')"
        :aria-label="t('noc.carousel.indicator', { index: i + 1 })"
        @click="clickIndicator(i)"
        @mouseenter="() => trigger === 'hover' && switchTo(i)"
      >
        <button
          :class="[
            ns.is('active', i === currentIndex),
            ns.is('circle', indicatorShape === 'circle')
          ]"
        />
      </li>
    </ul>
    <button
      v-if="showArrow && !$slots.next && mode !== 'vertical'"
      :class="[
        ns.e('button'),
        ns.em('button', 'right'),
        ns.is('animation', isHover)
      ]"
      :aria-label="t('noc.carousel.rightArrow')"
      :style="{
        display: !loop && currentIndex === itemCount - 1 ? 'none' : 'block'
      }"
      @click="handleNext"
    >
      <n-icon>
        <component :is="ArrowRight" />
      </n-icon>
    </button>
    <slot v-else name="next" @click="handleNext" @mouseenter="handleNext" />
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, provide, reactive, ref, toRefs, watch } from 'vue'
import { useIntervalFn, useThrottleFn } from '@vueuse/core'
import {
  RiArrowLeftSLine as ArrowLeft,
  RiArrowRightSLine as ArrowRight
} from '@remixicon/vue'
import { NIcon } from '@nocturne-ui/components/icon'
import { useLocale, useNamespace } from '@nocturne-ui/composables'
import { carouselEmits, carouselProps } from './carousel'
import { CAROUSEL_INJECT_KEY } from './constants'

defineOptions({
  name: 'NCarousel'
})

const props = defineProps(carouselProps)
const emit = defineEmits(carouselEmits)

const ns = useNamespace('carousel')
const { t } = useLocale()

let stopInterval: (() => void) | undefined
let startInterval: (() => void) | undefined
const delay = 300

const contentRef = ref<HTMLUListElement>()

const itemCount = ref<number>(0)
const currentIndex = ref(0)
const isHover = ref(false)

const indicatorPlacement = computed(() => {
  const { mode, indicatorPlacement } = props
  if (mode === 'horizontal') {
    return indicatorPlacement || 'bottom'
  } else if (mode === 'vertical') {
    return indicatorPlacement || 'right'
  }
  return 'bottom'
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

const switchTo = (index: number) => {
  currentIndex.value = index
}

const addItem = () => {
  itemCount.value++
}

onMounted(() => {
  setInterval()
})

provide(CAROUSEL_INJECT_KEY, {
  itemCount,
  currentIndex,
  contentRef,
  addItem,
  ...toRefs(
    reactive({
      mode: props.mode
    })
  )
})

defineExpose({
  switchTo
})
</script>
