<script lang="ts" setup>
import { ref, computed, nextTick, useSlots } from 'vue'
import { inputProps, inputEmits } from './input'
import {
  RiEyeLine as Eye,
  RiCloseCircleLine as CloseCircle
} from '@remixicon/vue'
import { useFormItemId, useForm } from '@/components/form'

defineOptions({
  name: 'NInput'
})

const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)
const slots = useSlots()

const inputRef = ref<HTMLInputElement>()
const wrapperRef = ref<HTMLInputElement>()
const isFocus = ref(false)
const showPwd = ref(false)
const hovering = ref(false)

const labelId = useFormItemId()
const { form, formItem } = useForm()

const showPwdVisable = computed(() => {
  return props.showPassword && !!props.modelValue
})

const showClear = computed(() => {
  return props.clearable && (hovering.value || isFocus.value) && !!props.modelValue
})

const isTextarea = computed(() => {
  return props.type === 'textarea'
})

const showSuffix = computed<boolean>(() => {
  return !!props.suffixIcon || showClear.value || showPwdVisable.value || !!slots.suffix
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
  if (e.relatedTarget && wrapperRef.value?.contains(e.relatedTarget as Node)) return
  isFocus.value = false
  emit('blur', e)
  formItem?.validate()
}

const handleShowPwd = () => {
  showPwd.value = !showPwd.value
}

const focus = async() => {
  await nextTick()
  inputRef.value?.focus()
}

const blur = async() => {
  await nextTick()
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
      !isTextarea ? 'n-input' :'n-textarea',
      size ? `n-input--${size}` : '',
      {
        'is-disabled': disabled,
      }
    ]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="focus"
  >
    <template v-if="!isTextarea">
      <div
        ref="wrapperRef"
        :class="[
          'n-input__wrapper',
          isFocus ? 'is-focus' : ''
        ]"
        tabindex="1"
      >
        <span v-if="prefixIcon || slots.prefix" class="n-input__prefix">
          <span class="n-input__prefix-inner">
            <i class="n-icon n-input__icon">
              <slot v-if="slots.prefix" name="prefix">
              </slot>
              <component :is="prefixIcon" v-else></component>
            </i>
          </span>
        </span>
        <input
          :id="labelId"
          ref="inputRef"
          :type="showPassword ? (showPwd ? 'password' : 'text') : type"
          :maxlength="maxlength"
          :minlength="minlength"
          :max="max"
          :min="min"
          :placeholder="placeholder"
          :tabindex="tabindex"
          class="n-input__inner"
          :value="modelValue"
          :readonly="readonly"
          :autofocus="autofocus"
          :disabled="disabled"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
        >
        <span v-if="showSuffix" class="n-input__suffix">
          <span class="n-input__suffix-inner">
            <i
              v-if="showPwdVisable"
              :class="[
                'n-icon',
                'n-input__icon',
                'n-input__password'
              ]"
            >
              <Eye @click="handleShowPwd"></Eye>
            </i>
            <i
              v-if="showClear"
              :class="[
                'n-icon',
                'n-input__icon',
                'n-input__clear'
              ]"
            >
              <CloseCircle @click="clearValue"></CloseCircle>
            </i>
            <i
              v-if="suffixIcon"
              :class="[
                'n-icon',
                'n-input__icon',
              ]"
            >
              <component :is="suffixIcon"></component>
            </i>
            <i
              v-if="slots.suffix"
              :class="[
                'n-icon',
                'n-input__icon',
              ]"
            >
              <slot name="suffix">
              </slot>
            </i>
            <span v-if="showLimit" class="n-input__count">
              <span class="n-input__count-inner">{{ (modelValue as string).length }} / {{ maxlength }}</span>
            </span>
          </span>
        </span>
      </div>
    </template>
    <template v-else>
      <textarea
        :id="labelId"
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
          'n-textarea__inner',
          {
            'is-noResize': noResize
          }
        ]"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      ></textarea>
      <span v-if="showLimit" class="n-input__count">
        <span class="n-input__count-inner">{{ (modelValue as string).length }} / {{ maxlength }}</span>
      </span>
    </template>
  </div>
</template>
