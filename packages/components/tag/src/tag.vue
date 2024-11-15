<template>
  <transition v-if="transition" :name="transitionClass" appear>
    <span
      :class="tagCls"
      :style="{ backgroundColor: color }"
      @click="handleClick"
    >
      <span :class="ns.e('content')">
        <slot />
      </span>
      <Close
        v-if="closable"
        size="14"
        :class="ns.e('close')"
        @click.stop="handleClose"
      />
    </span>
  </transition>
  <span
    v-else
    :class="tagCls"
    :style="{ backgroundColor: color }"
    @click="handleClick"
  >
    <span :class="ns.e('content')">
      <slot />
    </span>
    <Close
      v-if="closable"
      size="14"
      :class="ns.e('close')"
      @click.stop="handleClose"
    />
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { RiCloseLine as Close } from '@remixicon/vue'
import { tagEmits, tagProps } from './tag'
import { useNamespace } from '@/composables'

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
  ns.is('hit', props.border)
])

const handleClose = (e: Event) => emit('close', e)

const handleClick = (e: Event) => emit('click', e)
</script>
