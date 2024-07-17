<template>
  <div
    ref="selectRef"
    :class="[
      'n-select',
      size ? `n-select--${size}` : '',
      {
        'is-focus': visable,
        'is-disabled': disabled
      }
    ]"
    @click.stop="handleSelectClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <NTooltip
      ref="tooltipRef"
      :visible="visable"
      trigger="click"
      :show-after="0"
      :hide-after="0"
      effect="light"
      :popper-class="[
        'n-select__popper',
        popperClass
      ]"
      transition="n-zoom-in-top"
      :disabled="disabled"
      :persistent="persistent"
      :gpu-acceleration="false"
      :placement="placement"
    >
      <template #default>
        <div
          :class="[
            'n-select__wrapper',
            // size ? `n-select--${size}` : '',
            {
              'is-multiple': existActualValue && multiple
            }
          ]"
        >
          <div class="n-select__input-wrapper">
            <input
              v-if="!multiple"
              ref="inputRef"
              type="text"
              class="n-select__input"
              style="width: 10px;"
            >
            <NTag
              v-for="(item, index) in taglist"
              v-else
              :key="index"
              class="n-select__tag"
              :type="tagType"
              closable
              @close="handleTagDel(item as never)"
              @mousedown.prevent="() => true"
            >
              {{ !isNil(item.label) ? item.label : item }}
            </NTag>
            <div
              :class="[
                'n-select__placeholder',
                {
                  'is-selecting': existActualValue,
                  'is-disabled': disabled
                }
              ]"
            >
              {{ placeholder }}
            </div>
          </div>
          <div class="n-select__icon">
            <n-icon v-if="!shouldShowClearIcon">
              <ArrowDown
                size="16"
                :style="[
                  { transition: 'all .3s' },
                  visable ? arrowIconStyle : ''
                ]"
              ></ArrowDown>
            </n-icon>
            <CloseCircle
              v-else
              size="16"
              @click.stop="clearValue"
            ></CloseCircle>
          </div>
        </div>
      </template>
      <template #content>
        <ul
          ref="optionRef"
          class="n-select-option__wrapper"
          :style="selectWrapperStyle"
        >
          <slot></slot>
        </ul>
      </template>
    </NTooltip>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  onMounted,
  provide,
  ref,
  watch
} from 'vue'
import {
  NTooltip,
  NIcon,
  NTag
} from '@/components'
import { SELECT_INJECTION_KEY } from './constants'
import { selectProps, selectEmits } from './select'
import { onClickOutside, useElementSize } from '@vueuse/core'
import {
  isNil,
  isArray,
  isObject
} from '@/utils'
import {
  RiArrowDownWideLine as ArrowDown,
  RiCloseCircleLine as CloseCircle
} from '@remixicon/vue'
import type { CSSProperties } from 'vue'
import type { TooltipInstance } from '@/components/tooltip'
import type { OptionProxy } from './constants'

defineOptions({
  name: 'NSelect'
})

const props = defineProps(selectProps)
const emit = defineEmits(selectEmits)

const tooltipRef = ref<TooltipInstance>()
const inputRef = ref<HTMLInputElement>()
const selectRef = ref<HTMLElement>()
const optionRef = ref<HTMLUListElement>()

const isHover = ref(false)
const visable = ref(false)
const actualVal = ref(props.modelValue)
const actualLabel = ref<any>([])
const options = new Map()

onMounted(() => {
  setSelected()
})

onClickOutside(selectRef, (e: MouseEvent) => {
  if (optionRef.value?.contains(e.target as Node)) return

  visable.value = false
})

const { height } = useElementSize(selectRef)

watch(actualVal, (val) => {
  if (!isNil(val)) emit('update:modelValue', val)
})

watch(height, () => {
  tooltipRef.value?.updatePopper()
})

const arrowIconStyle = computed<CSSProperties>(() => {
  return {
    transform: 'rotate(180deg)'
  }
})

const selectWrapperStyle = computed<CSSProperties>(() => {
  return {
    width: selectRef.value?.getBoundingClientRect().width + 'px',
    maxHeight: props.height + 'px'
  }
})

const existActualValue = computed(() => {
  if (!isNil(actualVal.value)) {
    if (isArray(actualVal.value)) {
      return actualVal.value.length > 0
    }
    else return actualVal.value !== ''
  }
  return false
})

const shouldShowClearIcon = computed(() => {
  return props.clearValue && existActualValue.value && isHover.value
})

const placeholder = computed(() => {
  return existActualValue.value
    ? props.multiple
      ? ''
      : actualLabel.value
    : props.placeholder
})

const taglist = computed(() => {
  if (props.valueKey) {
    return actualLabel.value
  }
  else if (props.multiple && isArray(actualVal.value)) {
    return actualVal.value
  }
  return []
})

const handleSelectClick = () => {
  if (props.disabled) return

  visable.value = !visable.value
}

const handleMouseEnter = () => {
  isHover.value = true
}

const handleMouseLeave = () => {
  isHover.value = false
}

const clearValue = () => {
  actualVal.value = props.multiple ? [] : ''
  actualLabel.value = props.multiple ? [] : ''
  emit('update:modelValue', actualVal.value)
}

const handleTagDel = (val: any) => {
  const _actualVal = actualVal.value as Array<string | number | boolean | Object>

  if (props.multiple) {
    let index = -1
    for (let i = 0; i < _actualVal.length; i++) {
      if (!isObject(val)) {
        index = _actualVal.indexOf(val)
        break
      }
      else {
        index = _actualVal.findIndex(v =>
          v[props.valueKey as keyof typeof v] === val.value[props.valueKey!]
        )
        break
      }
    }
    _actualVal.splice(index, 1)
    actualLabel.value.splice(index, 1)
  }
}

const setSelected = () => {
  if (!props.multiple) {
    const option = getOptionValue(props.modelValue)

    actualLabel.value = option?.label
    return
  }

  const result: any[] = []

  if (isArray(props.modelValue)) {
    props.modelValue.forEach((value) => {
      result.push(getOptionValue(value))
    })
  }
  actualLabel.value = result
}

const clickOption = (vm: OptionProxy) => {
  const { value, label } = vm
  const _actualVal = actualVal.value as Array<string | number | boolean | Object>

  if (props.multiple) {
    const index = getOptionIndex(actualVal.value as [], value)

    if (index > -1) {
      _actualVal?.splice(index, 1)
      actualLabel.value.splice(index, 1)
    }
    else {
      _actualVal.push(value!)
      actualLabel.value.push({ value, label })
    }
  }
  else {
    visable.value = false
    actualVal.value = isObject(value) ? options.get(value).value : value
    actualLabel.value = isObject(value) ? options.get(value).label : label
  }
}

const getOptionValue = (value: any) => {
  let newOption
  const _actualVal = actualVal.value as Array<string | number | boolean | Object>

  for (let i = 0; i < options.size - 1; i++) {
    const option = props.multiple ? _actualVal[i] : _actualVal

    const isEqual = isObject(option)
      ? option[props.valueKey!] === value[props.valueKey!]
      : option === value

    if (isEqual) {
      newOption = {
        value,
        label: options.get(value)?.label
      }
      break
    }
  }

  return newOption
}

const getOptionIndex = (arr: any[] = [], val: any) => {
  if (!isObject(val)) return arr.indexOf(val)

  let index = -1

  arr.some((v, i) => {
    if (v[props.valueKey as keyof typeof v] === val[props.valueKey as string]) {
      index = i
      return
    }
  })

  return index
}

provide(SELECT_INJECTION_KEY, {
  actualVal,
  options,
  valueKey: props.valueKey!,
  multiple: props.multiple,

  clickOption
})
</script>

<style lang="scss" scoped>
@use '@/theme-chalk/option.scss';
@use '@/theme-chalk/select.scss';
@use '@/theme-chalk/common/transition.scss';
</style>
