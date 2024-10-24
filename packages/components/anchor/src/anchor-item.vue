<script lang="ts" setup>
import { inject, onMounted, onUnmounted, ref } from 'vue'
import { anchorItemProps } from './anchor-item'
import { ANCHOR_INJECTION_KEY } from './constants'

defineOptions({
  name: 'NAnchorItem'
})

const props = defineProps(anchorItemProps)

const { activeLink, onClick, addLink, removeAnchor } = inject(ANCHOR_INJECTION_KEY, undefined)!

const linkRef = ref<HTMLAnchorElement>()

onMounted(() => {
  if (!props.items && props.href) {
    const { href } = props
    const el = document.getElementById(href.split('#')[1])
    if (el && href) addLink(el, el.offsetTop, href)
  }
})
onUnmounted(() => {
  if (!props.items) removeAnchor(linkRef.value!)
})
</script>

<template>
  <ul v-if="items" class="n-anchor__items">
    <li v-for="({ href, text, title, children = [] }, index) in items" :key="index">
      <a
        ref="linkRef"
        :href="href"
        :title="title"
        :class="{ 'active': activeLink === href }"
        @click="onClick"
      >{{ text }}</a>
      <template v-if="children.length">
        <NAnchorItem :items="children"></NAnchorItem>
      </template>
    </li>
  </ul>
  <div v-else class="n-anchor__items">
    <a
      :href="href"
      :title="title"
      :class="{ 'active': activeLink === href }"
      @click="onClick"
    >{{ text }}</a>
    <slot></slot>
  </div>
</template>

<style lang="scss">
@use '@/theme-chalk/src/anchor.scss';
</style>
