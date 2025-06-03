<template>
  <div :class="ns.m('panel')">
    <div :class="ns.m('panel--main')">
      <ul
        v-for="(item, key) in timeChoosed"
        :key="key"
        :ref="(el: unknown) => setRef(el as any, item)"
        :class="ns.m('panel--list')"
      >
        <li
          v-for="({ value, disabled }, _key) in timelist[item]"
          :key="_key"
          :class="[
            ns.is('selected', timeObj[item] === value),
            ns.is('disabled', disabled)
          ]"
          @click="handleClick(item, value, disabled)"
        >
          {{ leftPad(value, 2) }}
        </li>
      </ul>
    </div>
    <div :class="ns.m('panel__btns')">
      <n-button size="small" text @click="getNow">
        {{ t('noc.datepicker.now') }}
      </n-button>
      <n-button type="primary" size="small" @click="handleConfirm">
        {{ t('noc.datepicker.confirm') }}
      </n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, unref, watch } from 'vue'
import dayjs from 'dayjs'
import NButton from '@nocturne-ui/components/button'
import { useLocale, useNamespace } from '@nocturne-ui/composables'
import { getTimelist } from './composables/use-time-picker'
import { timeUnits } from './constants'
import {
  timePickerPanelEmit,
  timePickerPanelProps
} from './props/time-picker-panel'
import { usePickPanel } from './composables/use-time-panel'
import { leftPad, parseDate } from './util'

import type { Ref } from 'vue'
import type { TimeUnits } from './constants'
import type { Timelist } from './types'
import type { Dayjs } from 'dayjs'

defineOptions({
  name: 'NTimePickerPanel'
})

const props = defineProps(timePickerPanelProps)
const emit = defineEmits(timePickerPanelEmit)

const ns = useNamespace('time-picker')
const { t } = useLocale()

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

const parsedValue = computed(() => {
  const { calculatedValue, userInput } = props
  const parsedValue = userInput
    ? parseDate(userInput, props.format)
    : calculatedValue

  return parsedValue
})

const timeChoosed = computed(() => {
  return props.showSecond ? timeUnits : timeUnits.slice(0, 2)
})
const timeObj = computed<Record<TimeUnits, number>>(() => {
  const hour = parsedValue.value.hour()
  const minute = parsedValue.value.minute()
  const second = parsedValue.value.second()

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

const handleScroll = (
  type: TimeUnits,
  target: number,
  behavior: ScrollToOptions['behavior'] = 'smooth'
) => {
  typeRefs.value[type]?.scrollTo({
    top: target,
    behavior
  })
}

const setRef = (el: any, type: TimeUnits) => {
  typeRefs.value[type] = el ?? undefined
}

const getScrollEl = (type: TimeUnits) =>
  typeRefs.value[type]?.querySelector('li') as HTMLElement

const getItemHeight = (el: HTMLElement) =>
  Number.parseFloat(
    document.defaultView?.getComputedStyle(el).height || el.style.height
  )

const doScroll = (
  type: TimeUnits,
  value: number,
  disabled?: boolean,
  behavior: ScrollToOptions['behavior'] = 'smooth'
) => {
  if (disabled) return
  const scrollEl = getScrollEl(type)
  const height = getItemHeight(scrollEl) * (value / props.step[`${type}Step`])
  handleScroll(type, height, behavior)
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
  emit('pick', changeTo)
}

const handleClick = (type: TimeUnits, value: number, disabled?: boolean) => {
  doScroll(type, value, disabled)
  modifyValue(type, value, disabled)
}

const handleConfirm = () => {
  emit('change', parsedValue.value)
  props.blurPicker?.()
}

const getNow = () => {
  const date = dayjs(new Date())
  emit('change', date)
  props.blurPicker?.()
}

const getDefaultValue = () => dayjs(props.defaultValue)

const getAvailableValue = (date: Dayjs) => {
  return getAvailableTime(date)
}

watch(
  () => props.visible,
  (val) => {
    if (val) {
      nextTick(() => {
        doScroll('hour', timeObj.value['hour'], false, 'auto')
        doScroll('minute', timeObj.value['minute'], false, 'auto')
        doScroll('second', timeObj.value['second'], false, 'auto')
      })
    }
  }
)

emit('setPickerMethods', ['getDefaultValue', getDefaultValue])
emit('setPickerMethods', ['getAvailableValue', getAvailableValue])
</script>
