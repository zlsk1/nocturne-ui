<template>
  <li
    v-show="visible"
    :class="optionCls"
    @click.stop="onSelect"
    @mousemove="hoverItem"
  >
    <span :class="ns.be('option', 'inner')">
      <template v-if="$slots.default">
        <slot />
      </template>
      <template v-else>
        {{ label }}
      </template>
      <Check v-if="showCheck" size="16" />
    </span>
  </li>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, inject } from 'vue'
import { RiCheckFill as Check } from '@remixicon/vue'
import { isObject } from '@/utils'
import { useNamespace } from '@/composables'
import { optionEmits, optionProps } from './option'
import { SELECT_INJECTION_KEY } from './constants'
import type { OptionProxy } from './constants'

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
    if (!isObject(props.value)) {
      return props.value === states.inputValue
    }
    return (
      props.value[states.valueKey!] ===
      states.multipleValue[states.valueKey as any]
    )
  }
})

const showCheck = computed(() => {
  return states.multiple && selected.value
})

// const visible = computed(() => String(props.label).includes(states.inputValue))
const visible = computed(() => true)

const optionCls = computed(() => [
  ns.be('option', 'item'),
  ns.is('disabled', props.disabled),
  ns.is('selected', selected.value),
  ns.is('hovering', states.hoveringIndex === states.optionsArray.indexOf(vm))
])

const onSelect = () => {
  if (!props.disabled) {
    states.clickOption(vm)
    hoverItem()
  }
}

const hoverItem = () => {
  if (!props.disabled) {
    states.hoveringIndex = states.optionsArray.indexOf(vm)
  }
}
</script>
