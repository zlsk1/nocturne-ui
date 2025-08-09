<template>
  <div
    ref="wrapperRef"
    :class="selectCls"
    @click.stop="handleSelectClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <n-tooltip
      ref="tooltipRef"
      :visible="visible"
      trigger="click"
      :offset="6"
      :popper-class="[ns.e('popper'), popperClass!]"
      :popper-style="tooltipContentStyle"
      :popper-options="popperOption"
      :transition="`${ns.ns.value}-zoom-in-top`"
      :disabled="actualDisabled"
      :persistent="persistent"
      :gpu-acceleration="false"
      :placement="placement"
      pure
      :show-arrow="showArrow"
      @hide="onHide"
    >
      <template #default>
        <div
          :class="[
            ns.e('wrapper'),
            ns.is('multiple', existActualValue && multiple)
          ]"
        >
          <div v-if="$slots.prefix" :class="ns.e('prefix')">
            <slot name="prefix" />
          </div>
          <div :class="ns.e('content')">
            <div :class="ns.m('selector')">
              <div :class="ns.m('selector-wrapper')">
                <div :class="ns.m('selector-overflow')">
                  <n-tag
                    v-for="(item, index) in taglist"
                    :key="`${item}-${index}`"
                    :class="ns.e('tag')"
                    :type="tagType"
                    :size="size"
                    :closable="!actualDisabled"
                    :bordered="false"
                    @close="onTagClose(index)"
                    @mousedown.prevent="noop"
                  >
                    <template v-if="!maxTagCount || index < maxTagCount">
                      {{ item }}
                    </template>
                  </n-tag>
                  <n-tag
                    v-if="
                      !maxTagCountWithTooltip &&
                      maxTagCount &&
                      multipleValue.length > maxTagCount
                    "
                    :class="ns.e('tag')"
                    :type="tagType"
                    :size="size"
                  >
                    {{ `+${multipleValue.length - (maxTagCount || 0)}...` }}
                  </n-tag>
                  <n-tooltip
                    v-if="
                      maxTagCountWithTooltip &&
                      maxTagCount &&
                      multipleValue.length > maxTagCount
                    "
                    :popper-class="ns.m('tags__popper')"
                    :disabled="actualDisabled"
                  >
                    <n-tag :class="ns.e('tag')" :type="tagType" :size="size">
                      {{ `+${multipleValue.length - (maxTagCount || 0)}...` }}
                    </n-tag>
                    <template #content>
                      <div :class="ns.e('tags')">
                        <n-tag
                          v-for="(item, index) in extraTaglist"
                          :key="`${item}-${index}`"
                          :class="ns.e('tag')"
                          :size="size"
                          :type="tagType"
                          :closable="!actualDisabled"
                          @close="handleTagDel(index + maxTagCount!)"
                          @mousedown.prevent="noop"
                        >
                          {{ item }}
                        </n-tag>
                      </div>
                    </template>
                  </n-tooltip>
                  <div v-show="showDisplayedValue" :class="displayedValueCls">
                    <span>{{ displayedValue }}</span>
                  </div>
                  <div :class="ns.em('input', 'wrapper')">
                    <input
                      :id="formItemId"
                      ref="inputRef"
                      v-model="inputValue"
                      :class="[
                        ns.e('input'),
                        ns.is('disabled', actualDisabled)
                      ]"
                      :style="{
                        width: (calculateWidth || MINIMAL_INPUT_WIDTH) + 'px'
                      }"
                      type="text"
                      :disabled="actualDisabled"
                      tabindex="0"
                      :readonly="readonly"
                      spellcheck="false"
                      autocomplete="off"
                      role="combobox"
                      @input="handleInput"
                      @compositionend="hadnleCompositionEnd"
                      @compositionstart="handleCompositionStart"
                      @compositionupdate="handleCompositionUpdate"
                      @keydown.esc.stop="handleEsc"
                      @keydown.esc.enter="handleEnter"
                      @keydown.up.enter="handleUp"
                      @keydown.down.enter="handleDown"
                    />
                    <span
                      v-show="showSearch && isFocused"
                      ref="inputTextRef"
                      aria-hidden="true"
                      :class="ns.e('input-text')"
                    >
                      {{ inputValue }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <template v-if="showSuffix">
            <transition name="fade-in-linear">
              <n-icon v-if="loading" :class="[ns.em('suffix', 'icon')]">
                <LoadingOutlined />
              </n-icon>
            </transition>
            <slot v-if="!loading" name="suffix">
              <transition name="fade-in-linear">
                <n-icon
                  v-if="!shouldShowClearIcon"
                  :class="ns.em('suffix', 'icon')"
                >
                  <DownOutlined
                    v-if="!isFocused || actualDisabled || !showSearch"
                  />
                  <SearchOutlined v-else-if="showSearch" />
                </n-icon>
                <n-icon
                  v-else
                  :class="[ns.em('suffix', 'icon'), ns.m('close')]"
                >
                  <CloseCircleFilled @click.stop="clearValue" />
                </n-icon>
              </transition>
            </slot>
          </template>
        </div>
      </template>
      <template #content>
        <div :class="`${ns.ns.value}-select-option__wrapper`">
          <ul :class="`${ns.ns.value}-select-option__list`">
            <slot />
          </ul>
          <div v-if="noMatchValue || options.size === 0" :class="ns.m('empty')">
            <slot name="empty">
              <n-empty>
                <template #description>
                  <span v-if="noMatchValue">{{ t('noc.select.noMatch') }}</span>
                  <span v-else-if="options.size === 0">
                    {{ t('noc.select.noData') }}
                  </span>
                </template>
              </n-empty>
            </slot>
          </div>
        </div>
      </template>
    </n-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, provide, reactive, ref, toRefs, watch } from 'vue'
import { useElementSize } from '@vueuse/core'
import {
  CloseCircleFilled,
  DownOutlined,
  LoadingOutlined,
  SearchOutlined
} from '@ant-design/icons-vue'
import { isArray, isNil, isObject, isString } from '@nocturne-ui/utils'
import NIcon from '@nocturne-ui/components/icon'
import NTag from '@nocturne-ui/components/tag'
import NTooltip from '@nocturne-ui/components/tooltip'
import NEmpty from '@nocturne-ui/components/empty'
import { useForm, useFormItem } from '@nocturne-ui/components/form'
import {
  useComposition,
  useFocusController,
  useLocale,
  useNamespace
} from '@nocturne-ui/composables'
import { noop } from 'lodash'
import { selectEmits, selectProps } from './select'
import { SELECT_INJECTION_KEY } from './constants'
import type { TooltipInstance } from '@nocturne-ui/components/tooltip'
import type { CSSProperties } from 'vue'
import type {
  OptionProxy,
  SelectMergedValue,
  SelectMultipleValue,
  SelectSingleValue
} from './types'

defineOptions({
  name: 'NSelect'
})

const props = defineProps(selectProps)
const emit = defineEmits(selectEmits)

const ns = useNamespace('select')
const { formItemId, formItemDisabled, formItemSize } = useFormItem()
const { formItem } = useForm()
const { t } = useLocale()

const MINIMAL_INPUT_WIDTH = 8

const tooltipRef = ref<TooltipInstance>()
const inputRef = ref<HTMLInputElement>()
const inputTextRef = ref<HTMLSpanElement>()

const isHover = ref(false)
const visible = ref(false)
const multipleValue = ref<SelectMultipleValue>([])
const inputValue = ref<string>('')
const options = ref(new Map<OptionProxy['value'], OptionProxy>())
const calculateWidth = ref(MINIMAL_INPUT_WIDTH)
const hoveringIndex = ref(0)

const {
  isComposed,
  hadnleCompositionEnd,
  handleCompositionStart,
  handleCompositionUpdate
} = useComposition({ afterComposition: (e) => handleInput(e) })

const {
  wrapperRef,
  isFocused,
  handleFocus,
  handleBlur: onBlur
} = useFocusController(inputRef, {
  beforeBlur: (e: FocusEvent) => {
    // in multiple mode, click option will blur input
    if (
      visible.value &&
      tooltipRef.value?.isFocusInsideContent(e) &&
      e.relatedTarget
    ) {
      inputRef.value?.focus()
      return true
    }
    return false
  },
  afterBlur: () => {
    formItem?.validate('blur')
    visible.value = false
  },
  beforeFocus: () => {
    return actualDisabled.value
  }
})

const { height, width } = useElementSize(wrapperRef)

const tooltipContentStyle = computed<CSSProperties>(() => {
  return {
    width: `${width.value}px`
  }
})

const existActualValue = computed(() => {
  if (props.multiple) {
    if (!isNil(props.modelValue)) {
      return (props.modelValue as []).length > 0
    }
  } else {
    if (isString(props.modelValue)) {
      return props.modelValue !== ''
    }
    return !isNil(props.modelValue)
  }
  return false
})

const displayedValue = computed(() => {
  if (existActualValue.value) {
    if (props.multiple) {
      return ''
    } else if (props.modelValue) {
      const option = getOptionValue(props.modelValue)
      if (option) {
        return option?.label
      }
      return props.placeholder || t('noc.select.placeholder')
    }
  }
  return props.placeholder || t('noc.select.placeholder')
})

const showDisplayedValue = computed(() => {
  if (props.showSearch) {
    if (!inputValue.value) {
      return true
    }
    return false
  }
  return true
})

const shouldShowClearIcon = computed(() => {
  return (
    props.clearValue &&
    existActualValue.value &&
    isHover.value &&
    !actualDisabled.value
  )
})

const taglist = computed(() => {
  if (props.multiple) {
    return getTaglist((list) => list.slice(0, props.maxTagCount))
  }
  return []
})

const extraTaglist = computed(() => {
  if (!props.maxTagCountWithTooltip) return []
  return getTaglist((list) =>
    list.slice(props.maxTagCount, multipleValue.value.length)
  )
})

const filteredValue = ref('')

const getTaglist = (
  fn: (list: Array<string | number>) => Array<string | number>
) => {
  const list: Array<string | number> = []
  for (const item of multipleValue.value) {
    const option = getOptionValue(item)
    if (option) {
      list.push(option.label)
    }
  }
  if (props.maxTagCount) {
    return fn(list)
  }
  return list
}

const selectCls = computed(() => [
  ns.b(),
  ns.m(actualSize.value),
  ns.is('disabled', actualDisabled.value),
  ns.is('focus', (visible.value || isFocused.value) && !actualDisabled.value),
  ns.is('filterable', props.showSearch),
  ns.is('selecting', visible.value),
  ns.is('multiple', props.multiple)
])

const displayedValueCls = computed(() => [
  ns.m('value'),
  ns.is('placeholder', !existActualValue.value)
])

const optionsArray = computed(() => Array.from(options.value.values()))

const noMatchValue = computed(() => {
  return (
    props.showSearch &&
    !optionsArray.value.some((o) =>
      String(o.label).toLowerCase().includes(inputValue.value.toLowerCase())
    )
  )
})

const actualDisabled = computed(() => formItemDisabled.value || props.disabled)
const actualSize = computed(() => formItemSize.value || props.size)

const readonly = computed(() => {
  return !props.showSearch
})

const handleSelectClick = () => {
  if (actualDisabled.value) return

  visible.value = !visible.value
  setHovering()
}

const handleMouseEnter = () => {
  isHover.value = true
}

const handleMouseLeave = () => {
  isHover.value = false
}

const clearValue = () => {
  multipleValue.value = []
  inputValue.value = ''
  if (props.multiple) {
    emitEvent(multipleValue.value)
  } else {
    emitEvent(inputValue.value)
  }
}

const handleTagDel = (index: number) => {
  if (!props.multiple) return
  multipleValue.value.splice(index, 1)
  emitEvent(multipleValue.value)
}

const setHovering = () => {
  if (!props.modelValue) return
  if (!isArray(props.modelValue)) {
    const option = getOptionValue(props.modelValue)
    hoveringIndex.value = 0

    // skip disabled option
    for (let i = 0; i < optionsArray.value.length; i++) {
      const o = optionsArray.value[i]

      if (o.label === option.label || o.disabled) {
        hoveringIndex.value++
      } else {
        return
      }
    }
  } else {
    hoveringIndex.value = 0
  }
}

const clickOption = (vm: OptionProxy) => {
  const { value, label } = vm

  if (props.multiple) {
    if (isArray(multipleValue.value)) {
      const index = getOptionIndex(multipleValue.value, value)

      if (index > -1) {
        multipleValue.value.splice(index, 1)
      } else {
        multipleValue.value.push(value as never)
      }
    }
    emitEvent(multipleValue.value)
    emit('select', multipleValue.value)
  } else {
    inputValue.value = String(label)
    emitEvent(value)
    emit('select', value)
  }
  if (!props.multiple) {
    visible.value = false
  }
}

const getOptionValue = (value: SelectSingleValue) => {
  let newOption

  for (let i = 0; i < options.value.size; i++) {
    const option = optionsArray.value[i]
    const isEqual = isObject(value)
      ? (option.value as Record<any, string>)[props.valueKey!] ===
        value[props.valueKey!]
      : option.value === value

    if (isEqual) {
      newOption = {
        value,
        label: options.value.get(value)!.label
      }
      break
    }
  }

  return newOption!
}

const getOptionIndex = (
  arr: SelectMultipleValue = [],
  val: SelectSingleValue
) => {
  if (!isObject(val)) return arr.indexOf(val as never)

  let index = -1

  if (isObject(val)) {
    for (let i = 0; i < arr.length - 1; i++) {
      const item = arr[i]
      if (isObject(item)) {
        if (item[props.valueKey!] === val[props.valueKey!]) {
          index = i
          return index
        }
      }
    }
  }

  return index
}

const handleInput = async (e: Event) => {
  if (isComposed.value || !props.showSearch) return
  const { value: query } = e.target as HTMLInputElement

  inputValue.value = query
  filteredValue.value = query

  emit('search', query)

  nextTick(
    () =>
      (calculateWidth.value = Math.ceil(
        inputTextRef.value?.getBoundingClientRect().width!
      ))
  )
}

const createOption = (vm: OptionProxy) => {
  options.value.set(vm.value, vm)
}

const handleEsc = () => {
  visible.value = false
}

const handleEnter = () => {
  visible.value = false
  const vm = optionsArray.value[hoveringIndex.value]
  clickOption(vm)
}

const handleUp = () => {
  handleItemHovering(-1)
}

const handleDown = () => {
  handleItemHovering(1)
}

const handleItemHovering = (offset: number) => {
  if (options.value.size === 0 || isComposed.value) return
  hoveringIndex.value =
    (hoveringIndex.value + offset + options.value.size) % options.value.size

  const option = optionsArray.value[hoveringIndex.value]
  if (option.disabled) {
    handleItemHovering(offset)
  }
}

const emitEvent = (val: SelectMergedValue) => {
  emit('update:modelValue', val)
  emit('select', val)
}

const handleBlur = () => {
  const event = new FocusEvent('focus')
  onBlur(event)
}

const onTagClose = (index: number) => {
  // beacuse close tag will focus input
  if (!visible.value && isFocused.value) {
    isFocused.value = false
    inputRef.value?.blur()
  }
  handleTagDel(index)
}

const onHide = () => {
  filteredValue.value = ''
}

watch(height, () => {
  tooltipRef.value?.updatePopper()
})

watch(visible, (val) => {
  if (!val) {
    inputValue.value = ''
  }
})

watch(
  () => props.modelValue,
  () => {
    formItem?.validate('change')
  }
)

watch(
  () => props.multiple,
  (val) => {
    if (val) {
      multipleValue.value = props.modelValue as []
    }
  },
  {
    immediate: true
  }
)

provide(
  SELECT_INJECTION_KEY,
  reactive({
    multipleValue,
    inputValue,
    options,
    optionsArray,
    hoveringIndex,
    filteredValue,
    ...toRefs(props),

    clickOption,
    createOption,
    getOptionValue
  })
)

defineExpose({
  focus: handleFocus,
  blur: handleBlur
})
</script>
