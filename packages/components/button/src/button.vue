<script lang="ts" setup>
import { computed, useSlots } from 'vue'
import { buttonEmits, buttonProps } from './button'
import { useNamespace } from '@/composables'
import NIcon from '@/components/icon'

defineOptions({
  name: 'NButton'
})

const props = defineProps(buttonProps)
const emit = defineEmits(buttonEmits)

const ns = useNamespace('button')

const slots = useSlots()

const buttonCls = computed(() => [
  ns.b(),
  ns.b('wrapper'),
  ns.m(props.type),
  ns.m(props.size),
  ns.is('round', props.round),
  ns.is('plain', props.plain),
  ns.is('circle', props.circle),
  ns.is('disabled', props.disabled),
  ns.is('loading', props.loading),
  ns.is('text', props.text)
])

const handleClick = (e: MouseEvent) => {
  emit('click', e)
}
</script>

<template>
  <button :class="buttonCls" @click="handleClick">
    <n-icon v-if="loading" :class="[ns.is('loading-icon', loading)]">
      <component :is="loadingIcon" size="14" />
    </n-icon>
    <n-icon v-else-if="icon">
      <component :is="icon" size="14" />
    </n-icon>
    <span v-if="slots.default">
      <slot />
    </span>
  </button>
</template>
