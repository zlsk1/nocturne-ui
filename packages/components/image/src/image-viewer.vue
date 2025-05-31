<template>
  <teleport to="body" :disabled="!teleport">
    <div :class="ns.b()">
      <transition name="n-fade-in">
        <n-overlay
          v-show="modelValue"
          custom-event
          :z-index="zIndex"
          :mask="mask"
          :custom-class="maskClass"
        >
          <div
            ref="wrapperRef"
            :class="ns.m('wrapper')"
            @click.stop="overlayEvent.onClick"
            @mousedown.stop="overlayEvent.onMousedown"
            @mouseup.stop="overlayEvent.onMouseup"
          >
            <div :class="ns.m('content')">
              <img
                ref="imgRef"
                :src="current"
                alt=""
                :class="ns.e('img')"
                :style="{
                  transform: `${imgStyle.rotate} ${imgStyle.scale3d} ${imgStyle.translate3d}`
                }"
                @error="onError"
                @load="onLoad"
              />
            </div>
            <slot name="close">
              <button
                aria-label="close"
                role="img"
                :class="ns.m('close')"
                @click.stop="onClose"
              >
                <n-icon><RiCloseFill /></n-icon>
              </button>
            </slot>
            <div
              v-if="previewList.length > 1"
              :class="[ns.m('prev'), ns.is('disabled', disabledPrev)]"
              aria-label="prev"
              :aria-disalbed="disabledPrev"
              @click="onSwitch(-1)"
            >
              <n-icon style="transform: rotate(180deg)">
                <RiArrowRightSLine />
              </n-icon>
            </div>
            <div
              v-if="previewList.length > 1"
              :class="[ns.m('next'), ns.is('disabled', disabledNext)]"
              aria-label="next"
              :aria-disalbed="disabledNext"
              @click="onSwitch(1)"
            >
              <n-icon><RiArrowRightSLine /></n-icon>
            </div>
            <div :class="ns.m('pager')">
              <slot name="progress" :index="index" :total="previewList.length">
                <div v-if="previewList.length > 1" :class="ns.m('pager-page')">
                  {{ index + 1 }} / {{ previewList.length }}
                </div>
              </slot>
              <slot
                name="toolbar"
                :actions="{
                  onFlipY,
                  onFlipX,
                  onRotateCounterclockwise,
                  onRotateClockwise,
                  onZoomOut,
                  onZoomIn,
                  onSwitch,
                  onReset
                }"
                :icons="{
                  flipIcon: RiArrowUpDownLine,
                  rotateCounterclockwiseIcon: RiAnticlockwise2Line,
                  rotateClockwiseIcon: RiClockwise2Line,
                  zoomOutIcon: RiZoomOutLine,
                  zoomInIcon: RiZoomInLine
                }"
                :index="index"
                :total="previewList.length"
              >
                <div :class="ns.m('pager-actions')">
                  <div
                    v-for="action in actions"
                    :key="action.label"
                    :class="
                      ns.is(
                        'disabled',
                        action.disabled && action.disabled.value
                      )
                    "
                    :style="action.style"
                    :title="action.label"
                    :aria-label="action.label"
                    :aria-disabled="action.disabled && action.disabled.value"
                    @click="action.handler"
                  >
                    <n-icon size="22">
                      <component :is="action.icon" />
                    </n-icon>
                  </div>
                </div>
              </slot>
            </div>
          </div>
        </n-overlay>
      </transition>
      <div
        v-if="$slots.default"
        :class="ns.m('trigger')"
        @click="$emit('update:modelValue', true)"
      >
        <slot />
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { computed, nextTick, provide, reactive, ref, toRef, watch } from 'vue'
import NOverlay from '@nocturne-ui/components/overlay'
import NIcon from '@nocturne-ui/components/icon'
import {
  useLocale,
  useNamespace,
  useSameTarget,
  useZIndex
} from '@nocturne-ui/composables'
import {
  RiAnticlockwise2Line,
  RiArrowRightSLine,
  RiArrowUpDownLine,
  RiClockwise2Line,
  RiCloseFill,
  RiZoomInLine,
  RiZoomOutLine
} from '@remixicon/vue'
import { useEventListener } from '@vueuse/core'
import { imageViewerEmit, imageViewerProps } from './image-viewer'
import { previewImageContextKey } from './constants'

defineOptions({
  name: 'NImageViewer',
  inheritAttrs: false
})

const props = defineProps(imageViewerProps)
const emit = defineEmits(imageViewerEmit)

const ns = useNamespace('image-viewer')
const { t } = useLocale()
const { nextZIndex } = useZIndex()

const index = ref(props.index)
const imgState = ref({
  vtlReversal: false,
  hzlReversal: false,
  rotate: 0,
  scale: 1,
  offsetX: 0,
  offsetY: 0
})
const zIndex = ref(props.zIndex ?? nextZIndex())
const loading = ref(true)
const wrapperRef = ref<HTMLDivElement>()
const imgRef = ref<HTMLImageElement>()

const current = computed(() => props.previewList[index.value])

const disabledNext = computed(() => index.value + 1 >= props.previewList.length)
const disabledPrev = computed(() => index.value === 0)

const imgStyle = computed(() => {
  const { rotate, vtlReversal, hzlReversal, scale } = imgState.value

  return {
    translate3d: `translate3d(0px, 0px, 0px)`,
    scale3d: `scale3d(${hzlReversal ? scale * -1 : scale}, ${vtlReversal ? scale * -1 : scale}, 1)`,
    rotate: `rotate(${rotate}deg)`
  }
})

const onZoomIn = () => {
  if (imgState.value.scale >= 50) return

  imgState.value.scale *= 1.5

  if (imgState.value.scale >= 50) imgState.value.scale = 50
}

const onZoomOut = () => {
  if (imgState.value.scale <= 1) return
  imgState.value.scale /= 1.5

  if (imgState.value.scale <= 1) imgState.value.scale = 1
}

const onRotateClockwise = () => {
  if (!loading.value) return
  imgState.value.rotate += 90
}

const onRotateCounterclockwise = () => {
  if (!loading.value) return
  imgState.value.rotate -= 90
}

const onFlipX = () => {
  if (!loading.value) return
  imgState.value.hzlReversal = !imgState.value.hzlReversal
}

const onFlipY = () => {
  if (!loading.value) return
  imgState.value.vtlReversal = !imgState.value.vtlReversal
}

const actions = [
  {
    icon: RiArrowUpDownLine,
    label: t('noc.image.vtlReversal'),
    handler: onFlipY
  },
  {
    icon: RiArrowUpDownLine,
    label: t('noc.image.hzlReversal'),
    style: { transform: 'rotate(90deg)' },
    handler: onFlipX
  },
  {
    icon: RiAnticlockwise2Line,
    label: t('noc.image.counterclockwise'),
    handler: onRotateCounterclockwise
  },
  {
    icon: RiClockwise2Line,
    label: t('noc.image.clockwise'),
    handler: onRotateClockwise
  },
  {
    icon: RiZoomOutLine,
    label: t('noc.image.zoomOut'),
    disabled: computed(() => imgState.value.scale <= 1),
    handler: onZoomOut
  },
  {
    icon: RiZoomInLine,
    label: t('noc.image.zoomIn'),
    disabled: computed(() => imgState.value.scale >= 50),
    handler: onZoomIn
  }
]

useEventListener(window, 'keydown', (e: KeyboardEvent) => {
  switch (e.code) {
    case 'Escape':
      emit('update:modelValue', false)
      break
    case 'ArrowRight':
      onSwitch(1)
      break
    case 'ArrowLeft':
      onSwitch(-1)
      break
  }
})

const onClose = () => {
  emit('update:modelValue', false)
}

const clickMaskerToClose = () => {
  if (props.clickMaskToClose) {
    emit('update:modelValue', false)
  }
}
const overlayEvent = useSameTarget(clickMaskerToClose)

const getOffset = (offset: number) => {
  index.value = (index.value + offset) & props.previewList.length
}

const onSwitch = (offset: number) => {
  if (
    (disabledPrev.value && disabledNext.value) ||
    (offset > 0 && disabledNext.value) ||
    (offset < 0 && disabledPrev.value)
  )
    return
  getOffset(offset)
}

const onReset = () => {
  imgState.value = {
    ...imgState.value,
    vtlReversal: false,
    hzlReversal: false,
    rotate: 0,
    scale: 1
  }
}

const setActive = (val: number) => {
  if (val >= 0 && val < props.previewList.length) {
    index.value = val
  }
}

const onError = (e: Event) => {
  loading.value = false
  ;(e.target as HTMLImageElement).alt = t('noc.image.error')
}

const onLoad = () => {
  loading.value = false
}

watch(current, () => {
  nextTick(() => {
    if (imgRef.value?.complete) {
      loading.value = true
    }
  })
})

watch(index, () => {
  onReset()
})

provide(
  previewImageContextKey,
  reactive({
    previewList: toRef(props, 'previewList')
  })
)

defineExpose({
  setActive
})
</script>
