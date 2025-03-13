<template>
  <div ref="anchorRef" :class="ns.b()">
    <span
      v-if="marker"
      ref="markerRef"
      :class="ns.e('marker')"
      :style="maskerStyle"
    />
    <div
      :class="[
        ns.e('content'),
        direction === 'horizontal' && ns.m('horizontal')
      ]"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, provide, ref, watch } from 'vue'
import { useEventListener } from '@vueuse/core'
import {
  getScroll,
  getScrollElement,
  isElement,
  isNil,
  isString,
  isUndefined,
  isWindow,
  scrollTo
} from '@nocturne-ui/utils'
import { useNamespace } from '@nocturne-ui/composables'
import { anchorEmits, anchorProps } from './anchor'
import { ANCHOR_INJECTION_KEY } from './constants'
import { getOffsetTop } from './util'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'NAnchor'
})

const props = defineProps(anchorProps)
const emit = defineEmits(anchorEmits)

const ns = useNamespace('anchor')

const markerRef = ref<HTMLSpanElement>()
const anchorRef = ref<HTMLDivElement>()
const containerEl = ref<HTMLElement | Window>()
const activedLink = ref('')

const links: Record<string, HTMLElement> = {}
let scrolling = false
let currentScrollTop = 0
let clearAnimate: (() => void) | null = null

const maskerStyle = computed<CSSProperties | undefined>(() => {
  if (!anchorRef.value || !markerRef.value || !activedLink.value) return {}
  const currentLink = links[activedLink.value]
  if (!currentLink) return {}

  const linkRect = currentLink.getBoundingClientRect()
  const anchorRect = anchorRef.value.getBoundingClientRect()
  const markerRect = markerRef.value.getBoundingClientRect()

  if (props.direction === 'horizontal') {
    return {
      left: `${linkRect.left - anchorRect.left}px`,
      height: '2px',
      width: `${linkRect.width}px`,
      opacity: '1'
    }
  }

  const top =
    linkRect.top - anchorRect.top + (linkRect.height - markerRect.height) / 2

  return {
    top: `${top}px`,
    opacity: '1'
  }
})

const handleScroll = () => {
  if (containerEl.value) {
    currentScrollTop = getScroll(containerEl.value)
  }
  const currentHref = getCurrentHref()

  if (scrolling || isUndefined(currentHref)) return
  activateAnchor(currentHref)
}

const activateAnchor = (href: string) => {
  if (href !== activedLink.value) {
    activedLink.value = href
    emit('change', href)
  }
}

const handleScrollTo = (href?: string) => {
  if (href) {
    activateAnchor(href)
    scrollToAnchor(href)
  }
}

const scrollToAnchor = (href: string) => {
  if (!containerEl.value) return
  const target = document.querySelector<HTMLElement>(`a[href='${href}']`)
  if (!target) return
  if (clearAnimate) clearAnimate()
  scrolling = true
  const scrollEl = getScrollElement(target, containerEl.value)
  const distance = getOffsetTop(target, scrollEl)
  const max = scrollEl.scrollHeight - scrollEl.clientHeight
  const to = Math.min(distance - props.offset, max)

  clearAnimate = scrollTo(
    containerEl.value,
    currentScrollTop,
    to,
    props.duration,
    () => {
      setTimeout(() => {
        scrolling = false
      }, 20)
    }
  )
}

const getCurrentHref = () => {
  if (!containerEl.value) return
  const scrollTop = getScroll(containerEl.value)
  const anchorTopList: { top: number; href: string }[] = []

  for (const href of Object.keys(links)) {
    const target = document.querySelector<HTMLElement>(`a[href='${href}']`)
    if (!target) continue
    const scrollEl = getScrollElement(target, containerEl.value)
    const distance = getOffsetTop(target, scrollEl)
    anchorTopList.push({
      top: distance - props.offset - props.bound,
      href
    })
  }
  anchorTopList.sort((prev, next) => prev.top - next.top)
  for (let i = 0; i < anchorTopList.length; i++) {
    const item = anchorTopList[i]
    const next = anchorTopList[i + 1]

    if (i === 0 && scrollTop === 0) {
      return ''
    }
    if (item.top <= scrollTop && (!next || next.top > scrollTop)) {
      return item.href
    }
  }
}

const addLink = (el: HTMLElement, href?: string) => {
  if (href) links[href] = el
}

const removeAnchor = (href?: string) => {
  if (href) delete links[href]
}

const onClick = (e: Event, href?: string) => {
  emit('click', e, href)
  handleScrollTo(href)
}

const getScrollContainer = () => {
  const { container } = props

  if (isNil(container)) {
    containerEl.value = window
  }
  if (isWindow(container)) {
    containerEl.value = window
  } else if (isString(container)) {
    containerEl.value =
      document.querySelector<HTMLElement>(`a[href='${container}']`) || window
  } else if (isElement(container)) {
    containerEl.value = container
  }
}

watch(
  () => props.container,
  () => getScrollContainer()
)

useEventListener(containerEl, 'scroll', handleScroll)

onMounted(() => {
  getScrollContainer()
  const hash = decodeURIComponent(window.location.hash)
  const target = document.querySelector(`a[href='${hash}']`)

  if (target) {
    scrollToAnchor(hash)
  } else {
    handleScroll()
  }
})

provide(ANCHOR_INJECTION_KEY, {
  activedLink,
  onClick,
  addLink,
  removeAnchor
})

defineExpose({
  handleScrollTo
})
</script>
