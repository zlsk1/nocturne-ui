<script lang="ts" setup>
import { onBeforeUnmount, ref, watch } from 'vue'
import { formatTime, getTime } from './utils'
import { countdownEmits, countdownProps } from './countdown'
import { cAF, rAF } from '@/utils/raf'
import NStatistic from '@/components/statistic'

defineOptions({
  name: 'NCountdown'
})

const props = defineProps(countdownProps)
const emit = defineEmits(countdownEmits)

const rawValue = ref(getTime(props.value) - Date.now())

let timer: ReturnType<typeof rAF> | undefined

onBeforeUnmount(() => {
  stopTimer()
})

const formatter = (val: number) => formatTime(val, props.format)

const stopTimer = () => {
  if (timer) {
    cAF(timer)
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
    } else {
      timer = rAF(frameFunc)
    }
    rawValue.value = diff
  }
  timer = rAF(frameFunc)
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
  <n-statistic
    :value="rawValue"
    :title="title"
    :suffix-icon="suffixIcon"
    :prefix-icon="prefixIcon"
    :value-style="valueStyle"
    :formatter="formatter"
  >
    <slot />
  </n-statistic>
</template>
