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
        <n-dropdown-item label="HSB" />
      </template>
    </n-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { RiArrowDownSLine } from '@remixicon/vue'
import { useNamespace } from '@nocturne-ui/composables'
import { NDropdown, NDropdownItem } from '@nocturne-ui/components/dropdown'

defineOptions({
  name: 'NColorFormat'
})

const props = defineProps({
  format: {
    type: String,
    default: 'hex'
  }
})

const emit = defineEmits<{ formatChange: [format: string] }>()

const ns = useNamespace('color')

const format = ref(props.format)
const visible = ref(false)

const upperFormat = computed(() => format.value.toUpperCase())

const onSelect = (label: string) => {
  format.value = label
  emit('formatChange', label.toLowerCase())
}
</script>
