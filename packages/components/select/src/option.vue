<template>
  <li
    v-show="visible"
    :class="optionCls"
    :aria-selected="selected"
    @mouseup.stop="onSelect"
    @mousemove="hoverItem"
  >
    <span :class="ns.be('option', 'inner')" :title="String(label)">
      <template v-if="$slots.default">
        <slot />
      </template>
      <template v-else>
        {{ label }}
      </template>
    </span>
    <n-icon v-if="showCheck" size="16">
      <Check />
    </n-icon>
  </li>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, inject } from 'vue'
import { RiCheckFill as Check } from '@remixicon/vue'
import { isFunction, isObject } from '@nocturne-ui/utils'
import { useNamespace } from '@nocturne-ui/composables'
import NIcon from '@nocturne-ui/components/icon'
import { optionEmits, optionProps } from './option'
import { SELECT_INJECTION_KEY } from './constants'
import type { OptionProxy } from './types'

defineOptions({
  name: 'NOption'
})

const props = defineProps(optionProps)
defineEmits(optionEmits)

const ns = useNamespace('select')

const states = inject(SELECT_INJECTION_KEY, undefined)!

const vm = getCurrentInstance()!.proxy as unknown as OptionProxy
states.createOption(vm)

const selected = computed(() => {
  if (states.multiple) {
    if (isObject(props.value)) {
      return states.multipleValue.find(
        (val) =>
          val[states.valueKey!] ===
          (props.value as Record<string, any>)[states.valueKey!]
      )
    }
    return states.multipleValue.includes(props.value)
  } else {
    if (isObject(props.value)) {
      return (
        props.value[states.valueKey!] ===
        states.multipleValue[states.valueKey as any]
      )
    }
    return props.value === states.getOptionValue(states.modelValue)?.value
  }
})

const showCheck = computed(() => {
  return states.multiple && selected.value
})

const visible = computed(() => {
  if (!states.showSearch) return true
  if (!isFunction(states.filterMethod)) {
    return (
      !states.filteredValue ||
      String(props.label)
        .toLowerCase()
        .includes(states.filteredValue.toLowerCase())
    )
  } else {
    return states.filterMethod({
      input: states.filteredValue,
      option: vm
    })
  }
})

const optionCls = computed(() => [
  ns.be('option', 'item'),
  ns.is('disabled', props.disabled),
  ns.is('selected', !props.disabled && selected.value),
  ns.is(
    'hovering',
    !props.disabled && states.hoveringIndex === states.optionsArray.indexOf(vm)
  )
])

const onSelect = () => {
  if (!props.disabled) {
    hoverItem()
    states.clickOption(vm)
  }
}

const hoverItem = () => {
  if (!props.disabled) {
    states.hoveringIndex = states.optionsArray.indexOf(vm)
  }
}
</script>
