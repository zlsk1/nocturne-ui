<script lang="ts" setup>
import { computed } from 'vue'
import { useNamespace } from '@nocturne-ui/composables'
import { linkProps } from './link'

defineOptions({
  name: 'NLink'
})

const props = defineProps(linkProps)

const ns = useNamespace('link')

const linkCls = computed(() => [
  ns.b(),
  ns.m(props.type),
  ns.is('disabled', props.disabled),
  ns.is('underline', !props.disabled && props.underline)
])

const handleClick = (e: Event) => {
  if (props.disabled) {
    e.preventDefault()
  }
}
</script>

<template>
  <a :class="linkCls" :href="href" :target="target" @click="handleClick">
    <span>
      <slot />
    </span>
    <component :is="icon" v-if="icon" size="16" />
  </a>
</template>
