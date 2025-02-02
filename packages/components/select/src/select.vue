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
      :show-after="0"
      :hide-after="0"
      effect="light"
      :popper-class="[ns.e('popper'), popperClass!]"
      :popper-options="popperOption"
      :transition="`${ns.ns.value}-zoom-in-top`"
      :disabled="actualDisabled"
      :persistent="persistent"
      :gpu-acceleration="false"
      :placement="placement"
      pure
      :show-arrow="showArrow"
      popper-style="padding: 4px 0"
    >
      <template #default>
        <div
          :class="[
            ns.e('wrapper'),
            ns.is('multiple', existActualValue && multiple)
          ]"
        >
          <div :class="ns.e('prefix')">
            <slot name="prefix" />
          </div>
          <div :class="ns.e('content')">
            <div v-if="multiple" :class="ns.e('tags')">
              <n-tag
                v-for="(item, index) in taglist"
                :key="`${item.label}-${index}`"
                :class="ns.e('tag')"
                :type="tagType"
                :size="size"
                :closable="!actualDisabled"
                @close="handleTagDel(index)"
                @mousedown.prevent="() => true"
              >
                <template v-if="maxTagCount && index < maxTagCount">
                  {{ isObject(item) && !isNil(item.label) ? item.label : item }}
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
                      :key="`${item.label}-${index}`"
                      :class="ns.e('tag')"
                      :size="size"
                      :type="tagType"
                      :closable="!actualDisabled"
                      @close="handleTagDel(index + maxTagCount!)"
                      @mousedown.prevent="() => true"
                    >
                      {{
                        isObject(item) && !isNil(item.label) ? item.label : item
                      }}
                    </n-tag>
                  </div>
                </template>
              </n-tooltip>
            </div>
            <div v-show="showDisplayedValue" :class="displayedValueCls">
              <span>{{ displayedValue }}</span>
            </div>
            <div :class="ns.em('input', 'wrapper')">
              <input
                :id="formItemId"
                ref="inputRef"
                v-model="inputValue"
                :class="[ns.e('input'), ns.is('disabled', actualDisabled)]"
                :style="{
                  minWidth: (calculateWidth || MINIMAL_INPUT_WIDTH) + 'px'
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
                v-if="showSearch && isFocused"
                ref="inputTextRef"
                aria-hidden="true"
                :class="ns.e('input-text')"
              >
                {{ inputValue }}
              </span>
            </div>
          </div>
          <div v-if="showSuffix" :class="ns.e('suffix')">
            <template v-if="loading">
              <n-icon size="16" :class="ns.m('loading')">
                <Loader />
              </n-icon>
            </template>
            <template v-if="!$slots.suffix && !loading">
              <n-icon v-if="!shouldShowClearIcon" size="16">
                <ArrowDown
                  :style="[{ transition: 'all .3s' }, arrowIconStyle]"
                />
              </n-icon>
              <n-icon v-else size="16">
                <Close @click.stop="clearValue" />
              </n-icon>
            </template>
            <slot name="suffix" />
          </div>
        </div>
      </template>
      <template #content>
        <ul
          ref="optionRef"
          :style="tooltipContentStyle"
          :class="`${ns.ns.value}-select-option__wrapper`"
        >
          <slot />
        </ul>
        <span v-if="noMatchValue || options.size === 0" class="empty-value">
          {{ emptyText || t('noc.select.noMatch') }}
        </span>
      </template>
    </n-tooltip>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  nextTick,
  onMounted,
  provide,
  reactive,
  ref,
  toRef,
  watch
} from 'vue'
import { onClickOutside, useElementSize } from '@vueuse/core'
import {
  RiArrowDownSLine as ArrowDown,
  RiCloseCircleFill as Close,
  RiLoader5Fill as Loader
} from '@remixicon/vue'
import {
  isArray,
  isBoolean,
  isFunction,
  isNil,
  isObject,
  isString
} from '@/utils'
import NIcon from '@/components/icon'
import NTag from '@/components/tag'
import NTooltip from '@/components/tooltip'
import { useFormItem } from '@/components/form'
import {
  useComposition,
  useFocusController,
  useLocale,
  useNamespace
} from '@/composables'
import { selectEmits, selectProps } from './select'
import { SELECT_INJECTION_KEY } from './constants'
import type { OptionProxy } from './constants'
import type { TooltipInstance } from '@/components/tooltip'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'NSelect'
})

const props = defineProps(selectProps)
const emit = defineEmits(selectEmits)

const ns = useNamespace('select')
const { formItemId, formItemDisabled, formItemSize } = useFormItem()
const { t } = useLocale()

const MINIMAL_INPUT_WIDTH = 8

const tooltipRef = ref<TooltipInstance>()
const inputRef = ref<HTMLInputElement>()
const optionRef = ref<HTMLUListElement>()
const inputTextRef = ref<HTMLSpanElement>()

const isHover = ref(false)
const visible = ref(false)
const multipleValue = ref<any[]>([])
const inputValue = ref<any>('')
const options = ref(new Map())
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
} = useFocusController(inputRef)

onClickOutside(wrapperRef, (e: MouseEvent) => {
  if (optionRef.value?.contains(e.target as Node)) return

  visible.value = false
})

const { height } = useElementSize(wrapperRef)

const arrowIconStyle = computed<CSSProperties>(() => {
  return {
    transform: visible.value ? 'rotate(180deg)' : ''
  }
})

const tooltipContentStyle = computed<CSSProperties>(() => {
  return {
    width: `${wrapperRef.value?.getBoundingClientRect().width}px`,
    maxHeight: isString(props.height) ? props.height : `${props.height}px`
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
      return option?.label
    }
  }
  return props.placeholder
})

const showDisplayedValue = computed(() => {
  if (props.showSearch) {
    if (visible.value) {
      if (!inputValue.value) {
        return true
      }
      return false
    }
    return true
  }
  return true
})

const shouldShowClearIcon = computed(() => {
  return props.clearValue && existActualValue.value && isHover.value
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

const getTaglist = (fn: (list: any[]) => any[]) => {
  const list: any[] = []
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

const filterable = computed(() => {
  const filterOption = () => {
    if (isBoolean(props.filterOption)) {
      return props.filterOption
    } else if (isFunction(props.filterOption)) {
      return true
    }
    return false
  }
  return props.showSearch && filterOption()
})

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
    filterable.value &&
    !optionsArray.value.some((o) => o.label.includes(inputValue.value))
  )
})

const actualDisabled = computed(() => formItemDisabled || props.disabled)
const actualSize = computed(() => formItemSize || props.size)

const readonly = computed(() => {
  return !props.showSearch
})

const handleSelectClick = (e: MouseEvent) => {
  if (actualDisabled.value) return

  visible.value = !visible.value
  setSelected()

  if (props.showSearch) {
    handleFocus(e)
  }
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

const setSelected = () => {
  if (!props.modelValue) return
  if (!isArray(props.modelValue)) {
    const option = getOptionValue(props.modelValue)

    hoveringIndex.value = optionsArray.value.findIndex(
      (o) => o.label === option?.label
    )
    return
  } else {
    multipleValue.value = props.modelValue
    hoveringIndex.value = 0
  }
}

const clickOption = (vm: OptionProxy) => {
  const { value } = vm

  if (props.multiple) {
    if (isArray(multipleValue.value)) {
      const index = getOptionIndex(multipleValue.value, value)

      if (index > -1) {
        multipleValue.value?.splice(index, 1)
      } else {
        multipleValue.value.push(value)
      }
    }
  } else {
    visible.value = false
    inputValue.value = value
  }
  if (props.multiple) {
    emitEvent(multipleValue.value)
    emit('select', multipleValue.value)
  } else {
    emitEvent(inputValue.value)
    emit('select', inputValue.value)
  }
}

const getOptionValue = (value: any) => {
  let newOption

  for (let i = 0; i < options.value.size; i++) {
    const option = optionsArray.value[i]
    const isEqual = isObject(value)
      ? option.value[props.valueKey!] === value[props.valueKey!]
      : option.value === value

    if (isEqual) {
      newOption = {
        value,
        label: options.value.get(value)?.label
      }
      break
    }
  }

  return newOption!
}

const getOptionIndex = (arr: any[] = [], val: any) => {
  if (!isObject(val)) return arr.indexOf(val)

  let index = -1

  if (isObject(val)) {
    for (let i = 0; i < arr.length - 1; i++) {
      const item = arr[i]
      if (item[props.valueKey!] === val[props.valueKey!]) {
        index = i
        return index
      }
    }
  }

  return index
}

const handleInput = async (e: Event) => {
  if (isComposed.value || !props.showSearch) return
  const { value: query } = e.target as HTMLInputElement

  inputValue.value = query

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

const emitEvent = (val: any) => {
  emit('update:modelValue', val)
  emit('select', val)
}

const handleBlur = () => {
  const event = new FocusEvent('focus')
  onBlur(event)
  visible.value = false
}

watch(height, () => {
  tooltipRef.value?.updatePopper()
})

watch(visible, (val) => {
  if (!val) {
    inputValue.value = ''
  }
})

onMounted(() => {
  setSelected()
})

provide(
  SELECT_INJECTION_KEY,
  reactive({
    multipleValue,
    inputValue,
    options,
    optionsArray,
    hoveringIndex,
    filterable,
    valueKey: toRef(props, 'valueKey'),
    multiple: toRef(props, 'multiple'),
    modelValue: toRef(props, 'modelValue'),
    filterOption: toRef(props, 'filterOption'),

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
