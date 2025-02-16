<template>
  <n-tooltip
    :visible="visible"
    pure
    :transition="`${ns.ns.value}-zoom-in-top`"
    :show-arrow="showArrow"
    :popper-class="[ns.e('popper'), popperClass]"
    :popper-style="{
      maxHeight: '200px',
      width: `${inputWidth}px`,
      ...popperStyle
    }"
    :placement="placement"
  >
    <div ref="inputContainer" :class="[ns.b(), ns.is('disabled', disabled)]">
      <n-input
        :id="formItemId"
        ref="inputRef"
        :size="size"
        :model-value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :clearable="clearable"
        :after-blur="afterBlur"
        :autofocus="autofocus"
        @input="onInput"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
        @keydown.up.enter="onUp"
        @keydown.down.enter="onDown"
        @keydown.esc.enter="onEsc"
        @keydown.enter.enter="onEnter"
        @clear-value="onClearValue"
      >
        <template #suffix>
          <slot name="suffix" />
        </template>
        <template #prefix>
          <slot name="suffix" />
        </template>
      </n-input>
    </div>
    <template #content>
      <slot v-if="$slots.default" />
      <ul v-if="hasOptions" ref="contentRef" :class="ns.e('content')">
        <li
          v-for="({ label, value }, index) in filterOption"
          :key="label"
          :class="[
            ns.e('content__item'),
            ns.is('selected', props.modelValue === value),
            hoverIndex === index && !disabled && 'hovering'
          ]"
          :title="label"
          @mouseenter="onItemMouseEnter(index)"
          @click.stop="onItemClick(value)"
        >
          {{ label }}
        </li>
      </ul>
    </template>
  </n-tooltip>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useNamespace } from '@nocturne-ui/composables'
import NInput from '@nocturne-ui/components/input'
import NTooltip from '@nocturne-ui/components/tooltip'
import { isFunction, isNumber, isUndefined } from '@nocturne-ui/utils'
import { useForm, useFormItem } from '@nocturne-ui/components/form'
import { autoCompleteEmits, autoCompleteProps } from './auto-complete'
import type { InputInstance } from '@nocturne-ui/components/input'

defineOptions({
  name: 'NAutoComplete'
})

const props = defineProps(autoCompleteProps)
const emit = defineEmits(autoCompleteEmits)

const ns = useNamespace('auto-complete')
const { formItemDisabled, formItemId, formItemSize } = useFormItem()
const { formItem } = useForm()

const visible = ref(props.defaultOption)
const hoverIndex = ref(props.defaultActiveFirstOption ? 0 : -1)
const inputRef = ref<InputInstance>()
const inputContainer = ref<HTMLDivElement>()
const contentRef = ref<HTMLDivElement>()

onClickOutside(inputContainer, (e) => {
  if (e.target && contentRef.value?.contains(e.target as Node)) {
    return
  }

  visible.value = false
})

const disabled = computed(() => formItemDisabled.value || props.disabled)
const size = computed(() => formItemSize.value || props.size)

const isFocused = computed(() => inputRef.value?.isFocused)

const inputWidth = computed({
  get() {
    return inputContainer.value?.getBoundingClientRect().width!
  },
  set() {}
})

const filterOption = computed(() => {
  const searchQuery = isNumber(props.modelValue)
    ? String(props.modelValue)
    : props.modelValue

  if (isUndefined(searchQuery) || searchQuery === '') return []
  if (props.filterOption && isFunction(props.filterOption)) {
    return props.filterOption(searchQuery)
  } else if (props.filterOption === true) {
    return props.options?.filter((item) => item.label.includes(searchQuery))
  }
  return props.options
})

const hasOptions = computed(() => {
  return filterOption.value && filterOption.value.length !== 0
})

const onInput = (val: string) => {
  emit('update:modelValue', val)
  emit('search', val)
}

const onChange = (val: string) => {
  emit('change', val)
}

const onFocus = (e: FocusEvent) => {
  if (hasOptions.value && isFocused.value && !disabled.value) {
    setSelected()
    visible.value = true
    emit('blur', e)
  }
}

const onBlur = (e: FocusEvent) => {
  emit('blur', e)
  formItem?.validate('blur')
}

const onItemMouseEnter = (index: number) => {
  hoverIndex.value = index
}

const onUp = () => {
  if (!hasOptions.value) return
  if (hoverIndex.value > 0) {
    hoverIndex.value--
  } else {
    hoverIndex.value = filterOption.value!.length - 1
  }
}

const onDown = () => {
  if (!hasOptions.value) return
  if (hoverIndex.value < filterOption.value!.length - 1) {
    hoverIndex.value++
  } else {
    hoverIndex.value = 0
  }
}

const onEsc = () => {
  visible.value = false
}

const onEnter = () => {
  if (!hasOptions.value) return

  const item = filterOption.value![hoverIndex.value]

  emit('update:modelValue', item.value)
  emit('change', item.value)
  inputRef.value?.blur()
}

const onItemClick = (value: string | number) => {
  if (disabled.value) return
  visible.value = false
  emit('update:modelValue', value)
  emit('change', value)
  emit('select', value)
}

const onClearValue = async () => {
  if (props.clearable === false) return
  emit('update:modelValue', '')
  emit('change', '')
}

const setSelected = () => {
  if (!hasOptions.value || !filterOption.value || !props.modelValue)
    return props.defaultActiveFirstOption ? 0 : -1

  const index = filterOption.value.findIndex(
    (option) => option.value === props.modelValue
  )
  hoverIndex.value = index
}

watch(hasOptions, (val) => {
  if (!val) {
    visible.value = false
  } else {
    visible.value = true
  }
})

defineExpose({
  blur: inputRef.value?.blur,
  focus: inputRef.value?.focus
})
</script>
