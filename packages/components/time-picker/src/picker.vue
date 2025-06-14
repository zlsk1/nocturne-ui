<template>
  <n-tooltip
    ref="popperRef"
    v-bind="$attrs"
    :visible="visible"
    :transition="`${ns.ns.value}-zoom-in-top`"
    trigger="click"
    :gpu-acceleration="false"
    pure
    persistent
    :disabled="actualDisabled"
    :popper-class="[popperClass!]"
    :popper-options="popperOptions"
    @before-show="onBeforeShow"
    @show="onShow"
    @hide="onHide"
  >
    <div
      :class="ns.b()"
      @mouseenter="onMouseEnterInput"
      @mouseleave="onMouseLeaveInput"
      @click.stop="onMouseDownInput"
    >
      <n-input
        :id="id || formItemId"
        ref="inputRef"
        :model-value="displayedValue"
        :placeholder="placeholder || t('noc.datepicker.selectTime')"
        :disabled="actualDisabled"
        :size="actualSize"
        :readonly="readonly"
        :name="name"
        :tabindex="tabindex"
        @input="(val) => onInput(val as string)"
        @change="onInputChange"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
      >
        <template #prefix>
          <slot name="prefix" />
        </template>
        <template #suffix>
          <transition :name="`${ns.ns.value}-fade-in`">
            <n-icon
              v-if="showClose && displayedValue"
              size="16"
              :class="ns.e('suffixicon')"
              @click="onClearValue"
            >
              <component :is="clearIcon" />
            </n-icon>
            <n-icon v-else size="16" :class="ns.e('suffixicon')">
              <component :is="suffixIcon" />
            </n-icon>
          </transition>
        </template>
      </n-input>
    </div>
    <template #content>
      <slot
        :calculated-value="calculatedValue"
        :user-input="userInput"
        :visible="visible"
        :step="{
          hourStep,
          minuteStep,
          secondStep
        }"
        :disabled="{
          disabledHours,
          disabledMinutes,
          disabledSeconds
        }"
        :format="format"
        :default-value="defaultValue"
        :blur-picker="blur"
        @change="handleChange"
        @pick="handlePick"
        @set-picker-methods="setPickerMethods"
      />
    </template>
  </n-tooltip>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import dayjs from 'dayjs'
import { isEqual } from 'lodash'
import {
  useFocusController,
  useLocale,
  useNamespace
} from '@nocturne-ui/composables'
import NIcon from '@nocturne-ui/components/icon'
import NInput from '@nocturne-ui/components/input'
import NTooltip from '@nocturne-ui/components/tooltip'
import { useForm, useFormItem } from '@nocturne-ui/components/form'
import { consoleWarn, isString } from '@nocturne-ui/utils'
import { parseDate } from './util'
import { pickerEmit, pickerProps } from './props/picker'

import type { Dayjs } from 'dayjs'
import type { InputInstance, TooltipInstance } from '@nocturne-ui/components'
import type { PickerMethods } from './types'

defineOptions({
  name: 'NPicker'
})

const props = defineProps(pickerProps)
const emit = defineEmits(pickerEmit)

const ns = useNamespace('picker')
const { formItemDisabled, formItemId, formItemSize } = useFormItem()
const { formItem } = useForm()
const { t } = useLocale()

const visible = ref(false)
const showClose = ref(false)

// values
const userInput = ref<string | undefined>(undefined)

// refs
const inputRef = ref<InputInstance>()
const popperRef = ref<TooltipInstance>()

const pickerMethods = ref<Partial<PickerMethods>>({})

const { isFocused, handleFocus, handleBlur } = useFocusController(inputRef, {
  beforeFocus() {
    return props.readonly || actualDisabled.value
  },
  afterFocus() {
    visible.value = true
  },
  beforeBlur(event) {
    const cancel = popperRef.value?.isFocusInsideContent(event)
    if (cancel) {
      focus()
    }

    return cancel
  },
  afterBlur() {
    visible.value = false
    formItem?.validate('blur').catch((err) => consoleWarn(err))
  }
})

// generate timelist
const calculatedValue = computed(() => {
  let day: Dayjs
  const { modelValue, format } = props

  if (!modelValue || (Array.isArray(modelValue) && modelValue.length !== 0)) {
    if (pickerMethods.value.getDefaultValue) {
      day = pickerMethods.value.getDefaultValue()
    }
  } else {
    if (modelValue) {
      day = parseDate(modelValue, format)
    }
  }

  // if (pickerMethods.value.getAvailableValue) {
  //   const availableValue = pickerMethods.value.getAvailableValue(day!)
  //   if (!isEqual(availableValue, day!)) {
  //     day = availableValue

  //     emitChange(day)
  //   }
  // }

  return day!
})

const displayedValue = computed(() => {
  if (!visible.value && !props.modelValue) return ''

  if (userInput.value) {
    return userInput.value
  }

  const formattedValue = formatDayjsToString(calculatedValue.value)
  if (formattedValue) return formattedValue

  return ''
})

const actualDisabled = computed(() => formItemDisabled.value || props.disabled)
const actualSize = computed(() => formItemSize.value || props.size)

const onMouseDownInput = async (event: MouseEvent) => {
  if (props.readonly || actualDisabled.value) return
  if ((event.target as HTMLElement)?.tagName !== 'INPUT' || isFocused.value) {
    visible.value = true
  }
}

const onMouseEnterInput = () => {
  if (props.readonly || actualDisabled.value) return
  showClose.value = true
}

const onMouseLeaveInput = () => {
  showClose.value = false
}

const formatDayjsToString = (value: Dayjs, format: string = props.format) => {
  if (!value) return undefined
  return dayjs(value).format(format)
}

const onBeforeShow = () => {
  if (props.readonly) {
    visible.value = false
    return
  }
  visible.value = true
  emit('visible-change', true)
}

const onShow = () => {
  emit('visible-change', true)
}

const onHide = () => {
  visible.value = false
  emit('visible-change', false)
}

const onInputChange = () => {
  if (userInput.value) {
    const parsed = dayjs(userInput.value, props.format, true)
    const isValid = parsed.isValid()
    if (isValid) {
      handleChange(parsed)
    }
  }
}

const onInput = (e: string) => {
  userInput.value = e
}

const onClearValue = (e: MouseEvent) => {
  if (props.readonly || props.disabled) return

  if (showClose.value) {
    e.stopPropagation()
    userInput.value = ''
    showClose.value = false

    emitChange('', true)
    emit('update:modelValue', '')
    onHide()
  }
}

const emitChange = (val: Dayjs | string, isClear?: boolean) => {
  if (isClear || !isEqual(val, calculatedValue.value)) {
    emit('change', val, isString(val) ? val : val.format(props.format))
    formItem?.validate('change').catch((err) => consoleWarn(err))
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  switch (e.code) {
    case 'Escape':
      onHide()
      break
  }
}

const handleChange = (time: Dayjs) => {
  emitChange(time)
  emit('update:modelValue', time)
  onHide()
}

const handlePick = (time: Dayjs) => {
  userInput.value = formatDayjsToString(time)
}

const focus = () => inputRef.value?.focus()
const blur = () => inputRef.value?.blur()

const setPickerMethods = <T extends keyof PickerMethods>(
  val: [T, PickerMethods[T]]
) => {
  pickerMethods.value[val[0]] = val[1]
}

watch(visible, (val) => {
  if (!val) {
    userInput.value = undefined
  }
})

defineExpose({
  focus,
  blur,
  openPopper: popperRef.value?.onOpen()
})
</script>
