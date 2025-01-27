<template>
  <div v-show="isActived" :class="itemCls">
    <slot v-if="false" />
    <slot v-if="false" name="label" />
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, useSlots } from 'vue'
import { useNamespace } from '@/composables'
import { TAB_INJECT_KEY } from './constants'
import { tabItemProps } from './tab-item'

defineOptions({
  name: 'NTabItem'
})

const props = defineProps(tabItemProps)
const slots = useSlots()

const ns = useNamespace('tabs')

const root = inject(TAB_INJECT_KEY, undefined)!

const itemCls = computed(() => [ns.e('content__item')])

const isActived = computed(() => props.label === root.activeTab)

const disabled = computed(() => root.disabled || props.disabled)

const tab = computed(() => ({
  label: props.label || '',
  slot: { label: slots.label, default: slots.default },
  disabled: disabled.value,
  closeable: props.closeable
}))

onMounted(() => {
  if (props.label) {
    root.addLabel(tab.value)
  }

  if (isActived.value) root.updateActiveTab(tab.value)
})
</script>
