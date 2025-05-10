<template>
  <transition :name="transitionClass" appear>
    <span
      :class="tagCls"
      :style="{ backgroundColor: color }"
      @click="handleClick"
    >
      <slot name="icon">
        <component :is="icon" v-if="icon" />
      </slot>
      <span :class="ns.e('content')">
        <slot />
      </span>
      <n-icon
        v-if="closable"
        size="14"
        :class="ns.e('close')"
        @click.stop="handleClose"
      >
        <Close />
      </n-icon>
    </span>
  </transition>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { RiCloseLine as Close } from '@remixicon/vue'
import { useNamespace } from '@nocturne-ui/composables'
import NIcon from '@nocturne-ui/components/icon'
import { tagEmits, tagProps } from './tag'

defineOptions({
  name: 'NTag'
})

const props = defineProps(tagProps)
const emit = defineEmits(tagEmits)

const ns = useNamespace('tag')

const transitionClass = computed(() => {
  return props.transition ? `${ns.ns.value}-flip` : ''
})

const tagCls = computed(() => [
  ns.b(),
  ns.m(props.type),
  ns.m(props.size),
  ns.m(props.effect),
  ns.is('round', props.round),
  ns.is('closable', props.closable),
  ns.is('bordered', props.bordered)
])

const handleClose = (e: Event) => emit('close', e)

const handleClick = (e: Event) => emit('click', e)
</script>
