<template>
  <div
    ref="selectRef"
    :class="selectCls"
    @click.stop="handleSelectClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <NTooltip
      ref="tooltipRef"
      :visible="visible"
      trigger="click"
      :show-after="0"
      :hide-after="0"
      effect="light"
      :popper-class="[ns.e('popper'), popperClass]"
      :transition="`${ns.ns.value}-zoom-in-top`"
      :disabled="disabled"
      :persistent="persistent"
      :gpu-acceleration="false"
      :placement="placement"
    >
      <template #default>
        <div
          :class="[
            ns.e('wrapper'),
            ns.is('multiple', existActualValue && multiple)
            // size ? `n-select--${size}` : '',
          ]"
        >
          <div :class="ns.em('input', 'wrapper')">
            <input
              v-if="!multiple"
              :id="labelId"
              ref="inputRef"
              type="text"
              :class="ns.e('input')"
            />
            <NTag
              v-for="(item, index) in taglist"
              v-else
              :key="index"
              :class="ns.e('tag')"
              :type="tagType"
              closable
              @close="handleTagDel(item as never)"
              @mousedown.prevent="() => true"
            >
              {{ !isNil(item.label) ? item.label : item }}
            </NTag>
            <div
              :class="[
                ns.e('placeholder'),
                ns.is('selecting', existActualValue),
                ns.is('disabled', disabled)
              ]"
            >
              {{ placeholder }}
            </div>
          </div>
          <div :class="ns.e('icon')">
            <n-icon v-if="!shouldShowClearIcon">
              <ArrowDown
                size="16"
                :style="[
                  { transition: 'all .3s' },
                  visible ? arrowIconStyle : ''
                ]"
              />
            </n-icon>
            <CloseCircle v-else size="16" @click.stop="clearValue" />
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
      </template>
    </NTooltip>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, provide, ref, watch } from 'vue'
import { onClickOutside, useElementSize } from '@vueuse/core'
import {
  RiArrowDownWideLine as ArrowDown,
  RiCloseCircleLine as CloseCircle
} from '@remixicon/vue'
import { SELECT_INJECTION_KEY } from './constants'
import { selectEmits, selectProps } from './select'
import type { CSSProperties } from 'vue'
import type { TooltipInstance } from '@/components/tooltip'
import type { OptionProxy } from './constants'
import { isArray, isNil, isObject } from '@/utils'
import { NIcon, NTag, NTooltip, useFormItemId } from '@/components'
import { useNamespace } from '@/composables'

defineOptions({
  name: 'NSelect'
})

const props = defineProps(selectProps)
const emit = defineEmits(selectEmits)

const ns = useNamespace('select')

const labelId = useFormItemId()

const tooltipRef = ref<TooltipInstance>()
const inputRef = ref<HTMLInputElement>()
const selectRef = ref<HTMLElement>()
const optionRef = ref<HTMLUListElement>()

const isHover = ref(false)
const visible = ref(false)
const actualVal = ref(props.modelValue)
const actualLabel = ref<any>([])
const options = new Map()

onMounted(() => {
  setSelected()
})

onClickOutside(selectRef, (e: MouseEvent) => {
  if (optionRef.value?.contains(e.target as Node)) return

  visible.value = false
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
    width: `${selectRef.value?.getBoundingClientRect().width}px`,
    maxHeight: `${props.height}px`
  }
})

const existActualValue = computed(() => {
  if (!isNil(actualVal.value)) {
    if (isArray(actualVal.value)) {
      return actualVal.value.length > 0
    } else return actualVal.value !== ''
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
  } else if (props.multiple && isArray(actualVal.value)) {
    return actualVal.value
  }
  return []
})

const selectCls = computed(() => [
  ns.b(),
  ns.m(props.size),
  ns.is('disabled', props.disabled),
  ns.is('focus', visible.value)
])

const handleSelectClick = () => {
  if (props.disabled) return

  visible.value = !visible.value
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
  const _actualVal = actualVal.value as Array<
    string | number | boolean | object
  >

  if (props.multiple) {
    let index = -1
    for (let i = 0; i < _actualVal.length; i++) {
      if (!isObject(val)) {
        index = _actualVal.indexOf(val)
        break
      } else {
        index = _actualVal.findIndex(
          (v) =>
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
  const _actualVal = actualVal.value as Array<
    string | number | boolean | object
  >

  if (props.multiple) {
    const index = getOptionIndex(actualVal.value as [], value)

    if (index > -1) {
      _actualVal?.splice(index, 1)
      actualLabel.value.splice(index, 1)
    } else {
      _actualVal.push(value!)
      actualLabel.value.push({ value, label })
    }
  } else {
    visible.value = false
    actualVal.value = isObject(value) ? options.get(value).value : value
    actualLabel.value = isObject(value) ? options.get(value).label : label
  }
}

const getOptionValue = (value: any) => {
  let newOption
  const _actualVal = actualVal.value as Array<
    string | number | boolean | object
  >

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

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (
      item[props.valueKey as keyof typeof item] ===
      val[props.valueKey as string]
    ) {
      index = i
      return
    }
  }

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
