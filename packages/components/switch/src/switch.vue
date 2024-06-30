<script lang="ts" setup>
import { ref } from 'vue'
import { switchProps, switchEmits } from './switch'

defineOptions({
  name: 'FrSwitch'
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
      'fr-switch',
      `fr-switch--${size}`,
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
      class="fr-switch__input"
      :value="modelValue"
      @change="handleChange"
    >
    <span
      :class="[
        'fr-switch__label',
        'fr-switch__label--left',
        {
          'is-active': !isActive
        }
      ]"
      @click="handleClick"
    >
      <span>{{ inactiveText }}</span>
    </span>
    <div class="fr-switch__wrap" @click="handleClick">
      <div class="fr-switch__action"></div>
    </div>
    <span
      :class="[
        'fr-switch__label',
        'fr-switch__label--right',
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
@use '@/theme-chalk/switch.scss';
</style>
