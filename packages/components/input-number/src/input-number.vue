<script lang="ts" setup>
import { computed, ref } from 'vue'
import { inputNumberProps, inputNumberEmits } from './input-number'
import { NInput } from '@/components'
import {
  RiAddLine as Add,
  RiSubtractLine as Subtract
} from '@remixicon/vue'
import type { InputInstance } from '@/components/input/src/input'

defineOptions({
  name: 'NInputNumber'
})

const props = defineProps(inputNumberProps)
const emit = defineEmits(inputNumberEmits)

const inputRef = ref<InputInstance>()

const isLessMin = computed(() => {
  return props.modelValue <= props.min
})

const isMoreMax = computed(() => {
  return props.modelValue >= props.max
})

const _modelValue = computed<string | number | undefined>(() => {
  return props.precision ? props.modelValue.toFixed(props.precision) : props.modelValue
})

const handleIncrease = () => {
  if (isMoreMax.value || props.disabled) return
  let { modelValue } = props
  emit('update:modelValue', modelValue += props.step)
}

const handleDecrease = () => {
  if (isLessMin.value || props.disabled) return
  let { modelValue } = props
  emit('update:modelValue', modelValue -= props.step)
}

const handleBlur = (e: FocusEvent) => {
  const { max, min } = props
  let value = Number(inputRef.value?.inputRef?.value)
  value = value >= max ? max : value
  value = value <= min ? min : value
  emit('update:modelValue', value)
  emit('blur', e)
}

const handleFocus = (e: FocusEvent) => {
  emit('focus', e)
}

const blur = () => { inputRef.value?.inputRef?.blur() }

const focus = () => { inputRef.value?.inputRef?.focus() }

const handleChange = (val: number | string) => {
  emit('change', Number(val))
}

defineExpose({
  inputRef,
  blur,
  focus
})
</script>

<template>
  <div
    :class="[
      'n-input-number',
      {
        'is-disabled': disabled
      }
    ]"
  >
    <template v-if="controls">
      <span
        :class="[
          'n-input-number__decrease',
          {
            'is-disabled': isLessMin
          }
        ]"
        @click="handleDecrease"
      >
        <Subtract></Subtract>
      </span>
      <span
        :class="[
          'n-input-number__increase',
          {
            'is-disabled': isMoreMax
          }
        ]"
        @click="handleIncrease"
      >
        <Add></Add>
      </span>
    </template>
    <n-input
      ref="inputRef"
      :size="size"
      type="number"
      :model-value="_modelValue"
      :disabled="disabled"
      :readonly="readonly"
      :max="max"
      :min="min"
      @blur="handleBlur"
      @focus="handleFocus"
      @change="handleChange"
    ></n-input>
  </div>
</template>

<style lang="scss" scoped>
@use '@/theme-chalk/input-number.scss';
</style>
