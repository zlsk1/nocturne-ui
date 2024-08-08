<template>
  <div class="n-color-alpha-slider">
    <div
      ref="bar"
      class="n-color-alpha-slider__bar"
      :style="barStyle"
      @click="handleClick"
    ></div>
    <div
      ref="thumb"
      class="n-color-alpha-slider__thumb"
      :style="thumbStyle"
    >
      <div></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { alphaSliderProps } from './props/alpha-slider'
import {
  useAlphaSlider,
  useAlphaSliderDOM
} from './composables/use-alpha-slider'

const COMPONENT_NAME = 'NColorAlphaBar'

defineOptions({
  name: COMPONENT_NAME
})

const props = defineProps(alphaSliderProps)

const { bar, thumb, handleDrag, handleClick } = useAlphaSlider(props)

const { barStyle, thumbStyle, update } = useAlphaSliderDOM(props, {
  bar,
  thumb,
  handleDrag
})

defineExpose({
  update,
  bar,
  thumb
})
</script>
