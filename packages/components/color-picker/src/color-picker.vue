<template>
  <NTooltip trigger="click" effect="light" ref="tooltipRef">
    <div 
      :class="[
        size ? `n-color-picke--${size}` : 'n-color-picker'
      ]"
      :style="{ backgroundColor: modelValue || '#000' }"
    >
      <ArrowDown size="18"></ArrowDown>
    </div>
    <template #content>
      <div class="n-color-picker__content">
        <div class="n-color-picker__operas">
          <div class="operas__input">
            <NInput size="small" v-model="inputValue" @change="getInputVal"></NInput>
          </div>
          <NButton size="small" text @click="clearColor">取消</NButton>
          <NButton size="small" @click="setColor">确定</NButton>
        </div>
      </div>
    </template>
  </NTooltip>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import { colorPickerProps, colorPickerEmit } from './color-picker'
import {
  NTooltip,
  NInput,
  NButton
} from '@/components';
import {
  RiArrowDownSLine as ArrowDown
} from '@remixicon/vue';
import { TooltipInstance } from '@/components/tooltip/src/tooltip'

defineOptions({
  name: 'NColorPicker'
})

const props = defineProps(colorPickerProps)
const emit = defineEmits(colorPickerEmit)

const inputValue = ref('')

const tooltipRef = ref<TooltipInstance>()

const getInputVal = (val: any) => {
  emit('update:modelValue', val)
}

const setColor = () => {
  emit('update:modelValue', inputValue.value)
  nextTick(() => {})
  tooltipRef.value?.onClose()
}

const clearColor = () => {
  inputValue.value = ''
  emit('update:modelValue', '#000000')
  tooltipRef.value?.onClose()
}
</script>

<style lang="scss" scoped>
@use '@/theme-chalk/src/color-picker.scss'
</style>