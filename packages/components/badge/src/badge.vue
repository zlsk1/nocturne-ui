<script lang="ts" setup>
import { computed } from 'vue'
import { badgeProps } from './badge'
import { isNumber } from '@/utils'
import { useNamespace } from '@/composables'

defineOptions({
  name: 'NBadge'
})

const props = defineProps(badgeProps)

const ns = useNamespace('badge')

const badgeCls = computed(() => [
  ns.e('content'),
  ns.em('content', props.type),
  ns.is('fixed'),
  ns.is('dot', props.dot)
])
const _value = computed(() => {
  if (isNumber(props.value) && props.value > props.max) {
    return `${props.max}+`
  }
  return props.value
})
</script>

<template>
  <div :class="ns.b()">
    <span>
      <slot></slot>
    </span>
    <span
      v-if="!hidden"
      :class="badgeCls"
    >
      <template v-if="!dot">
        {{ _value }}
      </template>
    </span>
  </div>
</template>
