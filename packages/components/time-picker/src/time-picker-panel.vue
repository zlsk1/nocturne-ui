<template>
  <div :class="ns.m('panel')">
    <div :class="ns.m('panel__main')">
      <ul
        v-for="(item, key) in timeChoosed"
        :key="key"
        :ref="(el: unknown) => setRef(el as any, item)"
        :class="`${ns.ns.value}-panel__children`"
      >
        <li
          v-for="({ value, disabled }, _key) in timelist[item]"
          :key="_key"
          :class="[
            ns.is('active', timeObj[item] === value),
            ns.is('disabled', disabled)
          ]"
          @click="handleClick(item, value, disabled)"
        >
          {{ value < 10 ? `0${value}` : value }}
        </li>
      </ul>
    </div>
    <div :class="ns.m('panel__btns')">
      <n-button size="small" text @mousedown="getNow"> 此刻 </n-button>
      <n-button type="primary" size="small" @mousedown="handleConfirm">
        确定
      </n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, unref, watch } from 'vue'
import dayjs from 'dayjs'
import { NButton } from '@/components'
import { useNamespace } from '@/composables'
import { getTimelist } from './composables/use-time-picker'
import { timeUnits } from './constants'
import {
  timePickerPanelEmit,
  timePickerPanelProps
} from './props/time-picker-panel'
import { usePickPanel } from './composables/use-pick-panel'

import type { Ref } from 'vue'
import type { TimeUnits } from './constants'
import type { Timelist } from './type'
import type { Dayjs } from 'dayjs'

defineOptions({
  name: 'NPickerPanel'
})

const props = defineProps(timePickerPanelProps)
const emit = defineEmits(timePickerPanelEmit)

const ns = useNamespace('time-picker')

const { getHourlist, getMinutelist, getSecondlist } = getTimelist(
  {
    hour: props.step.hourStep,
    minute: props.step.minuteStep,
    second: props.step.secondStep
  },
  {
    disabledHours: props.disabled?.disabledHours,
    disabledMinutes: props.disabled?.disabledMinutes,
    disabledSeconds: props.disabled?.disabledSeconds
  }
)

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
const timeObj = computed<Record<TimeUnits, number>>(() => {
  const { calculatedValue } = props
  const hour = calculatedValue.hour()
  const minute = calculatedValue.minute()
  const second = calculatedValue.second()

  return {
    hour,
    minute,
    second
  }
})
const timelist = computed<Timelist>(() => {
  const { hour, minute } = unref(timeObj)
  return {
    hour: getHourlist(),
    minute: getMinutelist(hour),
    second: getSecondlist(hour, minute)
  }
})

const { getAvailableTime } = usePickPanel(timelist.value)

watch(
  () => props.visible,
  (val) => {
    if (val) {
      nextTick(() => {
        doScroll('hour', timeObj.value['hour'])
        doScroll('minute', timeObj.value['minute'])
        doScroll('second', timeObj.value['second'])
      })
    }
  }
)

const handleClick = (type: TimeUnits, value: number, disabled?: boolean) => {
  doScroll(type, value, disabled)
  modifyValue(type, value, disabled)
}

const handleScroll = (type: TimeUnits, target: number) => {
  typeRefs.value[type]?.scrollTo({ top: target })
}

const setRef = (el: any, type: TimeUnits) => {
  typeRefs.value[type] = el ?? undefined
}

const getScrollEl = (type: TimeUnits) =>
  typeRefs.value[type]?.querySelector('li') as HTMLElement

const getItemHeight = (el: HTMLElement) =>
  parseFloat(
    document.defaultView?.getComputedStyle(el).height || el.style.height
  )

const doScroll = (type: TimeUnits, value: number, disabled?: boolean) => {
  if (disabled) return
  const scrollEl = getScrollEl(type)
  const height = getItemHeight(scrollEl) * (value / props.step[`${type}Step`])
  handleScroll(type, height)
}

const modifyValue = (type: TimeUnits, value: number, disabled?: boolean) => {
  if (disabled) return
  const { hour, minute, second } = timeObj.value

  let changeTo
  switch (type) {
    case 'hour':
      changeTo = props.calculatedValue.hour(value).minute(minute).second(second)
      break
    case 'minute':
      changeTo = props.calculatedValue.hour(hour).minute(value).second(second)
      break
    case 'second':
      changeTo = props.calculatedValue.hour(hour).minute(minute).second(value)
      break
  }
  emit('change', changeTo)
}

const handleConfirm = () => {
  emit('pick', props.calculatedValue)
}

const getNow = () => {
  const date = dayjs(new Date())

  emit('change', date, true)
}

const getDefaultValue = () => dayjs(props.defaultValue)

const getAvailableValue = (date: Dayjs) => {
  return getAvailableTime(date)
}

onMounted(() => {
  doScroll('hour', timeObj.value['hour'])
  doScroll('minute', timeObj.value['minute'])
  doScroll('second', timeObj.value['second'])
})

emit('setPickerMethods', ['getDefaultValue', getDefaultValue])
emit('setPickerMethods', ['getAvailableValue', getAvailableValue])
</script>
