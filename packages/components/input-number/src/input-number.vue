<script lang="ts" setup>
import { computed, ref } from 'vue'
import { RiAddLine as Add, RiSubtractLine as Subtract } from '@remixicon/vue'
import NInput from '@/components/input'
import { useNamespace } from '@/composables'
import { useFormItem } from '@/components/form'
import { inputNumberEmits, inputNumberProps } from './input-number'
import type { InputInstance } from '@/components/input/src/input'

defineOptions({
  name: 'NInputNumber'
})

const props = defineProps(inputNumberProps)
const emit = defineEmits(inputNumberEmits)

const ns = useNamespace('input-number')
const { formItemId, formItemDisabled } = useFormItem()

const inputRef = ref<InputInstance>()

const isLessMin = computed(() => {
  return props.modelValue <= props.min
})

const isMoreMax = computed(() => {
  return props.modelValue >= props.max
})

const model = computed<string | number | undefined>(() => {
  return props.precision
    ? props.modelValue.toFixed(props.precision)
    : props.modelValue
})

const actualDisabled = computed(() => formItemDisabled || props.disabled)

const handleIncrease = () => {
  if (isMoreMax.value || actualDisabled) return
  let { modelValue } = props
  emit('update:modelValue', (modelValue += props.step))
}

const handleDecrease = () => {
  if (isLessMin.value || actualDisabled) return
  let { modelValue } = props
  emit('update:modelValue', (modelValue -= props.step))
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

const blur = () => {
  inputRef.value?.inputRef?.blur()
}

const focus = () => {
  inputRef.value?.inputRef?.focus()
}

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
  <div :class="[ns.b(), ns.is('disabled', actualDisabled)]">
    <template v-if="controls">
      <span
        :class="[ns.e('decrease'), ns.is('disabled', actualDisabled)]"
        @click="handleDecrease"
      >
        <Subtract />
      </span>
      <span
        :class="[ns.e('increase'), ns.is('disabled', actualDisabled)]"
        @click="handleIncrease"
      >
        <Add />
      </span>
    </template>
    <n-input
      :id="formItemId"
      ref="inputRef"
      :size="size"
      type="number"
      :model-value="model"
      :disabled="actualDisabled"
      :readonly="readonly"
      :max="max"
      :min="min"
      @blur="handleBlur"
      @focus="handleFocus"
      @change="handleChange"
    />
  </div>
</template>
