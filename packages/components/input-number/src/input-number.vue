<script setup>
import { computed, ref } from 'vue'
import { inputNumberProps, inputNumberEmits } from './index'
defineOptions({
  name: 'FrInputNumber'
})

const props = defineProps(inputNumberProps)
const emit = defineEmits(inputNumberEmits)

const inputRef = ref(null)

const isLessMin = computed(() => {
  return props.modelValue <= props.min
})

const isMoreMax = computed(() => {
  return props.modelValue >= props.max
})

const _modelValue = computed(() => {
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

const handleBlur = e => {
  const { max, min } = props
  let value = Number(inputRef.value.inputRef.value)
  value = value >= max ? max : value
  value = value <= min ? min : value
  emit('update:modelValue', value)
  emit('blur', e)
}

const handleFocus = e => {
  emit('focus', e)
}

const blur = () => { inputRef.value?.blur() }

const focus = () => { inputRef.value?.focus() }

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
    <fr-input
      ref="inputRef"
      :size="size"
      :model-value="_modelValue"
      :disabled="disabled"
      :readonly="readonly"
      @blur="handleBlur"
      @focus="handleFocus"
    ></fr-input>
  </div>
</template>

<style>
@import '@/theme-chalk/input-number.scss';
</style>
