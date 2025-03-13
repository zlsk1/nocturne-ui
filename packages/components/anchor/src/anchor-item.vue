<template>
  <div :class="ns.e('item')">
    <a
      ref="linkRef"
      :href="href"
      :title="title"
      :class="ns.is('active', activedLink === href)"
      @click.stop="handleClick"
    >
      <div :class="ns.e('item__text')">
        <slot>
          {{ title }}
        </slot>
      </div>
    </a>
    <div v-if="$slots.subLink" :class="ns.e('content')">
      <slot name="subLink" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useNamespace } from '@nocturne-ui/composables'
import { anchorItemProps } from './anchor-item'
import { ANCHOR_INJECTION_KEY } from './constants'

defineOptions({
  name: 'NAnchorItem'
})

const ns = useNamespace('anchor')

const props = defineProps(anchorItemProps)

const { activedLink, onClick, addLink, removeAnchor } = inject(
  ANCHOR_INJECTION_KEY,
  undefined
)!

const linkRef = ref<HTMLAnchorElement>()

const handleClick = (e: Event) => {
  onClick(e, props.href)
}

watch(
  () => props.href,
  (val, oldVal) => {
    nextTick(() => {
      if (oldVal) removeAnchor(oldVal)
      if (val && linkRef.value) {
        addLink(linkRef.value, props.href)
      }
    })
  }
)

onMounted(() => {
  const { href } = props
  if (href) {
    if (linkRef.value) addLink(linkRef.value, href)
  }
})

onBeforeUnmount(() => {
  if (props.href) {
    removeAnchor(props.href)
  }
})
</script>
