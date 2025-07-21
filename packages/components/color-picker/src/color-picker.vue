<template>
  <n-tooltip
    ref="popper"
    :visible="showPicker"
    :fallback-placements="fallbackPlacements"
    :offset="10"
    :gpu-acceleration="false"
    :popper-class="[ns.be('picker', 'panel'), ns.b('dropdown'), popperClass]"
    :stop-popper-mouse-event="false"
    trigger="click"
    :teleported="teleported"
    :transition="`${ns.ns.value}-zoom-in-top`"
    persistent
    pure
    :placement="placement"
    @hide="setShowPicker(false)"
  >
    <template #content>
      <div ref="contentRef" @keydown.esc="handleEsc">
        <div :class="ns.be('dropdown', 'main-wrapper')">
          <color-panel ref="cp" :color="color" />
        </div>
        <hue-bar ref="hue" class="hue-slider" :color="color" />
        <alpha-bar v-if="showAlpha" ref="alpha" :color="color" />
        <color-input
          :format="colorFormat"
          :alpha="currentAlpha"
          :show-alpha="showAlpha"
          :color-data="colorData"
          :hex="customInput"
          @format-change="(format) => onColorModeChange(format)"
          @alpha-change="(alpha) => onAlphaChange(alpha)"
          @hex-change="(hex) => onHexChange(hex)"
          @hex-blur="onHexBlur"
          @data-change="(data) => onDataChange(data)"
        />
        <div :class="ns.be('dropdown', 'actions')">
          <n-button
            :class="ns.be('dropdown', 'link-btn')"
            text
            size="small"
            @click="clear"
          >
            {{ t('noc.colorpicker.clear') }}
          </n-button>
          <n-button
            plain
            size="small"
            :class="ns.be('dropdown', 'btn')"
            @click="confirmValue"
          >
            {{ t('noc.colorpicker.confirm') }}
          </n-button>
        </div>
        <predefine
          v-if="predefine"
          ref="predefine"
          :enable-alpha="showAlpha"
          :color="color"
          :colors="predefine"
          :format="colorFormat"
        />
      </div>
    </template>
    <template #default>
      <div
        ref="triggerRef"
        v-bind="$attrs"
        :class="btnCls"
        role="button"
        :aria-description="
          t('noc.colorpicker.description', { color: modelValue || '' })
        "
        :aria-disabled="actualDisabled"
        :tabindex="actualDisabled ? -1 : tabindex"
        @focus="handleFocus"
        @blur="handleBlur"
      >
        <div v-if="actualDisabled" :class="ns.be('picker', 'mask')" />
        <div :class="ns.be('picker', 'trigger')" @click="handleTrigger">
          <div
            :class="[
              ns.be('picker', 'color'),
              ns.is('alpha', showAlpha),
              ns.is('empty', props.modelValue === '' && !currentColor)
            ]"
          >
            <span
              :class="[
                ns.be('picker', 'color-inner'),
                ns.is('empty', props.modelValue === '' && !currentColor)
              ]"
              :style="{
                backgroundColor: displayedColor
              }"
            />
          </div>
          <div v-if="showText" :class="ns.be('picker', 'value')">
            {{ modelValue }}
          </div>
          <i
            v-if="$slots.icon"
            :class="[ns.be('picker', 'icon'), ns.is('icon-arrow-down')]"
          >
            <slot name="icon" />
          </i>
        </div>
      </div>
    </template>
  </n-tooltip>
</template>

<script lang="ts" setup>
import {
  computed,
  nextTick,
  onMounted,
  provide,
  reactive,
  ref,
  watch,
  watchEffect
} from 'vue'
import { onClickOutside, useDebounceFn } from '@vueuse/core'
import {
  useFocusController,
  useLocale,
  useNamespace
} from '@nocturne-ui/composables'
import NButton from '@nocturne-ui/components/button'
import NTooltip from '@nocturne-ui/components/tooltip'
import { useForm, useFormItem } from '@nocturne-ui/components/form'
import { isUndefined } from '@nocturne-ui/utils'
import AlphaBar from './alpha-bar.vue'
import HueBar from './hue-bar.vue'
import Predefine from './predefine.vue'
import ColorPanel from './color-panel.vue'
import ColorInput from './color-input/input.vue'
import Color, {
  hsl2hsv,
  hsv2hsl,
  hsv2rgb,
  parseHexChannel,
  rgb2hsv,
  toHex
} from './utils/color'
import {
  colorPickerContextKey,
  colorPickerEmits,
  colorPickerProps
} from './color-picker'
import type { TooltipInstance } from '@nocturne-ui/components/tooltip'

defineOptions({
  name: 'NColorPicker'
})
const props = defineProps(colorPickerProps)
const emit = defineEmits(colorPickerEmits)

const ns = useNamespace('color')
const { t } = useLocale()
const { formItemDisabled, formItemSize } = useFormItem()
const { formItem } = useForm()

const hue = ref<InstanceType<typeof HueBar>>()
const cp = ref<InstanceType<typeof ColorPanel>>()
const alpha = ref<InstanceType<typeof AlphaBar>>()
const popper = ref<TooltipInstance>()
const triggerRef = ref()

const {
  isFocused,
  handleFocus: _handleFocus,
  handleBlur
} = useFocusController(triggerRef, {
  beforeBlur(event: any) {
    return popper.value?.isFocusInsideContent(event)
  },
  afterBlur() {
    setShowPicker(false)
    resetColor()
  }
})

const handleFocus = (event: FocusEvent) => {
  _handleFocus(event)
}

// active-change is used to prevent modelValue changes from triggering.
let shouldActiveChange = true

const color = reactive(
  new Color({
    enableAlpha: props.showAlpha,
    format: props.colorFormat,
    value: props.modelValue
  })
) as Color

const showPicker = ref(false)
const showPanelColor = ref(false)
const customInput = ref(toHex(color.toRgb()).slice(1))
const contentRef = ref()
const currentAlpha = ref(color.get('alpha'))
const colorFormat = ref('hex')
const colorData = ref<number[]>([])

const displayedColor = computed(() => {
  if (!props.modelValue && !showPanelColor.value) {
    return 'transparent'
  }
  return displayedRgb(color, props.showAlpha)
})

const currentColor = computed(() => {
  return !props.modelValue && !showPanelColor.value ? '' : color.value
})

const btnCls = computed(() => [
  ns.b('picker'),
  ns.is('disabled', actualDisabled.value),
  ns.bm('picker', actualSize.value),
  ns.is('focused', isFocused.value)
])

const actualDisabled = computed(() => props.disabled || formItemDisabled.value)
const actualSize = computed(() => props.size || formItemSize.value)

function displayedRgb(color: Color, showAlpha: boolean) {
  if (!(color instanceof Color)) {
    throw new TypeError('color should be instance of _color Class')
  }

  const { r, g, b } = color.toRgb()
  return showAlpha
    ? `rgba(${r}, ${g}, ${b}, ${color.get('alpha') / 100})`
    : `rgb(${r}, ${g}, ${b})`
}

function setShowPicker(value: boolean) {
  if (actualDisabled.value) return
  showPicker.value = value
}

const debounceSetShowPicker = useDebounceFn(setShowPicker, 100)

function show() {
  setShowPicker(true)
}

function hide() {
  debounceSetShowPicker(false)
  resetColor()
}

function resetColor() {
  nextTick(() => {
    if (props.modelValue) {
      color.fromString(props.modelValue)
    } else {
      color.value = ''
      nextTick(() => {
        showPanelColor.value = false
      })
    }
  })
}

function handleTrigger() {
  debounceSetShowPicker(!showPicker.value)
}

function onHexBlur() {
  color.fromString(customInput.value)
  customInput.value = toHex(color.toRgb()).slice(1)
}

function confirmValue() {
  const value = color.value
  isFocused.value = false
  emit('update:modelValue', value)
  emit('change', value)
  debounceSetShowPicker(false)
  // check if modelValue change, if not change, then reset color.
  nextTick(() => {
    const newColor = new Color({
      enableAlpha: props.showAlpha,
      format: props.colorFormat || colorFormat.value,
      value: props.modelValue
    })
    if (!color.compare(newColor)) {
      resetColor()
    }
  })
}

function clear() {
  isFocused.value = false
  customInput.value = ''
  debounceSetShowPicker(false)
  emit('update:modelValue', '')
  emit('change', '')
  resetColor()
}

onClickOutside(contentRef, handleClickOutside)

function handleClickOutside(event: Event) {
  if (!showPicker.value) return
  hide()

  if (isFocused.value) {
    const _event = new FocusEvent('focus', event)
    handleBlur(_event)
  }
}

function handleEsc(event: KeyboardEvent) {
  event.preventDefault()
  event.stopPropagation()
  setShowPicker(false)
  resetColor()
}

function focus() {
  triggerRef.value.focus()
}

function blur() {
  triggerRef.value.blur()
}

const onColorModeChange = (format: string) => {
  colorFormat.value = format
}

const onAlphaChange = (alpha?: number) => {
  if (!isUndefined(alpha)) {
    currentAlpha.value = alpha
    color._alpha = alpha
  }
}

const onHexChange = (val: string) => {
  const hex = val.trim()
  let r: number, g: number, b: number

  if (hex.length === 3) {
    r = parseHexChannel(hex[0] + hex[0])
    g = parseHexChannel(hex[1] + hex[1])
    b = parseHexChannel(hex[2] + hex[2])
  } else if (hex.length === 6 || hex.length === 8) {
    r = parseHexChannel(hex.slice(0, 2))
    g = parseHexChannel(hex.slice(2, 4))
    b = parseHexChannel(hex.slice(4, 6))
  }

  const { h, s, v } = rgb2hsv(r!, g!, b!)

  color.set({
    hue: Math.max(0, Math.min(360, h)),
    saturation: Math.max(0, Math.min(100, s)),
    value: Math.max(0, Math.min(100, v))
  })
}

const onDataChange = (data: number[]) => {
  let hsv = {} as any

  if (colorFormat.value === 'hsl') {
    hsv = hsl2hsv(data[0], data[1], data[2])
  } else if (colorFormat.value === 'rgb') {
    hsv = rgb2hsv(data[0], data[1], data[2])
  } else if (colorFormat.value === 'hsb') {
    hsv = {
      h: data[0],
      s: data[1],
      v: data[2]
    }
  }

  color.set({ hue: hsv.h })
  color.set({ saturation: hsv.s })
  color.set({ value: hsv.v })
}

onMounted(() => {
  if (props.modelValue) {
    customInput.value = toHex(color.toRgb()).slice(1)
  }
})

watch(
  () => props.modelValue,
  (newVal) => {
    if (!newVal) {
      showPanelColor.value = false
    } else if (newVal && newVal !== color.value) {
      shouldActiveChange = false
      color.fromString(newVal)
    }
  }
)

watch(
  () => currentColor.value,
  (val) => {
    customInput.value = toHex(color.toRgb()).slice(1)
    shouldActiveChange && emit('activeChange', val)
    shouldActiveChange = true
    currentAlpha.value = color.get('alpha')
  }
)

watch(
  () => color.value,
  () => {
    if (!props.modelValue && !showPanelColor.value) {
      showPanelColor.value = true
    }
  }
)

watch(
  () => showPicker.value,
  () => {
    customInput.value = toHex(color.toRgb()).slice(1)
    nextTick(() => {
      hue.value?.update()
      cp.value?.update()
      alpha.value?.update()
    })
  }
)

watch(
  () => props.modelValue,
  () => {
    formItem?.validate('change')
  }
)

watchEffect(() => {
  const hue = color.get('hue')
  const saturation = color.get('saturation')
  const value = color.get('value')

  if (colorFormat.value === 'hsl') {
    const hsl = hsv2hsl(hue, saturation / 100, value / 100)
    colorData.value = hsl.map((v, i) =>
      i < 1 ? Math.round(v) : Math.round(v * 100)
    )
  } else if (colorFormat.value === 'rgb') {
    const rgbObj = hsv2rgb(hue, saturation, value)
    colorData.value = [rgbObj.r, rgbObj.g, rgbObj.b]
  } else if (colorFormat.value === 'hsb') {
    colorData.value = [
      Math.round(hue),
      Math.round(saturation),
      Math.round(value)
    ]
  }
})

provide(colorPickerContextKey, {
  currentColor
})

defineExpose({
  color,
  show,
  hide,
  focus,
  blur
})
</script>
