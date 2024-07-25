<template>
  <n-tooltip
    ref="popper"
    :visible="showPicker"
    :show-arrow="false"
    :fallback-placements="['bottom', 'top', 'right', 'left']"
    :offset="10"
    :gpu-acceleration="false"
    :popper-class="['n-color-picker__panel', 'n-color-dropdown', popperClass]"
    :stop-popper-mouse-event="false"
    effect="light"
    trigger="click"
    :teleported="teleported"
    :transition="`n-zoom-in-top`"
    persistent
    @hide="setShowPicker(false)"
  >
    <template #content>
      <div ref="contentRef" @keydown.esc="handleEsc">
        <div class="n-color-dropdown__main-wrapper">
          <color-panel ref="cp" :color="color"></color-panel>
        </div>
        <hue-bar
          ref="hue"
          class="hue-slider"
          :color="color"
        ></hue-bar>
        <alpha-bar
          v-if="showAlpha"
          ref="alpha"
          :color="color"
        ></alpha-bar>
        <predefine
          v-if="predefine"
          ref="predefine"
          :enable-alpha="showAlpha"
          :color="color"
          :colors="predefine"
        ></predefine>
        <div class="n-color-dropdown__btns">
          <span class="n-color-dropdown__value">
            <n-input
              ref="inputRef"
              v-model="customInput"
              :validate-event="false"
              size="small"
              @keyup.enter="handleConfirm"
              @blur="handleConfirm"
            ></n-input>
          </span>
          <n-button
            class="n-color-dropdown__link-btn"
            text
            size="small"
            @click="clear"
          >
            取消
          </n-button>
          <n-button
            plain
            size="small"
            class="n-color-dropdown__btn"
            @click="confirmValue"
          >
            确定
          </n-button>
        </div>
      </div>
    </template>
    <template #default>
      <div
        ref="triggerRef"
        v-bind="$attrs"
        :class="[
          'n-color-picker',
          size ? `n-color-picker--${size}` : '',
          {
            'is-disabled': disabled,
          }
        ]"
        role="button"
        :tabindex="tabindex"
        @focus="handleFocus"
        @blur="handleBlur"
      >
        <div v-if="disabled" :class="{ 'n-color-picker__mask': disabled }"></div>
        <div class="n-color-picker__trigger" @click="handleTrigger">
          <div :class="['n-color-picker__color', { 'is-alpha': showAlpha }]">
            <span
              class="n-color-picker__color-inner"
              :style="{
                backgroundColor: displayedColor,
              }"
            >
            </span>
          </div>
          <div v-if="showText" class="n-color-picker__value">{{ modelValue }}</div>
          <i v-if="$slots.icon" :class="['n-color-picker__icon', 'is-icon-arrow-down']">
            <slot name="icon"></slot>
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
  watch
} from 'vue'
import { useDebounceFn, onClickOutside } from '@vueuse/core'
import { NButton, NTooltip, NInput } from '@/components'
import AlphaBar from './alpha-bar.vue'
import HueBar from './hue-bar.vue'
import Predefine from './predefine.vue'
import ColorPanel from './color-panel.vue'
import Color from './utils/color'
import {
  colorPickerContextKey,
  colorPickerEmits,
  colorPickerProps
} from './color-picker'
import { useFocusController } from '@/composables'
import type { TooltipInstance } from '@/components/tooltip'

defineOptions({
  name: 'NColorPicker'
})
const props = defineProps(colorPickerProps)
const emit = defineEmits(colorPickerEmits)

const hue = ref<InstanceType<typeof HueBar>>()
const cp = ref<InstanceType<typeof ColorPanel>>()
const alpha = ref<InstanceType<typeof AlphaBar>>()
const popper = ref<TooltipInstance>()
const triggerRef = ref()
const inputRef = ref()

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
    format: props.colorFormat || '',
    value: props.modelValue
  })
) as Color

const showPicker = ref(false)
const showPanelColor = ref(false)
const customInput = ref('')
const contentRef = ref()

const displayedColor = computed(() => {
  if (!props.modelValue && !showPanelColor.value) {
    return 'transparent'
  }
  return displayedRgb(color, props.showAlpha)
})

const currentColor = computed(() => {
  return !props.modelValue && !showPanelColor.value ? '' : color.value
})

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
  if (props.disabled) return
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
    }
    else {
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

function handleConfirm() {
  color.fromString(customInput.value)
}

function confirmValue() {
  const value = color.value
  emit('update:modelValue', value)
  emit('change', value)
  debounceSetShowPicker(false)
  // check if modelValue change, if not change, then reset color.
  nextTick(() => {
    const newColor = new Color({
      enableAlpha: props.showAlpha,
      format: props.colorFormat || '',
      value: props.modelValue
    })
    if (!color.compare(newColor)) {
      resetColor()
    }
  })
}

function clear() {
  debounceSetShowPicker(false)
  emit('update:modelValue', '#000')
  emit('change', '#000')
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

onMounted(() => {
  if (props.modelValue) {
    customInput.value = currentColor.value
  }
})

watch(
  () => props.modelValue,
  (newVal) => {
    if (!newVal) {
      showPanelColor.value = false
    }
    else if (newVal && newVal !== color.value) {
      shouldActiveChange = false
      color.fromString(newVal)
    }
  }
)

watch(
  () => currentColor.value,
  (val) => {
    customInput.value = val
    shouldActiveChange && emit('activeChange', val)
    shouldActiveChange = true
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
    nextTick(() => {
      hue.value?.update()
      cp.value?.update()
      alpha.value?.update()
    })
  }
)

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

<style lang="scss" scoped>
@use '@/theme-chalk/src/color-picker.scss';
</style>
