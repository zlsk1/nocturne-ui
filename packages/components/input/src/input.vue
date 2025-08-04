<template>
  <div
    :class="inputCls"
    :style="$attrs.style as StyleValue"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div v-if="$slots.prepend" :class="nsGroup.e('prepend')">
      <slot name="prepend" />
    </div>
    <template v-if="!isTextarea">
      <div ref="wrapperRef" :class="wrapperCls" tabindex="1" @click="focus">
        <span v-if="prefixIcon || slots.prefix" :class="ns.e('prefix')">
          <span :class="ns.e('prefix-inner')">
            <slot v-if="slots.prefix" name="prefix" />
            <n-icon v-else :class="ns.e('icon')">
              <component :is="prefixIcon" />
            </n-icon>
          </span>
        </span>
        <input
          v-bind="newAttrs"
          :id="formItemId"
          ref="inputRef"
          :type="type === 'password' ? (showPwd ? 'text' : 'password') : type"
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
          :autocomplete="autocomplete"
          :disabled="actualDisabled"
          @input="handleInput"
          @change="handleChange"
          @compositionend="hadnleCompositionEnd"
          @compositionstart="handleCompositionStart"
          @compositionupdate="handleCompositionUpdate"
          @keydown="handleKeydown"
        />
        <span v-if="showSuffix" :class="ns.e('suffix')">
          <span :class="ns.e('suffix-inner')">
            <n-icon
              v-if="showPwdIcon"
              :class="[ns.e('icon'), ns.e('password')]"
            >
              <Eye v-if="showPwd" @click="handleShowPwd" />
              <EyeOff v-else @click="handleShowPwd" />
            </n-icon>
            <n-icon
              v-if="showClear"
              :class="[ns.e('icon'), ns.e('clear')]"
              @click="clearValue"
              @mousedown.prevent="NOOP"
            >
              <CloseCircle />
            </n-icon>
            <n-icon v-if="suffixIcon" :class="[ns.e('icon')]">
              <component :is="suffixIcon" />
            </n-icon>
            <template v-if="slots.suffix">
              <slot name="suffix" />
            </template>
            <span
              v-if="showLimit && type !== 'password'"
              :class="ns.e('count')"
            >
              <span :class="ns.e('count-inner')">
                {{ modelLength }} / {{ maxlength }}
              </span>
            </span>
          </span>
        </span>
      </div>
    </template>
    <template v-else>
      <textarea
        v-bind="newAttrs"
        :id="formItemId"
        ref="textareaRef"
        :placeholder="placeholder"
        :minlength="minlength"
        :maxlength="maxlength"
        :tabindex="tabindex"
        :disabled="actualDisabled"
        :readonly="readonly"
        :value="modelValue"
        :autofocus="autofocus"
        :autocomplete="autocomplete"
        :rows="rows"
        :class="textareaCls"
        :style="{ height: textareaHeight + 'px' }"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @compositionend="hadnleCompositionEnd"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
      />
      <span v-if="showLimit" :class="ns.e('count')">
        <span :class="ns.e('count-inner')">
          {{ modelLength }} / {{ maxlength }}
        </span>
      </span>
      <n-icon v-if="showClear" :class="[`${ns.ns.value}-textarea--clear`]">
        <CloseCircle @click="clearValue" />
      </n-icon>
    </template>
    <div v-if="$slots.append" :class="nsGroup.e('append')">
      <slot name="append" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, useAttrs, useSlots, watch } from 'vue'
import { NOOP, isNil, isUndefined } from '@nocturne-ui/utils'
import {
  RiCloseCircleFill as CloseCircle,
  RiEyeLine as Eye,
  RiEyeOffLine as EyeOff
} from '@remixicon/vue'
import { useForm, useFormItem } from '@nocturne-ui/components/form'
import NIcon from '@nocturne-ui/components/icon'
import {
  useComposition,
  useFocusController,
  useNamespace
} from '@nocturne-ui/composables'

import { fromPairs } from 'lodash'
import { inputEmits, inputProps } from './input'
import type { StyleValue } from 'vue'
import type { InputStatus } from './input'

defineOptions({
  name: 'NInput',
  inheritAttrs: false
})

const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)
const slots = useSlots()
const attrs = useAttrs()

const ns = useNamespace('input')
const nsGroup = useNamespace('input-group')
const { formItemId, formItemDisabled, formItemSize } = useFormItem()
const { formItem } = useForm()

const inputRef = ref<HTMLInputElement>()
const textareaRef = ref<HTMLTextAreaElement>()
const showPwd = ref(props.type === 'password' ? false : true)
const hovering = ref(false)
const textareaHeight = ref(0)

const elRef = computed(() => inputRef.value || textareaRef.value)

const { isFocused, wrapperRef, handleFocus, handleBlur } = useFocusController(
  elRef,
  {
    beforeFocus() {
      return actualDisabled.value
    },
    afterBlur: () => {
      props.afterBlur?.()
      formItem?.validate('blur')
    }
  }
)

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
    !!props.suffixIcon ||
    showClear.value ||
    showPwdIcon.value ||
    !!slots.suffix ||
    props.showLimit
)

const actualDisabled = computed(() => formItemDisabled.value || props.disabled)
const actualSize = computed(() => formItemSize.value || props.size)

const inputCls = computed(() => [
  !isTextarea.value ? ns.b() : 'n-textarea',
  ns.m(actualSize.value),
  ns.is('disabled', actualDisabled.value),
  ns.m(props.variant === 'outlined' ? '' : props.variant),
  (slots.prepend || slots.append) && nsGroup.b(),
  slots.append && nsGroup.m('append'),
  slots.prepend && nsGroup.m('prepend'),
  attrs.class
])

const wrapperCls = computed(() => [
  ns.m('wrapper'),
  ns.is('focus', isFocused.value),
  ns.is('error', status.value === 'error'),
  ns.is('warning', status.value === 'warning')
])

const textareaCls = computed(() => [
  `${ns.ns.value}-textarea__inner`,
  ns.is('noResize', props.noResize),
  ns.is('clear', props.clearable)
])

const modelLength = computed(() => {
  return isNil(props.modelValue) ? 0 : String(props.modelValue).length
})

const status = computed<InputStatus | ''>(() => {
  if (props.status) return props.status
  if (isUndefined(formItem?.validateStatus)) return ''
  else {
    return formItem?.validateStatus ? '' : 'error'
  }
})

// exclude class & style & events
const newAttrs = computed(() =>
  fromPairs(
    Object.entries(attrs).filter(
      ([key]) => !['class', 'style'].includes(key) || /^on[A-Z]/.test(key)
    )
  )
)

const handleInput = (e: Event) => {
  const { value } = e.target as HTMLInputElement

  if (isComposed.value) return

  if (props.type === 'textarea' && props.autoResize) {
    const minHeight = 30

    const scrollHeight = elRef.value!.scrollHeight!

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
  elRef.value?.focus()
}

const blur = async () => {
  await nextTick()
  elRef.value?.blur()
}

const handleKeydown = (e: KeyboardEvent) => {
  emit('keydown', e)
}

watch(
  () => props.modelValue,
  () => {
    formItem?.validate('change')
  }
)

defineExpose({
  inputRef,
  textareaRef,
  ref: elRef,
  isFocused,
  focus,
  blur,
  clearValue
})
</script>
