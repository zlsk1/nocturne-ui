<script lang="ts" setup>
import { ref, computed } from 'vue'
import { switchProps, switchEmits } from './switch'
import { isBoolean, isString } from '@/utils'
import { isPromise } from '@vue/shared'
import { useFormItemId } from '@/components/form'

defineOptions({
  name: 'NSwitch'
})

const props = defineProps(switchProps)
const emit = defineEmits(switchEmits)

const labelId = useFormItemId()

const actived = ref(props.modelValue)

const newStyle = computed(() => {
  return {
    width: !isString(props.width) ? `${props.width}px` : props.width
  }
})

const handleChange = () => {
  actived.value = !actived.value
  const val = actived.value ? props.activeValue : props.inactiveValue

  emit('change', val as boolean | string | number)
  emit('update:modelValue', val as boolean | string | number)
}

const handleSwitch = () => {
  if (props.disabled) return
  if (!props.beforeChange) {
    handleChange()
    return
  }

  const beforeChange = props.beforeChange()
  const showProcess = [
    isBoolean(beforeChange),
    isPromise(beforeChange)
  ].includes(true)

  if (!showProcess) {
    throw new Error('before-change must be a boolean or promise')
  }
  else if (isPromise(beforeChange)) {
    beforeChange
      .then(res => {
        if (res) {
          handleChange()
        }
      })
      .catch(err => {
        console.error(err)
      })
  }
  else if (beforeChange) {
    handleChange()
  }
}

defineExpose({
  actived
})
</script>

<template>
  <div
    :class="[
      size ? `n-switch--${size}` : 'n-switch',
      {
        'is-checked': actived,
        'is-disabled': disabled
      }
    ]"
    :style="newStyle"
    @click.prevent="handleSwitch"
  >
    <input
      :id="labelId"
      type="checkbox"
      :disabled="disabled"
      class="n-switch__input"
      :value="modelValue"
      @change="handleChange"
    >
    <span
      v-if="inactiveText && !inlineText"
      :class="[
        'n-switch__label',
        'n-switch__label--left',
        {
          'is-active': !actived
        }
      ]"
    >
      <span>{{ inactiveText }}</span>
    </span>
    <div class="n-switch__wrap">
      <div class="n-switch__action">
        <template v-if="actived">
          <slot name="active-action-icon"></slot>
        </template>
        <template v-else>
          <slot name="inactive-action-icon"></slot>
        </template>
      </div>
      <div v-if="activeText || $slots.activeIcon || $slots.inactiveIcon" class="n-switch__action--reverse">
        <template v-if="actived">
          <slot name="active-icon"></slot>
        </template>
        <template v-else>
          <slot name="inactive-icon"></slot>
        </template>
        <span v-if="activeText && inlineText && actived" class="n-switch__action--text">{{ activeText }}</span>
        <span v-if="activeText && inlineText && !actived">{{ inactiveText }}</span>
      </div>
    </div>
    <span
      v-if="activeText && !inlineText"
      :class="[
        'n-switch__label',
        'n-switch__label--right',
        {
          'is-active': actived
        }
      ]"
    >
      <span>{{ activeText }}</span>
    </span>
  </div>
</template>

<style lang="scss" scoped>
@use '@/theme-chalk/src/switch.scss';
</style>
