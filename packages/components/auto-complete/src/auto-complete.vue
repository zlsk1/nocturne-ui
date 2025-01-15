<template>
  <n-tooltip
    :visible="visible"
    pure
    :show-arrow="showArrow"
    :popper-class="[ns.e('popper'), popperClass]"
    :popper-style="{
      maxHeight: '200px',
      width: `${inputWidth}px`,
      ...popperStyle
    }"
  >
    <div ref="inputContainer" :class="[ns.b(), ns.is('disabled', disabled)]">
      <n-input
        :id="formItemId"
        ref="inputRef"
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
      />
    </div>
    <template #content>
      <slot v-if="$slots.default" />
      <ul v-if="hasOptions" ref="contentRef" :class="ns.e('content')">
        <li
          v-for="({ label, value }, index) in filterOption"
          :key="label"
          :class="[
            ns.e('content__item'),
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
import { useNamespace } from '@/composables'
import NInput from '@/components/input'
import NTooltip from '@/components/tooltip'
import { isFunction, isNumber, isUndefined } from '@/utils'
import { useFormItem } from '@/components/form'
import { autoCompleteEmits, autoCompleteProps } from './auto-complete'
import type { InputInstance } from '@/components/input'

defineOptions({
  name: 'NAutoComplete'
})

const props = defineProps(autoCompleteProps)
const emit = defineEmits(autoCompleteEmits)

const ns = useNamespace('auto-complete')
const { formItemDisabled, formItemId } = useFormItem()

const visible = ref(false)
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

const disabled = computed(() => formItemDisabled || props.disabled)

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
}

const onChange = (val: string) => {
  emit('change', val)
}

const onFocus = () => {
  if (hasOptions.value && isFocused.value && !disabled.value) {
    visible.value = true
  }
}

const onBlur = () => {
  // visible.value = false
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
}

const onClearValue = async () => {
  if (props.clearable === false) return
  emit('update:modelValue', '')
  emit('change', '')
}

watch(visible, (val) => {
  if (!val) {
    hoverIndex.value = props.defaultActiveFirstOption ? 0 : -1
  }
})

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
