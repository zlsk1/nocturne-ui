<script lang="ts" setup>
import { ref } from 'vue'
import { switchProps, switchEmits } from './switch'

defineOptions({
  name: 'NSwitch'
})

const props = defineProps(switchProps)
const emit = defineEmits(switchEmits)

const isActive = ref(true)

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
      `n-switch--${size}`,
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
      <div class="n-switch__action"></div>
    </div>
    <span
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
