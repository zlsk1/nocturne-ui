<template>
  <div ref="containerRef" :class="ns.b()" @click.stop="onClick">
    <img
      :src="actualSrc"
      :alt="alt"
      :class="ns.e('img')"
      :style="{
        width: isString(width) ? width : `${width}px`,
        height: isString(height) ? height : `${height}px`,
        objectFit: fit
      }"
      :loading="loading"
      @error="onError"
      @load="onLoad"
    />
    <div v-if="!loadEnd" :class="ns.m('placeholder')">
      <slot name="placeholder" />
    </div>
    <ImageViewer
      v-if="preview"
      v-model="visible"
      :preview-list="
        previewContext?.previewList ||
        (previewList.length && previewList) || [actualSrc]
      "
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, nextTick, onMounted, ref, watch } from 'vue'
import { useNamespace } from '@nocturne-ui/composables'
import { isClient, isElement, isString } from '@nocturne-ui/utils'
import { useEventListener, useThrottleFn } from '@vueuse/core'
import { imageEmits, imageProps } from './image'
import ImageViewer from './image-viewer.vue'
import { getScrollContainer, isInContainer } from './util'
import { previewImageContextKey } from './constants'

defineOptions({
  name: 'NImage'
})

const props = defineProps(imageProps)
const emit = defineEmits(imageEmits)

const previewContext = inject(previewImageContextKey, undefined)!

const ns = useNamespace('image')

const supportNativeLazyLoad =
  isClient && 'loading' in HTMLImageElement.prototype
let stopScrollListener: (() => void) | undefined

const isError = ref(false)
const loadEnd = ref(false)
const visible = ref(false)
const imgSrc = ref()
const scrollContainerRef = ref()
const containerRef = ref<HTMLDivElement>()

const actualSrc = computed(() =>
  !isError.value ? imgSrc.value : props.fallback
)

const shouldManuallyAdd = computed(() => {
  if (props.loading === 'eager') return false
  return !supportNativeLazyLoad && props.loading === 'lazy'
})

const onError = (e: Event) => {
  isError.value = true
  loadEnd.value = true
  emit('error', e)
}

const onLoad = (e: Event) => {
  loadEnd.value = true
  emit('load', e)
}

const onClick = () => {
  visible.value = true
}

const loadImg = () => {
  if (!isClient) return

  isError.value = false
  imgSrc.value = props.src
}

const handleLazyLoad = () => {
  if (isInContainer(containerRef.value, scrollContainerRef.value)) {
    loadImg()
    removeLazyLoadListener()
  }
}

const lazyLoadHandler = useThrottleFn(handleLazyLoad, 200, true)

const listenLazyLoad = async () => {
  if (!isClient) return

  await nextTick()

  const { scrollContainer } = props
  if (isElement(scrollContainer)) {
    scrollContainerRef.value = scrollContainer
  } else if (scrollContainer && isString(scrollContainer)) {
    scrollContainerRef.value =
      document.querySelector<HTMLElement>(scrollContainer)
  } else if (containerRef.value) {
    scrollContainerRef.value = getScrollContainer(containerRef.value)
  }

  if (scrollContainerRef.value) {
    stopScrollListener = useEventListener(
      scrollContainerRef.value,
      'scroll',
      lazyLoadHandler
    )
  }
}

const removeLazyLoadListener = () => {
  if (!isClient || !scrollContainerRef.value || !lazyLoadHandler) return

  stopScrollListener?.()
  scrollContainerRef.value = undefined
}

watch(
  () => props.src,
  () => {
    if (shouldManuallyAdd.value) {
      loadEnd.value = false
      isError.value = false
      removeLazyLoadListener()
      listenLazyLoad()
    } else {
      loadImg()
    }
  }
)

onMounted(() => {
  if (shouldManuallyAdd.value) {
    listenLazyLoad()
  } else {
    loadImg()
  }
})
</script>
