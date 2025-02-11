<script lang="ts" setup>
import { inject, onMounted, onUnmounted, ref } from 'vue'
import { useNamespace } from '@/composables'
import { anchorItemProps } from './anchor-item'
import { ANCHOR_INJECTION_KEY } from './constants'

defineOptions({
  name: 'NAnchorItem'
})

const ns = useNamespace('anchor')

const props = defineProps(anchorItemProps)

const { activeLink, onClick, addLink, removeAnchor } = inject(
  ANCHOR_INJECTION_KEY,
  undefined
)!

const linkRef = ref<HTMLAnchorElement>()

onMounted(() => {
  if (!props.items && props.href) {
    const { href } = props
    const el = document.querySelector<HTMLElement>(href)
    if (el && href) addLink(el, el.offsetTop, href)
  }
})
onUnmounted(() => {
  if (!props.items) removeAnchor(linkRef.value!)
})
</script>

<template>
  <ul v-if="items" :class="ns.e('items')">
    <li
      v-for="({ href, text, title, children = [] }, index) in items"
      :key="index"
    >
      <a
        ref="linkRef"
        :href="href"
        :title="title"
        :class="{ active: activeLink === href }"
        @click="onClick"
        >{{ text }}</a
      >
      <template v-if="children.length">
        <n-anchor-item :items="children" />
      </template>
    </li>
  </ul>
  <div v-else :class="ns.e('items')">
    <a
      :href="href"
      :title="title"
      :class="ns.is('active', activeLink === href)"
      @click="onClick"
      >{{ text }}</a
    >
    <slot />
  </div>
</template>
