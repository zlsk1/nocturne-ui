<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <div v-if="divided" class="n-dropdown__separator"></div>
  <div
    :class="[
      'n-dropdown__item',
      disabled && 'is-disabled',
    ]"
    @click="(e) => handleClick(e)"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import { dropdownItemProps } from './dropdown-item'
import { NDROPDOWN_INJECTION_KEY } from './constants'

defineOptions({
  name: 'NDropdownItem'
})

const props = defineProps(dropdownItemProps)

const { handleClick } = inject(NDROPDOWN_INJECTION_KEY, undefined)!
</script>
