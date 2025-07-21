<template>
  <li v-if="divided" role="separator" :class="ns.e('separator')" />
  <li
    :class="[
      ns.e('item'),
      ns.is('disabled', disabled),
      ns.is('selected', selected === props.label)
    ]"
    @click="onClick"
  >
    <n-icon v-if="icon" size="16" :class="ns.m('icon')">
      <component :is="icon" />
    </n-icon>
    <slot>{{ label }}</slot>
  </li>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import { useNamespace } from '@nocturne-ui/composables'
import NIcon from '@nocturne-ui/components/icon'
import { dropdownItemProps } from './dropdown-item'
import { NDROPDOWN_INJECTION_KEY } from './constants'

defineOptions({
  name: 'NDropdownItem'
})

const props = defineProps(dropdownItemProps)

const ns = useNamespace('dropdown')

const { selected, handleSelect } = inject(NDROPDOWN_INJECTION_KEY, undefined)!

const onClick = () => {
  if (props.disabled) return
  handleSelect(props.label)
}
</script>
