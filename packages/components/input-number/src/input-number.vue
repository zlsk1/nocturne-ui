<template>
  <div
    :class="[
      ns.b(),
      ns.is('disabled', actualDisabled),
      ns.m(props.controlsMode),
      ns.m(props.size)
    ]"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <template v-if="controls">
      <template v-if="controlsMode === 'outter'">
        <span
          v-long-press="handleIncrease"
          :class="[
            ns.e('control'),
            ns.em('control', 'increase'),
            ns.is('exceed', isMoreMax)
          ]"
          role="button"
          :aria-label="t('noc.inputNumber.increase')"
          :aria-disabled="isMoreMax"
        >
          <slot name="increaseIcon">
            <Add v-if="controlsMode === 'outter'" size="16" />
          </slot>
        </span>
        <span
          v-long-press="handleDecrease"
          :class="[
            ns.e('control'),
            ns.em('control', 'decrease'),
            ns.is('exceed', isLessMin)
          ]"
          role="button"
          :aria-label="t('noc.inputNumber.decrease')"
          :aria-disabled="isLessMin"
        >
          <slot name="decreaseIcon">
            <Subtract v-if="controlsMode === 'outter'" size="16" />
          </slot>
        </span>
      </template>
      <transition name="fade-in-linear">
        <div
          v-show="isHover && controlsMode === 'inner'"
          :class="[ns.em('control', 'inner')]"
        >
          <span
            v-long-press="handleIncrease"
            :class="[
              ns.e('control'),
              ns.em('control', 'increase'),
              ns.is('exceed', isMoreMax)
            ]"
            role="button"
            :aria-label="t('noc.inputNumber.increase')"
            :aria-disabled="isMoreMax"
          >
            <slot name="increaseIcon">
              <ArrowUp size="14" />
            </slot>
          </span>
          <span
            v-long-press="handleDecrease"
            :class="[
              ns.e('control'),
              ns.em('control', 'decrease'),
              ns.is('exceed', isLessMin)
            ]"
            role="button"
            :aria-label="t('noc.inputNumber.decrease')"
            :aria-disabled="isLessMin"
          >
            <slot name="decreaseIcon">
              <ArrowDown size="14" />
            </slot>
          </span>
        </div>
      </transition>
    </template>
    <n-input
      :id="formItemId"
      ref="inputRef"
      :size="actualSize"
      type="number"
      :model-value="displayedValue"
      :disabled="actualDisabled"
      :readonly="readonly"
      :max="max"
      :min="min"
      :step="step"
      :auto-focus="autoFocus"
      :aria-valuenow="modelValue || modelValue === 0 ? modelValue : ''"
      :aria-disabled="actualDisabled"
      @blur="handleBlur"
      @focus="handleFocus"
      @keydown.up.prevent="handleIncrease"
      @keydown.down.prevent="handleDecrease"
      @change="handleChange"
      @input="handleInput"
    >
      <template #prefix>
        <span v-if="$slots.prefix" :class="ns.e('prefix')">
          <slot name="prefix" />
        </span>
      </template>
      <template #suffix>
        <span v-if="$slots.suffix" :class="ns.e('suffix')">
          <slot name="suffix" />
        </span>
      </template>
    </n-input>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import {
  RiAddLine as Add,
  RiArrowDownSLine as ArrowDown,
  RiArrowUpSLine as ArrowUp,
  RiSubtractLine as Subtract
} from '@remixicon/vue'
import NInput from '@nocturne-ui/components/input'
import {
  useFocusController,
  useLocale,
  useNamespace
} from '@nocturne-ui/composables'
import { useForm, useFormItem } from '@nocturne-ui/components/form'
import { consoleWarn, isNumber, isUndefined } from '@nocturne-ui/utils'
import { vLongPress } from '@nocturne-ui/directives'
import { inputNumberEmits, inputNumberProps } from './input-number'
import type { InputInstance } from '@nocturne-ui/components/input/src/input'

interface State {
  userInput: string | null | number
  model: string | number | undefined
}

defineOptions({
  name: 'NInputNumber'
})

const props = defineProps(inputNumberProps)
const emit = defineEmits(inputNumberEmits)

const ns = useNamespace('input-number')
const { formItemId, formItemDisabled, formItemSize } = useFormItem()
const { formItem } = useForm()
const { t } = useLocale()

const inputRef = ref<InputInstance>()
const state = reactive<State>({
  userInput: null,
  model: props.modelValue
})
const isHover = ref(false)

// @ts-ignore
const { handleBlur, handleFocus } = useFocusController(inputRef, {
  afterBlur: () => {
    formItem?.validate('blur')
  }
})

const isLessMin = computed(() => {
  return isNumber(props.modelValue) && props.modelValue <= props.min
})

const isMoreMax = computed(() => {
  return isNumber(props.modelValue) && props.modelValue >= props.max
})

// 允许用户输入不合规的值，在输入框失焦时再处理
const displayedValue = computed(() => {
  if (state.userInput !== null) {
    return state.userInput
  }

  let currentValue: number | string | undefined = state.model
  if (isUndefined(currentValue)) return ''
  if (isNumber(currentValue)) {
    if (Number.isNaN(currentValue)) return ''
    if (!isUndefined(props.precision)) {
      currentValue = currentValue.toFixed(props.precision)
    }
  }
  return currentValue
})

const currentPrecision = computed(() => {
  const pos = getPrecision(props.step)

  if (!isUndefined(props.precision)) {
    if (pos > props.precision) {
      consoleWarn('n-input-number', 'step should be less than the precision')
    }
    return props.precision
  }

  return Math.max(getPrecision(props.modelValue), pos)
})

const actualDisabled = computed(() => formItemDisabled.value || props.disabled)
const actualSize = computed(() => formItemSize.value || props.size)

const ensureModel = (value: string | number | undefined) => {
  if (value === '') return undefined

  const { max, min, precision, step } = props
  let newValue = Number(value)

  if (isUndefined(newValue) || Number.isNaN(newValue)) {
    return undefined
  }

  newValue = toPrecision(Math.round(newValue / step) * step, precision)

  if (!isUndefined(precision)) {
    newValue = toPrecision(newValue, precision)
  }
  if (newValue > max || newValue < min) {
    newValue = newValue > max ? max : min
    emit('update:modelValue', newValue)
  }

  return newValue
}

const setModel = (value: string | number | undefined) => {
  const oldValue = state.model
  const newValue = ensureModel(value)

  if (oldValue === newValue && value) return

  state.userInput = null

  emit('change', newValue)

  if (newValue !== oldValue) {
    emit('update:modelValue', newValue)
  }

  formItem?.validate('change')

  state.model = newValue
}

const getPrecision = (num: number | undefined) => {
  if (isUndefined(num)) return 0
  const str = String(num)
  const pointPos = str.indexOf('.')
  return pointPos === -1 ? 0 : str.length - pointPos - 1
}

const toPrecision = (num: number, pre?: number) => {
  if (isUndefined(pre)) pre = currentPrecision.value
  if (pre === 0) return Math.round(num)

  let snum = String(num)
  const pointPos = snum.indexOf('.')

  if (pointPos === -1) return num

  const length = snum.length

  if (snum.charAt(length - 1) === '5') {
    snum = `${snum.slice(0, Math.max(0, length - 1))}6`
  }
  return Number.parseFloat(Number(snum).toFixed(pre))
}

const handleIncrease = () => {
  if (isMoreMax.value || actualDisabled.value || props.readonly) return

  let value = Number(displayedValue.value) || 0
  value = toPrecision(value + props.step)

  emit('input', value)
  setModel(value)
}

const handleDecrease = () => {
  if (isLessMin.value || actualDisabled.value || props.readonly) return

  let value = Number(displayedValue.value) || 0
  value = toPrecision(value + props.step * -1)

  emit('input', value)
  setModel(value)
}

const blur = () => {
  inputRef.value?.inputRef?.blur()
}

const focus = () => {
  inputRef.value?.inputRef?.focus()
}

const handleChange = (val: number | string) => {
  const newVal = val === '' ? undefined : Number(val)

  if (isNumber(newVal) && !Number.isNaN(newVal)) {
    setModel(newVal)
  }

  state.userInput = null
}

const handleInput = (val: string) => {
  state.userInput = val

  const newVal = val === '' ? undefined : Number(val)

  emit('input', newVal)
  setModel(newVal)
}

watch(
  () => props.modelValue,
  (val) => {
    state.model = val
  }
)

onMounted(() => {
  const nativeInput = inputRef.value?.inputRef
  const { min, max } = props

  if (nativeInput) {
    if (Number.isFinite(min)) {
      nativeInput.setAttribute('aria-valuemin', String(min))
    } else {
      nativeInput.removeAttribute('aria-valuemin')
    }
    if (Number.isFinite(max)) {
      nativeInput.setAttribute('aria-valuemax', String(max))
    } else {
      nativeInput.removeAttribute('aria-valuemax')
    }
  }
})

defineExpose({
  inputRef,
  blur,
  focus
})
</script>
