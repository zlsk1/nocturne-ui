<script lang="ts" setup>
import { onBeforeUnmount, ref, watch } from 'vue'
import { formatTime, getTime } from './utils'
import { countdownEmits, countdownProps } from './countdown'
import { cancelTimer, setTimer } from '@/utils/timer'
import { NStatistic } from '@/components'

defineOptions({
  name: 'NCountdown'
})

const props = defineProps(countdownProps)
const emit = defineEmits(countdownEmits)

const rawValue = ref(getTime(props.value) - Date.now())

let timer: ReturnType<typeof setTimer> | undefined

onBeforeUnmount(() => {
  stopTimer()
})

const formatter = (val: number) => formatTime(val, props.format)

const stopTimer = () => {
  if (timer) {
    cancelTimer(timer)
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
      timer = setTimer(frameFunc)
    }
    rawValue.value = diff
  }
  timer = setTimer(frameFunc)
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
