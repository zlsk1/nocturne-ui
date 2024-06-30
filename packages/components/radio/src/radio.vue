<script lang="ts" setup>
import { nextTick, computed, inject, ref } from 'vue'
import { radioProps, radioEmits } from './radio'
import { RADIOGROUP_INJECTION_KEY } from '@/components/radio-group/src/constants'

defineOptions({
  name: 'FrRadio'
})

const props = defineProps(radioProps)
const emit = defineEmits(radioEmits)

const groupRef = inject(RADIOGROUP_INJECTION_KEY, undefined)!

const focus = ref(false)
const radioRef = ref<HTMLInputElement>()

const isGroup = computed(() => !!radioRef.value)

const actualValue = computed(() => {
  if (props.value) {
    return props.value
  }
  return props.label
})

const modelValue = computed({
  get() {
    return isGroup.value ? groupRef.modelValue : props.modelValue
  },
  set(val) {
    if (isGroup.value) {
      groupRef.changeGroup(val)
    }
    else {
      emit && emit('update:modelValue', val as string | number | boolean)
    }
    radioRef.value!.checked = props.modelValue === actualValue.value
  }
})

const disabled = computed(() => {
  return groupRef.disabled || props.disabled
})

const handleChange = () => {
  nextTick(() => emit('change', modelValue.value as string | number | boolean))
}
</script>

<template>
  <label
    :class="[
      'fr-radio',
      `fr-radio--${groupRef?.size || size || 'default'}`,
      {
        'is-checked': modelValue === actualValue,
        'is-disabled': disabled,
        'is-focus': focus,
      }
    ]"
  >
    <span
      :class="[
        'fr-radio__input',
        {
          'is-checked': modelValue === actualValue,
          'is-disabled': disabled
        }
      ]"
    >
      <input
        ref="radioRef"
        v-model="modelValue"
        :value="actualValue"
        type="radio"
        :disabled="disabled"
        class="fr-radio__original"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      >
      <span class="fr-radio__inner"></span>
    </span>
    <span class="fr-radio__label"><slot></slot></span>
  </label>
</template>

<style lang="scss" scoped>
@use '@/theme-chalk/radio.scss';
</style>
