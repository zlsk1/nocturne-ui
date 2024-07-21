<script lang="ts" setup>
import { ref } from 'vue'
import { switchProps, switchEmits } from './switch'

defineOptions({
  name: 'NSwitch'
})

const props = defineProps(switchProps)
const emit = defineEmits(switchEmits)

const isActive = ref(props.modelValue)

const handleClick = () => {
  if (props.disabled) return
  isActive.value = !isActive.value
}

const handleChange = () => {
  const val = isActive.value ? props.activeValue : props.inactiveValue
  emit('change', val as boolean | string | number)
}

const handleSwitch = () => {
  handleChange()
}
</script>

<template>
  <div
    :class="[
      'n-switch',
      size ? `n-switch--${size}` : 'n-switch',
      {
        'is-checked': isActive,
        'is-disabled': disabled
      }
    ]"
    @click.prevent="handleSwitch"
  >
    <input
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
          'is-active': !isActive
        }
      ]"
      @click="handleClick"
    >
      <span>{{ inactiveText }}</span>
    </span>
    <div class="n-switch__wrap" @click="handleClick">
      <div class="n-switch__action">
        <template v-if="isActive">
          <slot name="active-action-icon"></slot>
        </template>
        <template v-else>
          <slot name="inactive-action-icon"></slot>
        </template>
      </div>
      <div v-if="activeText || $slots.activeIcon || $slots.inactiveIcon" class="n-switch__action--reverse">
        <template v-if="isActive">
          <slot name="active-icon"></slot>
        </template>
        <template v-else>
          <slot name="inactive-icon"></slot>
        </template>
        <span v-if="activeText && inlineText && isActive" class="n-switch__action--text">{{ activeText }}</span>
        <span v-if="activeText && inlineText && !isActive">{{ inactiveText }}</span>
      </div>
    </div>
    <span
      v-if="activeText && !inlineText"
      :class="[
        'n-switch__label',
        'n-switch__label--right',
        {
          'is-active': isActive
        }
      ]"
      @click="handleClick"
    >
      <span>{{ activeText }}</span>
    </span>
  </div>
</template>

<style lang="scss" scoped>
@use '@/theme-chalk/src/switch.scss';
</style>
