<template>
  <div :class="['n-color-hue-slider', 'hue-slider', { 'is-vertical': vertical }]">
    <div
      ref="bar"
      class="n-color-hue-slider__bar"
      @click="handleClick"
    ></div>
    <div
      ref="thumb"
      class="n-color-hue-slider__thumb"
      :style="{
        left: thumbLeft + 'px',
        top: thumbTop + 'px',
      }"
    >
      <div></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  getCurrentInstance,
  onMounted,
  ref,
  watch
} from 'vue'
import { getClientXY } from '@/utils'
import { draggable } from './utils/draggable'

import type { PropType } from 'vue'
import type Color from './utils/color'

defineOptions({
  name: 'NColorHueBar'
})

const props = defineProps({
  color: {
    type: Object as PropType<Color>,
    required: true
  },
  vertical: Boolean
})

const instance = getCurrentInstance()!
const thumb = ref<HTMLElement>()
const bar = ref<HTMLElement>()
const thumbLeft = ref(0)
const thumbTop = ref(0)

const hueValue = computed(() => {
  return props.color.get('hue')
})

watch(
  () => hueValue.value,
  () => {
    update()
  }
)

function handleClick(event: MouseEvent | TouchEvent) {
  const target = event.target

  if (target !== thumb.value) {
    handleDrag(event)
  }
}

function handleDrag(event: MouseEvent | TouchEvent) {
  if (!bar.value || !thumb.value) return

  const el = instance.vnode.el as HTMLElement
  const rect = el.getBoundingClientRect()
  const { clientX, clientY } = getClientXY(event)
  let hue

  if (!props.vertical) {
    let left = clientX - rect.left
    left = Math.min(left, rect.width - thumb.value.offsetWidth / 2)
    left = Math.max(thumb.value.offsetWidth / 2, left)

    hue = Math.round(
      ((left - thumb.value.offsetWidth / 2) /
          (rect.width - thumb.value.offsetWidth)) *
          360
    )
  }
  else {
    let top = clientY - rect.top

    top = Math.min(top, rect.height - thumb.value.offsetHeight / 2)
    top = Math.max(thumb.value.offsetHeight / 2, top)
    hue = Math.round(
      ((top - thumb.value.offsetHeight / 2) /
          (rect.height - thumb.value.offsetHeight)) *
          360
    )
  }
  props.color.set('hue', hue)
}

function getThumbLeft() {
  if (!thumb.value) return 0

  const el = instance.vnode.el

  if (props.vertical) return 0
  const hue = props.color.get('hue')

  if (!el) return 0
  return Math.round(
    (hue * (el.offsetWidth - thumb.value.offsetWidth / 2)) / 360
  )
}

function getThumbTop() {
  if (!thumb.value) return 0

  const el = instance.vnode.el as HTMLElement
  if (!props.vertical) return 0
  const hue = props.color.get('hue')

  if (!el) return 0
  return Math.round(
    (hue * (el.offsetHeight - thumb.value.offsetHeight / 2)) / 360
  )
}

function update() {
  thumbLeft.value = getThumbLeft()
  thumbTop.value = getThumbTop()
}

onMounted(() => {
  if (!bar.value || !thumb.value) return

  const dragConfig = {
    drag: (event: MouseEvent | TouchEvent) => {
      handleDrag(event)
    },
    end: (event: MouseEvent | TouchEvent) => {
      handleDrag(event)
    }
  }

  draggable(bar.value, dragConfig)
  draggable(thumb.value, dragConfig)
  update()
})

defineExpose({
  update
})
</script>

<style lang="scss" scoped>
@use '@/theme-chalk/src/color-picker.scss';
</style>
