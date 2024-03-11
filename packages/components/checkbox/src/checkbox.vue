<script setup>
import { inject, nextTick, computed, ref } from 'vue'
import { checkboxProps, checkboxEmits } from './index'

defineOptions({
  name: 'FrCheckbox'
})

const checkboxGroup = inject('groupRef', undefined)

const props = defineProps(checkboxProps)
const emit = defineEmits(checkboxEmits)

const checkboxRef = ref(null)

const modelValue = computed({
  get () {
    return checkboxGroup ? checkboxGroup?.value.modelValue : props.modelValue
  },
  set (val) {
    if (checkboxGroup) {
      checkboxGroup.value.changeEvent(val)
    } else {
      emit && emit('update:modelValue', !props.modelValue)
    }
    checkboxRef.value.checked = props.modelValue
  }
})

const isChecked = computed(() => {
  if (checkboxGroup) {
    return modelValue.value.includes(props.value)
  } else {
    return props.modelValue
  }
})

const handleChange = () => {
  nextTick(() => emit('change', modelValue.value))
}
</script>

<template>
  <label
    :class="[
      'fr-checkbox',
      `fr-checkbox--${size || 'default'}`,
      {
        'is-disabled': disabled,
        'is-checked': isChecked,
      }
    ]"
  >
    <span
      :class="[
        'fr-checkbox__input',
        {
          'is-disabled': disabled,
          'is-checked': isChecked,
          'is-indeterminate': indeterminate
        }
      ]"
    >
      <input
        ref="checkboxRef"
        v-model="modelValue"
        :value="value"
        type="checkbox"
        class="fr-checkbox__original"
        @change="handleChange"
      >
      <span class="fr-checkbox__inner"></span>
    </span>
    <span class="fr-checkbox__label">
      <slot>{{ value }}</slot>
    </span>
  </label>
</template>

<style>
@import '@/theme-chalk/checkbox.scss';
</style>
