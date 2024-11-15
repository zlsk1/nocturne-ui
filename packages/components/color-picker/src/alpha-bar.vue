<template>
  <div :class="rootCls">
    <div ref="bar" :class="barCls" :style="barStyle" @click="handleClick" />
    <div ref="thumb" :class="thumbCls" :style="thumbStyle">
      <div />
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

const { rootCls, barCls, thumbCls, barStyle, thumbStyle, update } =
  useAlphaSliderDOM(props, {
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
