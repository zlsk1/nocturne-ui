<template>
  <div class="n-progress" :style="{ height: height + 'px' }">
    <div v-if="type === 'line'" class="n-progress--line">
      <div class="n-progress__bg"></div>
      <div
        ref="barRef"
        class="n-progress__bar"
        :style="barStyle"
      >
        <span v-if="$slots.inner" class="n-progress__bar__inner">
          <slot name="inner"></slot>
        </span>
      </div>
    </div>
    <!-- <div v-if="type === 'round'" class="n-progress--round">
      <div class="n-progress__bg"></div>
      <div
        class="n-progress__bar"
        :style="{ width: percentage + '%' }"
      ></div>
    </div> -->
    <div v-if="$slots.default" class="n-progress__slot">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'
import { progressProps } from './progress'
import type { ProgressProps } from './progress'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'NProgress'
})

const props = defineProps(progressProps)

const barRef = ref<HTMLElement>()

const barStyle = computed<CSSProperties>(() => {
  return {
    width: props.percentage + '%',
    backgroundColor: props.color as string
  }
})

onMounted(() => {
  props.animationFn ? props.animationFn() : setAnimation()
})

const setAnimation = () => {
  const { percentage, animationDuration }: Pick<ProgressProps, 'percentage' | 'animationDuration'> = props

  const progressKeyframeEffect = new KeyframeEffect(
    barRef.value as Element, // element to animate
    [
      { width: '0%' }, // keyframe
      { width: percentage + '%' } // keyframe
    ],
    {
      duration: animationDuration,
      easing: 'linear'
    }
  )

  const progressAnimation = new Animation(
    progressKeyframeEffect,
    document.timeline
  )

  progressAnimation.play()
}

defineExpose({
  ref: barRef
})
</script>
