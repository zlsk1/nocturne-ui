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
      :transition="`${ns.ns.value}-zoom-in-top`"
      :disabled="actualDisabled"
      :persistent="persistent"
      :gpu-acceleration="false"
      :placement="placement"
      pure
      popper-style="padding: 4px 0"
    >
      <template #default>
        <div
          :class="[
            ns.e('wrapper'),
            ns.is('multiple', existActualValue && multiple)
          ]"
        >
          <div :class="ns.e('content')">
            <n-tag
              v-for="(item, index) in taglist"
              :key="index"
              :class="ns.e('tag')"
              :type="tagType"
              closable
              @close="handleTagDel(item)"
              @mousedown.prevent="() => true"
            >
              {{ isObject(item) && !isNil(item.label) ? item.label : item }}
            </n-tag>
            <div
              v-if="!inputValue"
              :class="[ns.e('placeholder'), ns.is('disabled', actualDisabled)]"
            >
              <span>{{ displayedValue }}</span>
            </div>
            <div
              v-if="filterable"
              :class="ns.em('input', 'wrapper')"
              :style="{ width: (calculateWidth || MINIMAL_INPUT_WIDTH) + 'px' }"
            >
              <input
                :id="formItemId"
                ref="inputRef"
                :value="inputValue"
                type="text"
                :class="ns.e('input')"
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
                ref="calculateInputWidthRef"
                arial-hidden="true"
                :class="ns.em('input', 'calculator')"
              >
                {{ inputValue }}
              </span>
            </div>
          </div>
          <div :class="ns.e('icon')">
            <n-icon v-if="!shouldShowClearIcon">
              <ArrowDown
                size="16"
                :style="[{ transition: 'all .3s' }, arrowIconStyle]"
              />
            </n-icon>
            <n-icon v-else>
              <CloseCircle size="16" @click.stop="clearValue" />
            </n-icon>
          </div>
        </div>
      </template>
      <template #content>
        <ul
          ref="optionRef"
          :style="selectWrapperStyle"
          :class="`${ns.ns.value}-select-option__wrapper`"
        >
          <slot />
        </ul>
        <span v-if="noMatchValue" class="empty-value">
          {{ emptyText }}
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
  RiCloseCircleLine as CloseCircle
} from '@remixicon/vue'
import { isArray, isNil, isObject } from '@/utils'
import NIcon from '@/components/icon'
import NTag from '@/components/tag'
import NTooltip from '@/components/tooltip'
import { useFormItem } from '@/components/form'
import { useComposition, useFocusController, useNamespace } from '@/composables'
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
const { formItemId, formItemDisabled } = useFormItem()

const MINIMAL_INPUT_WIDTH = 8

const tooltipRef = ref<TooltipInstance>()
const inputRef = ref<HTMLInputElement>()
const optionRef = ref<HTMLUListElement>()
const calculateInputWidthRef = ref<HTMLSpanElement>()

const isHover = ref(false)
const visible = ref(false)
const multipleValue = ref<any[]>([])
const singleValue = ref('')
const inputValue = ref('')
const options = ref(new Map())
const calculateWidth = ref(MINIMAL_INPUT_WIDTH)
const hoveringIndex = ref(0)

const {
  isComposed,
  hadnleCompositionEnd,
  handleCompositionStart,
  handleCompositionUpdate
} = useComposition({ afterComposition: (e) => handleInput(e) })

const { wrapperRef, isFocused, handleFocus, handleBlur } =
  useFocusController(inputRef)

onClickOutside(wrapperRef, (e: MouseEvent) => {
  if (optionRef.value?.contains(e.target as Node)) return

  visible.value = false
  const event = new FocusEvent('focus', e)
  handleBlur(event)
  nextTick(() => nextTick(() => (inputValue.value = '')))
})

const { height } = useElementSize(wrapperRef)

watch(height, () => {
  tooltipRef.value?.updatePopper()
})

const arrowIconStyle = computed<CSSProperties>(() => {
  return {
    transform: visible.value ? 'rotate(180deg)' : ''
  }
})

const selectWrapperStyle = computed<CSSProperties>(() => {
  return {
    width: `${wrapperRef.value?.getBoundingClientRect().width}px`,
    maxHeight: `${props.height}px`
  }
})

const existActualValue = computed(() => {
  if (!isNil(multipleValue.value)) {
    if (props.multiple) {
      return multipleValue.value.length > 0
    } else return singleValue.value !== ''
  }
  return false
})

const shouldShowClearIcon = computed(() => {
  return props.clearValue && existActualValue.value && isHover.value
})

const displayedValue = computed(() => {
  return existActualValue.value
    ? props.multiple
      ? ''
      : singleValue.value
    : props.placeholder
})

const taglist = computed<any[]>(() => {
  if (props.multiple) {
    if (props.valueKey) {
      return multipleValue.value as []
    } else if (isArray(multipleValue.value)) {
      return multipleValue.value
    }
  }
  return []
})

const selectCls = computed(() => [
  ns.b(),
  ns.m(props.size),
  ns.is('disabled', actualDisabled.value),
  ns.is('focus', isFocused.value),
  ns.is('filterable', props.filterable),
  ns.is('selecting', existActualValue.value)
])

const optionsArray = computed(() => Array.from(options.value.values()))

const noMatchValue = computed(() => {
  return (
    inputValue.value &&
    !optionsArray.value.find((o) => o.label.includes(inputValue.value))
  )
})

const actualDisabled = computed(() => formItemDisabled || props.disabled)

const handleSelectClick = (e: MouseEvent) => {
  if (actualDisabled.value) return

  visible.value = !visible.value
  setSelected()

  if (props.filterable) {
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
  singleValue.value = ''
  if (props.multiple) {
    emit('update:modelValue', multipleValue.value)
  } else {
    emit('update:modelValue', singleValue.value)
  }
}

const handleTagDel = (val: string | number | boolean | object) => {
  if (!props.multiple) return

  if (isArray(multipleValue.value)) {
    let index = -1
    for (let i = 0; i < multipleValue.value.length; i++) {
      if (!isObject(val)) {
        index = multipleValue.value.indexOf(val)
        break
      } else {
        index = multipleValue.value.findIndex(
          (v) => v[props.valueKey!] === val.value[props.valueKey!]
        )
        break
      }
    }
    multipleValue.value.splice(index, 1)
  }
}

const setSelected = () => {
  if (props.modelValue && !isArray(props.modelValue)) {
    const option = getOptionValue(props.modelValue)
    hoveringIndex.value = optionsArray.value.findIndex(
      (o) => o.label === option?.label
    )

    singleValue.value = String(option?.label)
    return
  } else if (props.modelValue && isArray(props.modelValue)) {
    multipleValue.value = props.modelValue
    hoveringIndex.value = 0
  }
}

const clickOption = (vm: OptionProxy) => {
  const { value, label } = vm

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
    singleValue.value = String(label)
  }
  if (props.multiple) {
    emit('update:modelValue', multipleValue.value)
  } else {
    emit('update:modelValue', singleValue.value)
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

  return newOption
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

const handleInput = (e: Event) => {
  if (isComposed.value || !props.filterable) return
  inputValue.value = (e.target as HTMLInputElement).value
  nextTick(
    () =>
      (calculateWidth.value = Math.ceil(
        calculateInputWidthRef.value?.getBoundingClientRect().width!
      ))
  )
  // getFilterResult(inputValue.value)
}

// const getFilterResult = (value: string) => {
//   cachedOptions.value.clear()
//   for (let i = 0; i < options.value.size; i++) {
//     const option = optionsArray.value[i]
//     const isInclude = option.label.includes(value)

//     if (isInclude) {
//       cachedOptions.value.set(option.value, option)
//     }
//   }
// }

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
  handleItemHovering('prev')
}

const handleDown = () => {
  handleItemHovering('next')
}

const handleItemHovering = (modifier: 'next' | 'prev') => {
  if (options.value.size === 0 || isComposed.value) return
  if (modifier === 'next') {
    hoveringIndex.value =
      hoveringIndex.value < options.value.size - 1 ? ++hoveringIndex.value : 0
  } else if (modifier === 'prev') {
    hoveringIndex.value =
      hoveringIndex.value > 0 ? --hoveringIndex.value : options.value.size - 1
  }

  const option = optionsArray.value[hoveringIndex.value]
  if (option.disabled) {
    handleItemHovering(modifier)
  }
}

onMounted(() => {
  setSelected()
})

provide(
  SELECT_INJECTION_KEY,
  reactive({
    multipleValue,
    singleValue,
    inputValue,
    options,
    optionsArray,
    hoveringIndex,

    valueKey: toRef(props, 'valueKey'),
    multiple: toRef(props, 'multiple'),
    filterable: toRef(props, 'filterable'),

    clickOption,
    createOption
  })
)
</script>
