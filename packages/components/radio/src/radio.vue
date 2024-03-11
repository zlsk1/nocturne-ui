<script setup>
import { nextTick, computed, inject, ref } from 'vue'
import { radioProps, radioEmits } from './index'

defineOptions({
  name: 'FrRadio'
})

const props = defineProps(radioProps)
const emit = defineEmits(radioEmits)

const groupRef = inject('groupRef')

const focus = ref(false)
const radioRef = ref(null)

const isGroup = computed(() => !!radioRef.value)

const actualValue = computed(() => {
  if (props.value) {
    return props.value
  }
  return props.label
})

const modelValue = computed({
  get () {
    return isGroup.value ? groupRef.value.modelValue : props.modelValue
  },
  set (val) {
    if (isGroup.value) {
      groupRef.value.changeGroup(val)
    } else {
      emit && emit('update:modelValue', val)
    }
    radioRef.value.checked = props.modelValue === actualValue.value
  }
})

const disabled = computed(() => {
  return groupRef.value.disabled || props.disabled
})

const handleChange = () => {
  nextTick(() => emit('change', modelValue.value))
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

<style>
@import '@/theme-chalk/radio.scss';
</style>
