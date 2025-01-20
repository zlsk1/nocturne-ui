<script lang="ts" setup>
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  provide,
  ref,
  shallowRef
} from 'vue'
import { useThrottleFn } from '@vueuse/core'
import { isNil } from '@/utils'
import { useNamespace } from '@/composables'
import AnchorItem from './anchor-item.vue'
import { anchorEmits, anchorProps } from './anchor'
import { ANCHOR_INJECTION_KEY } from './constants'
import type { CSSProperties } from 'vue'
import type { AnchorItems } from './anchor'

defineOptions({
  name: 'NAnchor'
})

const props = defineProps(anchorProps)
const emit = defineEmits(anchorEmits)

const ns = useNamespace('anchor')

export type Links = {
  el: HTMLElement
  href: string
  top: number
}

const links = shallowRef<Links[]>([])
const markerRef = ref<HTMLSpanElement>()
const containerRef = ref<HTMLElement>()
const activeLink = ref('')

let scrolling = false

onMounted(() => {
  if (props.items) {
    getlinks(props.items)
    sortLinks()
  } else {
    getlinks()
    sortLinks()
  }
  nextTick(() => handleScroll())
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

const maskerStyle = computed<CSSProperties | undefined>(() => {
  const currentLink = containerRef.value?.querySelector(
    `a[href='${decodeURIComponent(activeLink.value)}']`
  )
  if (!currentLink) return

  const linkTop = currentLink?.getBoundingClientRect().top!
  const containerTop = containerRef.value?.getBoundingClientRect().top!

  if (activeLink.value) {
    return {
      top: `${linkTop - containerTop + 5}px`,
      opacity: '1'
    }
  }
  return {
    top: `${5}px`,
    opacity: '0'
  }
})

const handleScroll = () => {
  const scrollY = window.scrollY
  const innerHeight = window.innerHeight
  const offsetHeight = document.body.offsetHeight
  const isBottom = Math.abs(scrollY + innerHeight - offsetHeight) < 1

  if (scrolling) return

  if (!links.value.length) {
    activateAnchor(null)
    return
  }

  if (isBottom) {
    activateAnchor(links.value[links.value.length - 1].href)
    return
  }

  const href = findAnchor(scrollY)
  activateAnchor(href)

  function findAnchor(scrollY: number) {
    for (let i = 0; i < links.value.length; i++) {
      const { href, top } = links.value[i]
      if (
        scrollY > top - props.offset &&
        scrollY < links.value[i + 1]?.top - props.offset
      ) {
        return href
      }
    }
    return null
  }
}

const activateAnchor = (href: string | null) => {
  if (!href) {
    activeLink.value = ''
  } else {
    if (href === activeLink.value) return
    else {
      activeLink.value = href
      emit('change', activeLink.value)
    }
  }
}

const onScroll = useThrottleFn(handleScroll, 100)

const getlinks = (anchorItems?: AnchorItems[]) => {
  if (anchorItems) {
    for (const anchorItem of anchorItems) {
      const { href, children } = anchorItem
      const el = document.getElementById(href.split('#')[1])
      if (!el) continue
      const item = { el, href, top: el.offsetTop }
      if (!isNil(item.el)) links.value.push(item as Links)

      if (children) {
        getlinks(children)
      }
    }
  }
}

const sortLinks = () => {
  links.value.sort((a, b) => a.top - b.top)
}

const addLink = (el: HTMLElement, top: number, href?: string) => {
  if (href) links.value.push({ href, el, top })
}

const removeAnchor = (ele?: HTMLElement) => {
  const index = links.value.findIndex(({ el }) => ele === el)
  links.value.splice(index, 1)
}

const onClick = (e: Event) => {
  const href = (e.target as HTMLAnchorElement)?.hash
  if (href) {
    activateAnchor(href)
    handleClick(href)
  }
  emit('click', e, href)
}

let timer: number | null = null

const handleClick = (href: string) => {
  const target = document.getElementById(href.split('#')[1])
  if (!target) return
  if (timer) clearTimeout(timer)

  scrolling = true
  window.scrollTo({ top: target.offsetTop - props.offset, behavior: 'smooth' })
  timer = setTimeout(() => {
    scrolling = false
  }, 0) as unknown as number
}

provide(ANCHOR_INJECTION_KEY, {
  activeLink,
  onClick,
  addLink,
  removeAnchor
})
</script>

<template>
  <div ref="containerRef" :class="ns.b()">
    <div :class="ns.e('content')">
      <span
        v-if="marker"
        ref="markerRef"
        :class="ns.e('marker')"
        :style="maskerStyle"
      />
      <anchor-item v-if="items" :items="items" />
      <slot />
    </div>
  </div>
</template>
