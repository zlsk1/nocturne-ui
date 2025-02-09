<template>
  <div
    :class="inputCls"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div v-if="$slots.prepend" :class="nsGroup.e('prepend')">
      <slot name="prepend" />
    </div>
    <div
      v-if="!isTextarea"
      ref="wrapperRef"
      :class="[
        ns.m('wrapper'),
        ns.is('focus', isFocused),
        ns.is('error', status === 'error'),
        ns.is('warning', status === 'warning')
      ]"
      tabindex="1"
      @click="focus"
    >
      <span v-if="prefixIcon || slots.prefix" :class="ns.e('prefix')">
        <span :class="ns.e('prefix-inner')">
          <slot v-if="slots.prefix" name="prefix" />
          <n-icon v-else :class="ns.e('icon')">
            <component :is="prefixIcon" />
          </n-icon>
        </span>
      </span>
      <input
        :id="formItemId"
        ref="inputRef"
        :type="
          props.type === 'password' ? (showPwd ? 'text' : 'password') : type
        "
        :maxlength="maxlength"
        :minlength="minlength"
        :max="max"
        :min="min"
        :placeholder="placeholder"
        :tabindex="tabindex"
        :class="ns.e('inner')"
        :value="modelValue"
        :readonly="readonly"
        :autofocus="autofocus"
        :disabled="actualDisabled"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        @compositionend="hadnleCompositionEnd"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @keydown.esc.enter="handleEsc"
      />
      <span v-if="showSuffix" :class="ns.e('suffix')">
        <span :class="ns.e('suffix-inner')">
          <n-icon v-if="showPwdIcon" :class="[ns.e('icon'), ns.e('password')]">
            <Eye v-if="showPwd" @click="handleShowPwd" />
            <EyeOff v-else @click="handleShowPwd" />
          </n-icon>
          <n-icon v-if="showClear" :class="[ns.e('icon'), ns.e('clear')]">
            <CloseCircle @click="clearValue" />
          </n-icon>
          <n-icon v-if="suffixIcon" :class="[ns.e('icon')]">
            <component :is="suffixIcon" />
          </n-icon>
          <template v-if="slots.suffix">
            <slot name="suffix" />
          </template>
          <span v-if="showLimit" :class="ns.e('count')">
            <span :class="ns.e('count-inner')"
              >{{ (modelValue as string).length }} / {{ maxlength }}</span
            >
          </span>
        </span>
      </span>
    </div>
    <textarea
      v-else
      :id="formItemId"
      ref="inputRef"
      :placeholder="placeholder"
      :minlength="minlength"
      :maxlength="maxlength"
      :tabindex="tabindex"
      :disabled="actualDisabled"
      :readonly="readonly"
      :value="modelValue"
      :autofocus="autofocus"
      :rows="rows"
      :class="textareaCls"
      :style="{ height: textareaHeight + 'px' }"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @compositionend="hadnleCompositionEnd"
      @compositionstart="handleCompositionStart"
      @compositionupdate="handleCompositionUpdate"
      @keydown.esc.enter="handleEsc"
    />
    <span v-if="showLimit" :class="ns.e('count')">
      <span :class="ns.e('count-inner')"
        >{{ modelLength }} / {{ maxlength }}</span
      >
    </span>
    <n-icon v-if="showClear" :class="[`${ns.ns.value}-textarea--clear`]">
      <CloseCircle @click="clearValue" />
    </n-icon>
    <div v-if="$slots.append" :class="nsGroup.e('append')">
      <slot name="append" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, useSlots } from 'vue'
import {
  RiCloseCircleFill as CloseCircle,
  RiEyeLine as Eye,
  RiEyeOffLine as EyeOff
} from '@remixicon/vue'
import { useForm, useFormItem } from '@/components/form'
import NIcon from '@/components/icon'
import { useComposition, useFocusController, useNamespace } from '@/composables'
import { isNil, isUndefined } from '@/utils'
import { inputEmits, inputProps } from './input'
import type { InputStatus } from './input'

defineOptions({
  name: 'NInput'
})

const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)
const slots = useSlots()

const ns = useNamespace('input')
const nsGroup = useNamespace('input-group')
const { formItemId, formItemDisabled, formItemSize } = useFormItem()
const { formItem } = useForm()

const inputRef = ref<HTMLInputElement>()
const wrapperRef = ref<HTMLInputElement>()
const showPwd = ref(props.type === 'password' ? false : true)
const hovering = ref(false)
const textareaHeight = ref(0)

const { isFocused, handleFocus, handleBlur } = useFocusController(inputRef, {
  afterBlur: () => {
    props.afterBlur?.()
    formItem?.validate()
  }
})

const showPwdIcon = computed(() => {
  return props.type === 'password' && props.showPassword && !!props.modelValue
})

const showClear = computed(() => {
  return (
    props.clearable &&
    (hovering.value || isFocused.value) &&
    !isNil(props.modelValue) &&
    String(props.modelValue).length > 0
  )
})

const isTextarea = computed(() => {
  return props.type === 'textarea'
})

const showSuffix = computed<boolean>(
  () =>
    !!props.suffixIcon || showClear.value || showPwdIcon.value || !!slots.suffix
)

const actualDisabled = computed(() => formItemDisabled || props.disabled)
const actualSize = computed(() => formItemSize || props.size)

const inputCls = computed(() => [
  !isTextarea.value ? ns.b() : 'n-textarea',
  ns.m(actualSize.value),
  ns.is('disabled', actualDisabled.value),
  ns.m(props.variant === 'outlined' ? '' : props.variant),
  (slots.prepend || slots.append) && nsGroup.b(),
  Object.hasOwn(slots, 'append') && nsGroup.m('append'),
  Object.hasOwn(slots, 'prepend') && nsGroup.m('prepend')
])

const textareaCls = computed(() => [
  `${ns.ns.value}-textarea__inner`,
  ns.is('noResize', props.noResize),
  ns.is('clear', props.clearable)
])

const modelLength = computed(() => {
  return isNil(props.modelValue) ? '' : String(props.modelValue)
})

const status = computed<InputStatus | ''>(() => {
  if (props.status) return props.status
  if (isUndefined(formItem?.validateStatus)) return ''
  else {
    return formItem.validateStatus ? 'error' : 'warning'
  }
})

const handleInput = (e: Event) => {
  const { value } = e.target as HTMLInputElement

  if (isComposed.value) return

  if (props.type === 'textarea' && props.autoResize) {
    const minHeight = 30

    const scrollHeight = inputRef.value!.scrollHeight!

    if (scrollHeight < minHeight) {
      textareaHeight.value = minHeight
    } else {
      textareaHeight.value = scrollHeight
    }
  }

  emit('update:modelValue', value)
  emit('input', value)
}

const {
  isComposed,
  hadnleCompositionEnd,
  handleCompositionStart,
  handleCompositionUpdate
} = useComposition({ emit, afterComposition: handleInput })

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

const handleShowPwd = () => {
  showPwd.value = !showPwd.value
}

const focus = async () => {
  await nextTick()
  inputRef.value?.focus()
}

const blur = async () => {
  await nextTick()
  inputRef.value?.blur()
}

const handleEsc = () => {
  if (isFocused.value) {
    blur()
  }
}

defineExpose({
  inputRef,
  isFocused,
  focus,
  blur,
  clearValue
})
</script>
