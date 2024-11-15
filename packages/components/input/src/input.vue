<script lang="ts" setup>
import { computed, nextTick, ref, useSlots } from 'vue'
import {
  RiCloseCircleLine as CloseCircle,
  RiEyeLine as Eye
} from '@remixicon/vue'
import { inputEmits, inputProps } from './input'
import { useForm, useFormItemId } from '@/components/form'
import { NIcon } from '@/components'
import { useNamespace } from '@/composables'

defineOptions({
  name: 'NInput'
})

const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)
const slots = useSlots()

const ns = useNamespace('input')

const inputRef = ref<HTMLInputElement>()
const wrapperRef = ref<HTMLInputElement>()
const isFocus = ref(false)
const showPwd = ref(false)
const hovering = ref(false)

const labelId = useFormItemId()
const { formItem } = useForm()

const showPwdVisable = computed(() => {
  return props.showPassword && !!props.modelValue
})

const showClear = computed(() => {
  return (
    props.clearable && (hovering.value || isFocus.value) && !!props.modelValue
  )
})

const isTextarea = computed(() => {
  return props.type === 'textarea'
})

const showSuffix = computed<boolean>(() => {
  return (
    !!props.suffixIcon ||
    showClear.value ||
    showPwdVisable.value ||
    !!slots.suffix
  )
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
  if (e.relatedTarget && wrapperRef.value?.contains(e.relatedTarget as Node))
    return
  isFocus.value = false
  emit('blur', e)
  formItem?.validate()
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
      !isTextarea ? ns.b() : 'n-textarea',
      ns.m(size),
      ns.is('disabled', disabled)
    ]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="focus"
  >
    <template v-if="!isTextarea">
      <div
        ref="wrapperRef"
        :class="[ns.e('wrapper'), ns.is('focus', isFocus)]"
        tabindex="1"
      >
        <span v-if="prefixIcon || slots.prefix" :class="ns.e('prefix')">
          <span :class="ns.e('prefix-inner')">
            <n-icon :class="ns.e('icon')">
              <slot v-if="slots.prefix" name="prefix" />
              <component :is="prefixIcon" v-else />
            </n-icon>
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
          :class="ns.e('inner')"
          :value="modelValue"
          :readonly="readonly"
          :autofocus="autofocus"
          :disabled="disabled"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
        />
        <span v-if="showSuffix" :class="ns.e('suffix')">
          <span :class="ns.e('suffix-inner')">
            <n-icon
              v-if="showPwdVisable"
              :class="[ns.e('icon'), ns.e('password')]"
            >
              <Eye @click="handleShowPwd" />
            </n-icon>
            <n-icon v-if="showClear" :class="[ns.e('icon'), ns.e('clear')]">
              <CloseCircle @click="clearValue" />
            </n-icon>
            <n-icon v-if="suffixIcon" :class="[ns.e('icon')]">
              <component :is="suffixIcon" />
            </n-icon>
            <n-icon v-if="slots.suffix" :class="[ns.e('icon')]">
              <slot name="suffix" />
            </n-icon>
            <span v-if="showLimit" :class="ns.e('count')">
              <span :class="ns.e('count-inner')"
                >{{ (modelValue as string).length }} / {{ maxlength }}</span
              >
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
        :class="[`${ns.ns.value}-textarea__inner`, ns.is('noResize', noResize)]"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <span v-if="showLimit" :class="ns.e('count')">
        <span :class="ns.e('count-inner')"
          >{{ (modelValue as string).length }} / {{ maxlength }}</span
        >
      </span>
    </template>
  </div>
</template>
