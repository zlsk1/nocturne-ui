<template>
  <div class="fr-progress" :style="{ height: height + 'px' }">
    <div v-if="type === 'line'" class="fr-progress--line">
      <div class="fr-progress__bg"></div>
      <div
        ref="barRef"
        class="fr-progress__bar"
        :style="barStyle"
      >
        <span v-if="$slots.inner" class="fr-progress__bar__inner">
          <slot name="inner"></slot>
        </span>
      </div>
    </div>
    <!-- <div v-if="type === 'round'" class="fr-progress--round">
      <div class="fr-progress__bg"></div>
      <div
        class="fr-progress__bar"
        :style="{ width: percentage + '%' }"
      ></div>
    </div> -->
    <div v-if="$slots.default" class="fr-progress__slot">
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
  name: 'FrProgress'
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

<style lang="scss" scoped>
@import '@/theme-chalk/progress.scss';
</style>
