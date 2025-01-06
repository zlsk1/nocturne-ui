<template>
  <n-tooltip
    ref="popper"
    :visible="showPicker"
    :show-arrow="false"
    :fallback-placements="['bottom', 'top', 'right', 'left']"
    :offset="10"
    :gpu-acceleration="false"
    :popper-class="[ns.be('picker', 'panel'), ns.b('dropdown'), popperClass]"
    :stop-popper-mouse-event="false"
    effect="light"
    trigger="click"
    :teleported="teleported"
    :transition="`${ns.ns.value}-zoom-in-top`"
    persistent
    @hide="setShowPicker(false)"
  >
    <template #content>
      <div ref="contentRef" @keydown.esc="handleEsc">
        <div :class="ns.be('dropdown', 'main-wrapper')">
          <color-panel ref="cp" :color="color" />
        </div>
        <hue-bar ref="hue" class="hue-slider" :color="color" />
        <alpha-bar v-if="showAlpha" ref="alpha" :color="color" />
        <predefine
          v-if="predefine"
          ref="predefine"
          :enable-alpha="showAlpha"
          :color="color"
          :colors="predefine"
        />
        <div :class="ns.be('dropdown', 'btns')">
          <span :class="ns.be('dropdown', 'value')">
            <n-input
              ref="inputRef"
              v-model="customInput"
              :validate-event="false"
              size="small"
              @keyup.enter="handleConfirm"
              @blur="handleConfirm"
            />
          </span>
          <n-button
            :class="ns.be('dropdown', 'link-btn')"
            text
            size="small"
            @click="clear"
          >
            取消
          </n-button>
          <n-button
            plain
            size="small"
            :class="ns.be('dropdown', 'btn')"
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
        :class="btnCls"
        role="button"
        :tabindex="tabindex"
        @focus="handleFocus"
        @blur="handleBlur"
      >
        <div v-if="actualDisabled" :class="ns.be('picker', 'mask')" />
        <div :class="ns.be('picker', 'trigger')" @click="handleTrigger">
          <div :class="[ns.be('picker', 'color'), ns.is('alpha', showAlpha)]">
            <span
              :class="ns.be('picker', 'color-inner')"
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
  watch
} from 'vue'
import { onClickOutside, useDebounceFn } from '@vueuse/core'
import { useFocusController, useNamespace } from '@/composables'
import { NButton, NInput, NTooltip, useFormItem } from '@/components'
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
import type { TooltipInstance } from '@/components/tooltip'

defineOptions({
  name: 'NColorPicker'
})
const props = defineProps(colorPickerProps)
const emit = defineEmits(colorPickerEmits)

const ns = useNamespace('color')
const { formItemDisabled, formItemSize } = useFormItem()

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

const btnCls = computed(() => {
  return [
    ns.b('picker'),
    ns.is('disabled', actualDisabled.value),
    ns.bm('picker', actualSize.value),
    ns.is('focused', isFocused.value)
  ]
})

const actualDisabled = computed(() => props.disabled || formItemDisabled)
const actualSize = computed(() => props.size || formItemSize)

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
    } else if (newVal && newVal !== color.value) {
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
