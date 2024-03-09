<script setup>
import { ref } from 'vue'
import { inputProps, inputEmits } from './index'

defineOptions({
  name: 'FrInput'
})

defineProps(inputProps)
const emit = defineEmits(inputEmits)

const inputRef = ref()
const isFocus = ref(false)
const showPwd = ref(false)
const hovering = ref(false)

const handleInput = e => {
  const { value } = e.target
  emit('update:modelValue', value)
}

const clearValue = () => {
  emit('update:modelValue', '')
}

const handleMouseEnter = () => {
  hovering.value = true
}

const handleMouseLeave = () => {
  hovering.value = false
}

const handleFocus = () => {
  isFocus.value = true
}

const handleBlur = () => {
  isFocus.value = false
}

const handleShowPwd = () => {
  showPwd.value = !showPwd.value
}
</script>

<template>
  <div
    :class="[
      'fr-input',
      {
        'is-disabled': disabled
      }
    ]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      :class="[
        'fr-input__wrapper',
        isFocus ? 'is-focus' : ''
      ]"
    >
      <span class="fr-input__prefix">
        <span class="fr-input__prefix-inner">
          <i class="fr-icon fr-input__icon">
            <slot name="prefix">
            </slot>
          </i>
        </span>
      </span>
      <input
        ref="inputRef"
        :type="showPassword ? (showPwd ? 'password' : 'text') : type"
        :maxlength="maxlength"
        :minlength="minlength"
        :placeholder="placeholder"
        class="fr-input__inner"
        :value="modelValue"
        :readonly="readonly"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      <span class="fr-input__suffix">
        <span class="fr-input__suffix-inner">
          <i
            v-if="showPassword && modelValue.trim().length"
            :class="[
              'fr-icon',
              'fr-input__icon',
              'fr-input__password'
            ]"
          >
            <fr-icon
              icon="eye"
              @click="handleShowPwd"
            ></fr-icon>
          </i>
          <i
            v-if="clearable && (hovering || isFocus) && modelValue.trim().length"
            :class="[
              'fr-icon',
              'fr-input__icon',
              'fr-input__clear'
            ]"
          >
            <fr-icon
              icon="circle-delete"
              @click="clearValue"
            ></fr-icon>
          </i>
          <i
            v-if="suffixIcon"
            :class="[
              'fr-icon',
              'fr-input__icon',
            ]"
          >
            <fr-icon :icon="suffixIcon"></fr-icon>
          </i>
          <i
            v-else
            name="suffix"
            :class="[
              'fr-icon',
              'fr-input__icon',
            ]"
          >
            <slot>
            </slot>
          </i>
        </span>
      </span>
    </div>
  </div>
</template>

<style>
@import '@/theme-chalk/base.scss';
@import '@/theme-chalk/input.scss';
</style>
