<template>
  <div v-if="divided" :class="ns.e('separator')" />
  <div
    :class="[ns.e('item'), ns.is('disabled', disabled)]"
    @click="(e) => handleClick(e)"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import { dropdownItemProps } from './dropdown-item'
import { NDROPDOWN_INJECTION_KEY } from './constants'
import { useNamespace } from '@/composables'

defineOptions({
  name: 'NDropdownItem'
})

defineProps(dropdownItemProps)

const ns = useNamespace('dropdown')

const { handleClick } = inject(NDROPDOWN_INJECTION_KEY, undefined)!
</script>
