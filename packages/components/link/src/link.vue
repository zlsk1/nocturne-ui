<script lang="ts" setup>
import { linkProps } from './link'

defineOptions({
  name: 'NLink'
})

const props = defineProps(linkProps)

const handleClick = (e: Event) => {
  if (props.disabled) {
    e.preventDefault()
  }
}
</script>

<template>
  <a
    :class="[
      'n-link',
      type ? 'n-link--' + type : '',
      {
        'is-underline': !disabled && underline,
        'is-disabled': disabled,
      }
    ]"
    :href="href"
    :target="target"
    @click="handleClick"
  >
    <span>
      <slot></slot>
    </span>
    <component
      :is="icon"
      v-if="icon"
      size="16"
    ></component>
  </a>
</template>
