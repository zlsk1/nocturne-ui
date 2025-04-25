<template>
  <ul
    ref="rateRef"
    :class="[ns.b(), ns.is('disabled', actualDisabled)]"
    :tabindex="actualDisabled || props.readonly ? -1 : 0"
    role="radiogroup"
    @mouseleave="onMouseLeave"
    @keydown="onKeyDown"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <Star
      v-for="(item, index) in count"
      :ref="(el) => setRefs(el as typeof Star | null, index)"
      :key="item"
      :index="index"
      :character="character"
      :model-value="
        state.hoverValue === undefined ? state.value : state.hoverValue
      "
      :allow-half="allowHalf"
      :disabled="actualDisabled"
      :readonly="readonly"
      :focused="isFocused"
      @hover="onHover"
      @click="onClick"
    />
  </ul>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, shallowRef, watch } from 'vue'
import { useFocusController, useNamespace } from '@nocturne-ui/composables'
import { isNull } from 'lodash'
import { useForm, useFormItem } from '@nocturne-ui/components/form'
import { isUndefined } from '@nocturne-ui/utils'
import Star from './star'
import { rateEmits, rateProps } from './rate'
import { getOffsetLeft } from './util'

defineOptions({
  name: 'NRate'
})

const props = defineProps(rateProps)
const emit = defineEmits(rateEmits)

const ns = useNamespace('rate')
const { formItemDisabled } = useFormItem()
const { formItem } = useForm()

const starRefs = ref<Record<string, HTMLElement>>({})
const rateRef = shallowRef<HTMLUListElement>()
const state = reactive<
  Partial<{
    value: number
    cleanedValue: number | null
    hoverValue: number
  }>
>({
  value: props.modelValue,
  cleanedValue: null,
  hoverValue: undefined
})

const actualDisabled = computed(() => formItemDisabled.value || props.disabled)

const { handleFocus, handleBlur, isFocused } = useFocusController(rateRef, {
  afterBlur: () => {
    formItem?.validate('blur')
  }
})

const setRefs = (el: typeof Star | null, index: number) => {
  if (!isNull(el)) {
    starRefs.value[index] = el.$el
  }
}

const getValue = (index: number, x: number) => {
  let value = index + 1
  if (props.allowHalf) {
    const starEle = starRefs.value[index]
    const leftDis = getOffsetLeft(starEle)
    const width = starEle.clientWidth
    if (x - leftDis < width / 2) {
      value -= 0.5
    }
  }
  return value
}

const onHover = (e: MouseEvent, index: number) => {
  if (actualDisabled.value || props.readonly) return

  const hoverValue = getValue(index, e.pageX)
  if (hoverValue !== state.cleanedValue) {
    state.hoverValue = hoverValue
    state.cleanedValue = null
  }
  emit('hoverChange', hoverValue)
}

const onClick = (e: MouseEvent, index: number) => {
  if (actualDisabled.value || props.readonly) return

  const value = getValue(index, e.pageX)
  let isReset = false
  if (props.allowClear) {
    isReset = value === state.value
  }
  onMouseLeave()
  changeValue(isReset ? 0 : value)
  state.cleanedValue = isReset ? value : null
  emit('change', value)
}

const onMouseLeave = () => {
  if (actualDisabled.value || props.readonly) return

  state.hoverValue = undefined
  state.cleanedValue = null
  emit('hoverChange', undefined)
}

const changeValue = (value: number) => {
  if (props.modelValue === undefined) {
    state.value = value
  }
  emit('update:modelValue', value)
  emit('change', value)
}

const onKeyDown = (event: KeyboardEvent) => {
  const { code } = event
  const { count, allowHalf } = props

  if (isUndefined(state.value)) return

  if (code === 'ArrowRight' && state.value < count) {
    if (allowHalf) {
      state.value += 0.5
    } else {
      state.value += 1
    }
    changeValue(state.value)
    event.preventDefault()
  } else if (code === 'ArrowLeft' && state.value > 0) {
    if (allowHalf) {
      state.value -= 0.5
    } else {
      state.value -= 1
    }
    changeValue(state.value)
    event.preventDefault()
  } else if (code === 'ArrowRight' && state.value > 0) {
    if (allowHalf) {
      state.value -= 0.5
    } else {
      state.value -= 1
    }
    changeValue(state.value)
    event.preventDefault()
  } else if (code === 'ArrowLeft' && state.value < count) {
    if (allowHalf) {
      state.value += 0.5
    } else {
      state.value += 1
    }
    changeValue(state.value)
    event.preventDefault()
  }
  emit('keydown', event)
}

const focus = () => {
  if (!actualDisabled.value || !props.readonly) {
    rateRef.value?.focus()
  }
}
const blur = () => {
  if (!actualDisabled.value || !props.readonly) {
    rateRef.value?.blur()
  }
}

watch(
  () => props.modelValue,
  (val) => {
    formItem?.validate('change')
    state.value = val
  }
)

defineExpose({
  focus,
  blur
})
</script>
