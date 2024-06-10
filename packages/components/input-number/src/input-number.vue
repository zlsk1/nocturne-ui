<script lang="ts" setup>
import { computed, ref } from 'vue'
import { inputNumberProps, inputNumberEmits } from './input-number'
import { FrInput, FrIcon } from '@/components'
import type { InputInstance } from '@/components/input/src/input'

defineOptions({
  name: 'FrInputNumber'
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
  console.log(modelValue)
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
      'fr-input-number',
      {
        'is-disabled': disabled
      }
    ]"
  >
    <template v-if="controls">
      <span
        :class="[
          'fr-input-number__decrease',
          {
            'is-disabled': isLessMin
          }
        ]"
        @click="handleDecrease"
      >
        <fr-icon icon="minus"></fr-icon>
      </span>
      <span
        :class="[
          'fr-input-number__increase',
          {
            'is-disabled': isMoreMax
          }
        ]"
        @click="handleIncrease"
      >
        <fr-icon icon="plus"></fr-icon>
      </span>
    </template>
    <fr-input
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
    ></fr-input>
  </div>
</template>

<style>
@import '@/theme-chalk/input-number.scss';
</style>
