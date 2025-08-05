<template>
  <div :class="ns.be('dropdown', 'format')">
    <n-dropdown
      :model-value="upperFormat"
      selectable
      trigger="click"
      :teleported="false"
      placement="bottom-end"
      @select="(label) => onSelect(label)"
      @visible-change="(val) => (visible = val)"
    >
      <button>
        <div :class="visible && ns.bem('dropdown', 'format', 'trigger')">
          {{ upperFormat }}
        </div>
        <RiArrowDownSLine
          size="16"
          :class="ns.bem('dropdown', 'format', 'arrow')"
        />
      </button>
      <template #content>
        <n-dropdown-item label="HEX" />
        <n-dropdown-item label="HSL" />
        <n-dropdown-item label="RGB" />
        <n-dropdown-item label="HSV" />
      </template>
    </n-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { RiArrowDownSLine } from '@remixicon/vue'
import { useNamespace } from '@nocturne-ui/composables'
import { NDropdown, NDropdownItem } from '@nocturne-ui/components/dropdown'
import { definePropType } from '@nocturne-ui/utils'
import type { ColorFormats } from '../color-picker'

defineOptions({
  name: 'NColorFormat'
})

const props = defineProps({
  format: {
    type: definePropType<ColorFormats>(String),
    required: true
  }
})

const emit = defineEmits<{ formatChange: [format: ColorFormats] }>()

const ns = useNamespace('color')

const visible = ref(false)

const format = computed({
  get: () => props.format,
  set: () => {}
})
const upperFormat = computed(() => {
  return format.value.toUpperCase()
})

const onSelect = (label: string) => {
  const lowerFormat = label.toLowerCase() as ColorFormats
  format.value = lowerFormat
  emit('formatChange', lowerFormat)
}
</script>
