<!-- eslint-disable vue/no-v-model-argument -->
<template>
  <div class="n-picker">
    <n-tooltip
      v-bind="$attrs"
      v-model:visible="visible"
      :transition="transition"
      trigger="click"
      :gpu-acceleration="false"
      pure
      persistent
      :disabled="disabled"
      :popper-class="popperClass"
      :hide-after="0"
      :popper-options="popperOptions"
      @before-show="onBeforeShow"
      @show="onShow"
      @hide="onHide"
    >
      <n-input
        ref="inputRef"
        :model-value="displayedValue"
        :prefix-icon="prefixIcon"
        :placeholder="placeholder"
        :disabled="disabled"
        :size="size"
        :read-only="readonly"
        :name="name"
        :tabindex="tabindex"
        @click.stop
        @mouseenter="onMouseEnterInput"
        @mouseleave="onMouseLeaveInput"
        @input="(val) => onInput(val as string)"
        @change="onInputChange"
      >
        <template #suffix>
          <transition name="n-fade-in">
            <n-icon
              v-if="!disabled && showClose && clearIcon && displayedValue"
              @click.stop="onClearValue"
              @mousedown.prevent
            >
              <component
                :is="clearIcon"
                size="14"
                class="n-picker__clearicon"
              ></component>
            </n-icon>
          </transition>
        </template>
      </n-input>
      <template #content>
        <slot
          :calculated-value="calculatedValue"
          :visible="visible"
          :step="{
            hourStep,
            minuteStep,
            secondStep,
          }"
          :disabled="{
            disabledHours,
            disabledMinutes,
            disabledSeconds,
          }"
          :format="format"
          :default-value="defaultValue"
          @change="handleChange"
          @pick="handlePick"
          @set-picker-methods="setPickerMethods"
        ></slot>
      </template>
    </n-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { NInput, NTooltip, NIcon } from '@/components'
import { pickerProps, pickerEmit } from './props/picker'
import dayjs from 'dayjs'
import { parseDate, formatter } from './util'
import { isEqual } from 'lodash'

import type { Dayjs } from 'dayjs'
import type { InputInstance } from '@/components'
import type { PickerMethods } from './type'

defineOptions({
  name: 'NPicker'
})

const props = defineProps(pickerProps)
const emit = defineEmits(pickerEmit)

const visible = ref(false)
const inputValue = ref<string | null>(null)
const showClose = ref(false)
const inputRef = ref<InputInstance>()
const pickerMethods = ref<Partial<PickerMethods>>({})

const calculatedValue = computed(() => {
  let day: Dayjs
  const { modelValue } = props

  if (!modelValue || (Array.isArray(modelValue) && modelValue.length !== 0)) {
    if (pickerMethods.value.getDefaultValue) {
      day = pickerMethods.value.getDefaultValue()
    }
  }
  else {
    if (inputValue.value) {
      day = parseDate(inputValue.value, props.valueFormat)
    }
    else if (inputValue.value === null) {
      day = parseDate(modelValue, props.valueFormat)
    }
  }

  if (pickerMethods.value.getAvailableValue) {
    const availableValue = pickerMethods.value.getAvailableValue(day!)
    if (!isEqual(availableValue, day!)) {
      day = availableValue

      if (!modelValue || (Array.isArray(modelValue) && modelValue.length !== 0)) {
        emit('change', day.toDate())
      }
    }
  }

  return day!
})

const displayedValue = computed(() => {
  const formattedValue = formatDayjsToString(calculatedValue.value)

  if (inputValue.value) {
    return inputValue.value
  }
  if (!visible.value && !props.modelValue) return ''
  if (formattedValue) return formattedValue
  return ''
})

watch(visible, (val) => {
  if (!val) {
    inputValue.value = null
  }
})

const onClearValue = () => {
  emit('update:modelValue', '')
}

const handleChange = (time: Dayjs, modify?: 'getNow') => {
  const formatedValue = formatter(time, props.valueFormat)
  if (modify && modify === 'getNow') {
    emit('change', formatedValue)
    emit('update:modelValue', formatedValue)
    onHide()
  }
  inputValue.value = formatDayjsToString(time)
  emit('change', formatedValue)
}

const handlePick = (time: Dayjs) => {
  emit('update:modelValue', formatter(time, props.valueFormat))
  onHide()
}

const onMouseEnterInput = () => {
  showClose.value = true
}

const onMouseLeaveInput = () => {
  showClose.value = false
}

const formatDayjsToString = (value: Dayjs, format: string = props.format) => {
  if (!value) return null
  return dayjs(value).format(format)
}

const onBeforeShow = () => {
  visible.value = true
  emit('visible-change', true)
}

const onShow = () => {
}

const onHide = () => {
  visible.value = false
  emit('visible-change', false)
}

const onInputChange = () => {
  if (inputValue.value) {
    const value = dayjs(displayedValue.value, props.valueFormat)
    if (value) {
      emit('update:modelValue', value)
    }
  }
}

const onInput = (e: string) => {
  inputValue.value = e
}

const focus = () => inputRef.value?.focus()
const blur = () => inputRef.value?.blur()

const setPickerMethods = <T extends keyof PickerMethods>(val: [T, PickerMethods[T]]) => {
  pickerMethods.value[val[0]] = val[1]
}

defineExpose({
  focus,
  blur
})
</script>
