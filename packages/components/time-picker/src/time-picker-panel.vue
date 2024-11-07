<template>
  <div class="n-time-picker--panel">
    <div class="n-time-picker--panel__main">
      <ul
        v-for="(item, key) in timeChoosed"
        :key="key"
        :ref="(el: unknown) => setRef(el as any, item)"
        class="n-panel__children"
      >
        <li
          v-for="(_, index) in timelist[item]"
          :key="index"
          :class="[
            {'active': timeObj[item] === index}
          ]"
          @mouseenter="handleMouseEnter"
          @click="handleClick(item, index)"
        >
          {{ index < 10 ? `0${index}` : index }}
        </li>
      </ul>
    </div>
    <div class="n-time-picker--panel__btns">
      <NButton
        size="small"
        text
        @click="getNow"
      >
        此刻
      </NButton>
      <NButton
        type="primary"
        size="small"
        @click="handleConfirm"
      >
        确定
      </NButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, inject, watch, onMounted } from 'vue'
import { timePickerPanelProps, timePickerPanelEmit } from './time-picker-panel'
import { timeUnits } from './constants'
import { getTimeList } from './composables/use-time-picker'
import dayjs from 'dayjs'
import { TIMEPICKER_INJECTION_KEY, TimeUnits } from './constants'
import { NButton } from '@/components'
import type { Ref } from 'vue'

defineOptions({
  name: 'NPickerPanel'
})

// const { currentValue } = inject(TIMEPICKER_INJECTION_KEY, undefined)!

const props = defineProps(timePickerPanelProps)
const emit = defineEmits(timePickerPanelEmit)

const typeHourRef = ref<HTMLElement>()
const typeMinuteRef = ref<HTMLElement>()
const typeSecondRef = ref<HTMLElement>()
const typeRefs = ref<Record<TimeUnits, Ref<HTMLElement | undefined>>>({
  hour: typeHourRef,
  minute: typeMinuteRef,
  second: typeSecondRef
})

const timeChoosed = computed(() => {
  return props.showSecond ? timeUnits : timeUnits.slice(0, 2)
})
const timelist = computed(() => {
  return getTimeList()
})
const timeObj = computed<Record<TimeUnits, number>>(() => {
  const hour = props.currentTime.hour()
  const minute = props.currentTime.minute()
  const second = props.currentTime.second()

  return {
    hour,
    minute,
    second
  }
})

const handleMouseEnter = (e: Event) => {
  // console.log(e.target.dataset, (e.target as HTMLElement).parentElement?.dataset)
}

const handleClick = (type: TimeUnits, value: number) => {
  doScroll(type, value)
  modifyValue(type, value)
}

const handleScroll = (type: TimeUnits, target: number) => {
  typeRefs.value[type]?.scrollTo({ top: target })
}

const setRef = (el: any, type: TimeUnits) => {
  typeRefs.value[type] = el ?? undefined
}

const getNow = () => {
  emit('change', dayjs(new Date()))
  props.tooltipRef?.hide()
}

const getScrollEl = (type: TimeUnits) => typeRefs.value[type]?.querySelector('li') as HTMLElement

const getItemHeight = (el: HTMLElement) => parseFloat(document.defaultView?.getComputedStyle((el)).height || el.style.height)

const doScroll = (type: TimeUnits, value: number) => {
  const scrollEl = getScrollEl(type)
  const height = getItemHeight(scrollEl) * value
  handleScroll(type, height)
}

const modifyValue = (type: TimeUnits, value: number) => {
  const { hour, minute, second } = timeObj.value

  let changeTo
  switch (type) {
    case 'hour':
      changeTo = props.currentTime.hour(value).minute(minute).second(second)
      break
    case 'minute':
      changeTo = props.currentTime.hour(hour).minute(value).second(second)
      break
    case 'second':
      changeTo = props.currentTime.hour(hour).minute(minute).second(value)
      break
  }
  emit('change', changeTo)
}

const handleConfirm = () => {
  props.tooltipRef?.hide()
}

onMounted(() => {
  doScroll('hour', timeObj.value['hour'])
  doScroll('minute', timeObj.value['minute'])
  doScroll('second', timeObj.value['second'])
})
</script>
