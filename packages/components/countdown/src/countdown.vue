<script lang="ts" setup>
import { ref, onBeforeUnmount, watch } from 'vue'
import { getTime, formatTime } from './utils'
import { countdownProps, countdownEmits } from './countdown'

defineOptions({
  name: 'FrCountdown'
})

const props = defineProps(countdownProps)
const emit = defineEmits(countdownEmits)

const rawValue = ref(getTime(props.value) - Date.now())

let timer

onBeforeUnmount(() => {
  stopTimer()
})

const formatter = (val) => formatTime(val, props.format)

const stopTimer = () => {
  if (timer) {
    cancelAnimationFrame(timer)
    timer = undefined
  }
}

const startTimer = () => {
  const timestamp = getTime(props.value)

  const frameFunc = () => {
    let diff = timestamp - Date.now()
    emit('change', diff)
    if (diff <= 0) {
      diff = 0
      stopTimer()
      emit('finish')
    }
    else {
      timer = requestAnimationFrame(frameFunc)
    }
    rawValue.value = diff
  }
  timer = requestAnimationFrame(frameFunc)
}

watch(
  () => [props.value, props.format],
  () => {
    stopTimer()
    startTimer()
  },
  {
    immediate: true
  }
)
</script>

<template>
  <fr-statistic
    :value="rawValue"
    :title="title"
    :suffix-icon="suffixIcon"
    :prefix-icon="prefixIcon"
    :value-style="valueStyle"
    :formatter="formatter"
  >
    <slot></slot>
  </fr-statistic>
</template>

<style>
@import '@/theme-chalk/countdown.scss';
</style>
