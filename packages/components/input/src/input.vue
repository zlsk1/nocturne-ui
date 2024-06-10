<script lang="ts" setup>
import { ref, computed, nextTick, useSlots } from 'vue'
import { inputProps, inputEmits } from './input'
import { FrIcon } from '@/components'

defineOptions({
  name: 'FrInput'
})

const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)
const slots = useSlots()

const inputRef = ref<HTMLInputElement>()
const isFocus = ref(false)
const showPwd = ref(true)
const hovering = ref(false)

const showPwdVisable = computed(() => {
  return props.showPassword && props.modelValue
})

const showClear = computed(() => {
  return props.clearable && (hovering.value || isFocus.value) && props.modelValue
})

const isTextarea = computed(() => {
  return props.type === 'textarea'
})

const showSuffix = computed(() => {
  return props.suffixIcon || showClear.value
})

const handleInput = (e: Event) => {
  const { value } = e.target as HTMLInputElement
  emit('update:modelValue', value)
  emit('input', value)
}

const clearValue = () => {
  emit('update:modelValue', '')
  emit('clearValue')
  emit('input', '')
  emit('change', '')
}

const handleChange = (e: Event) => {
  emit('change', (e.target as HTMLInputElement).value)
}

const handleMouseEnter = () => {
  hovering.value = true
}

const handleMouseLeave = () => {
  hovering.value = false
}

const handleFocus = (e: FocusEvent) => {
  isFocus.value = true
  emit('focus', e)
}

const handleBlur = (e: FocusEvent) => {
  isFocus.value = false
  emit('blur', e)
}

const handleShowPwd = () => {
  showPwd.value = !showPwd.value
}

const focus = async() => {
  await nextTick()
  inputRef.value?.focus()
}

const blur = async() => {
  inputRef.value?.blur()
}

defineExpose({
  inputRef,
  focus,
  blur,
  clearValue
})
</script>

<template>
  <div
    :class="[
      !isTextarea ? 'fr-input' :'fr-textarea',
      size ? `fr-input--${size}` : '',
      {
        'is-disabled': disabled,
      }
    ]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <template v-if="!isTextarea">
      <div
        :class="[
          'fr-input__wrapper',
          isFocus ? 'is-focus' : ''
        ]"
      >
        <span v-if="prefixIcon || slots.prefix" class="fr-input__prefix">
          <span class="fr-input__prefix-inner">
            <i class="fr-icon fr-input__icon">
              <slot v-if="slots.prefix" name="prefix">
              </slot>
              <fr-icon v-else :icon="prefixIcon"></fr-icon>
            </i>
          </span>
        </span>
        <input
          ref="inputRef"
          :type="showPassword ? (showPwd ? 'password' : 'text') : type"
          :maxlength="maxlength"
          :minlength="minlength"
          :max="max"
          :min="min"
          :placeholder="placeholder"
          :tabindex="tabindex"
          class="fr-input__inner"
          :value="modelValue"
          :readonly="readonly"
          :autofocus="autofocus"
          :disabled="disabled"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
        >
        <span v-if="showSuffix" class="fr-input__suffix">
          <span class="fr-input__suffix-inner">
            <i
              v-if="showPwdVisable"
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
              v-if="showClear"
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
              v-if="slots.suffix"
              :class="[
                'fr-icon',
                'fr-input__icon',
              ]"
            >
              <slot name="suffix">
              </slot>
            </i>
            <span v-if="showLimit" class="fr-input__count">
              <span class="fr-input__count-inner">{{ (modelValue as string).length }} / {{ maxlength }}</span>
            </span>
          </span>
        </span>
      </div>
    </template>
    <template v-else>
      <textarea
        :placeholder="placeholder"
        :minlength="minlength"
        :maxlength="maxlength"
        :tabindex="tabindex"
        :disabled="disabled"
        :readonly="readonly"
        :value="modelValue"
        :autofocus="autofocus"
        :rows="rows"
        :class="[
          'fr-textarea__inner',
          {
            'is-noResize': noResize
          }
        ]"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      ></textarea>
      <span v-if="showLimit" class="fr-input__count">
        <span class="fr-input__count-inner">{{ (modelValue as string).length }} / {{ maxlength }}</span>
      </span>
    </template>
  </div>
</template>

<style>
@import '@/theme-chalk/base.scss';
@import '@/theme-chalk/input.scss';
</style>
