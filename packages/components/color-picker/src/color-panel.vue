<template>
  <div
    class="n-color-panel"
    :style="{
      backgroundColor: background
    }"
  >
    <div class="n-color-panel__white" />
    <div class="n-color-panel__black" />
    <div
      class="n-color-panel__cursor"
      :style="{
        top: cursorTop + 'px',
        left: cursorLeft + 'px'
      }"
    >
      <div />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, onMounted, ref, watch } from 'vue'
import { getClientXY } from '@nocturne-ui/utils'
import { draggable } from './utils/draggable'

import type { PropType } from 'vue'
import type Color from './utils/color'

defineOptions({
  name: 'NColorPanel'
})

const props = defineProps({
  color: {
    type: Object as PropType<Color>,
    required: true
  }
})

const instance = getCurrentInstance()!

const cursorTop = ref(0)
const cursorLeft = ref(0)
const background = ref('hsl(0, 100%, 50%)')
const colorValue = computed(() => {
  const hue = props.color.get('hue')
  const saturation = props.color.get('saturation')
  const value = props.color.get('value')
  return { hue, saturation, value }
})

function update() {
  const saturation = props.color.get('saturation')
  const value = props.color.get('value')

  const el = instance.vnode.el!
  const { clientWidth: width, clientHeight: height } = el

  cursorLeft.value = (saturation * width) / 100
  cursorTop.value = ((100 - value) * height) / 100

  background.value = `hsl(${props.color.get('hue')}, 100%, 50%)`
}

function handleDrag(event: MouseEvent | TouchEvent) {
  const el = instance.vnode.el!
  const rect = el.getBoundingClientRect()
  const { clientX, clientY } = getClientXY(event)

  let left = clientX - rect.left
  let top = clientY - rect.top
  left = Math.max(0, left)
  left = Math.min(left, rect.width)

  top = Math.max(0, top)
  top = Math.min(top, rect.height)

  cursorLeft.value = left
  cursorTop.value = top
  props.color.set({
    saturation: (left / rect.width) * 100,
    value: 100 - (top / rect.height) * 100
  })
}

watch(
  () => colorValue.value,
  () => {
    update()
  }
)

onMounted(() => {
  draggable(instance.vnode.el as HTMLElement, {
    drag: (event) => {
      handleDrag(event)
    },
    end: (event) => {
      handleDrag(event)
    }
  })

  update()
})

defineExpose({
  update
})
</script>
