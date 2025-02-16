<script lang="ts" setup>
import { inject, ref } from 'vue'
import { NInputNumber } from '@nocturne-ui/components'
import { useNamespace } from '@nocturne-ui/composables'
import { PAGINATION_INJECTION_KEY } from '../constants'
import { jumperProps } from './jumper'

defineProps(jumperProps)

const { _currentPage, emit } = inject(PAGINATION_INJECTION_KEY, undefined)!

const ns = useNamespace('pagination')

const val = ref(_currentPage)

const change = (value: number) => {
  val.value = Number(value)
  _currentPage.value = Number(value)
  emit('changePage', Number(value))
}
</script>

<template>
  <div :class="ns.e('jumper')">
    <span>{{ jumperText || '跳转到' }}</span>
    <n-input-number
      :model-value="val"
      size="large"
      type="number"
      :controls="false"
      :disabled="disabled"
      @change="change"
    />
  </div>
</template>
