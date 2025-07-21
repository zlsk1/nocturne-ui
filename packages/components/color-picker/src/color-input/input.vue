<template>
  <div :class="ns.be('dropdown', 'input')">
    <div :class="ns.be('dropdown', 'value')">
      <ColorFormat
        :format="currentFormat"
        @format-change="(format) => $emit('formatChange', format)"
      />
      <n-input
        v-if="format === 'hex'"
        ref="inputRef"
        v-model="currentHex"
        size="small"
        @blur="$emit('hexBlur')"
        @change="(val) => $emit('hexChange', val)"
      >
        <template #prefix>
          <span>#</span>
        </template>
      </n-input>
      <n-input-number
        v-for="(_, index) in 3"
        v-else
        :key="index"
        v-model="currentData[index]"
        size="small"
        :min="0"
        :max="
          format === 'rgb'
            ? 255
            : format === 'hsl' || format === 'hsb'
              ? index === 0
                ? 360
                : 100
              : 100
        "
        @change="(val) => onDataChange(val, index)"
      >
        <template v-if="format === 'hsl' && index > 0" #suffix>
          <span>%</span>
        </template>
      </n-input-number>
      <n-input-number
        v-if="showAlpha"
        v-model="currentAlpha"
        size="small"
        :max="100"
        :min="0"
        @change="(val) => $emit('alphaChange', val)"
      >
        <template #suffix>
          <span>%</span>
        </template>
      </n-input-number>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useNamespace } from '@nocturne-ui/composables'
import { definePropType, isUndefined } from '@nocturne-ui/utils'
import NInputNumber from '@nocturne-ui/components/input-number'
import NInput from '@nocturne-ui/components/input'
import ColorFormat from './color-format.vue'

defineOptions({
  name: 'NColorInput'
})

const props = defineProps({
  format: {
    type: String,
    default: 'hex'
  },
  showAlpha: {
    type: Boolean,
    default: false
  },
  colorData: {
    type: definePropType<number[]>(Array)
  },
  alpha: {
    type: Number
  },
  hex: String
})

const emit = defineEmits<{
  formatChange: [format: string]
  hexChange: [hex: string]
  alphaChange: [alpha?: number]
  hexBlur: []
  dataChange: [data: number[]]
}>()

const ns = useNamespace('color')

const currentAlpha = computed({
  get() {
    return props.alpha
  },
  set() {}
})

const currentFormat = computed({
  get() {
    return props.format
  },
  set() {}
})

const currentHex = computed({
  get() {
    return props.hex
  },
  set() {}
})

const currentData = computed({
  get() {
    return props.colorData || []
  },
  set() {}
})

const onDataChange = (val: number | undefined, index: number) => {
  if (isUndefined(val)) return

  const newData = [...currentData.value]

  newData[index] = val
  emit('dataChange', newData)
}
</script>
