<template>
  <li
    :class="[
      ns.be('option', 'item'),
      ns.is('disabled', disabled),
      ns.is('selected', selected)
    ]"
    @click.stop="onSelect"
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
import { optionEmits, optionProps } from './option'
import type { OptionProxy } from '@/components/select/src/constants'
import { SELECT_INJECTION_KEY } from '@/components/select/src/constants'
import { isArray, isObject } from '@/utils'
import { useNamespace } from '@/composables'

defineOptions({
  name: 'NOption'
})

const props = defineProps(optionProps)
defineEmits(optionEmits)

const ns = useNamespace('select')

const { actualVal, options, valueKey, multiple, clickOption } = inject(
  SELECT_INJECTION_KEY,
  undefined
)!

const selected = computed(() => {
  if (multiple && isArray(actualVal.value)) {
    if (isObject(props.value)) {
      return actualVal.value?.find((v) => {
        return (
          v[valueKey as keyof typeof props.value] ===
          (props.value as any)[valueKey as keyof typeof props.value]
        )
      })
    }
    return !!actualVal.value?.includes(props.value as never)
  } else {
    if (!isObject(props.value)) {
      return props.value === actualVal.value
    }
    return (
      props.value[valueKey!] ===
      actualVal.value![valueKey as keyof typeof actualVal.value]
    )
  }
})

const showCheck = computed(() => {
  return multiple && selected.value
})

const vm = getCurrentInstance()!.proxy as unknown as OptionProxy

options.set(vm.value, vm)

const onSelect = () => {
  if (props.disabled !== true) clickOption(vm)
}
</script>
