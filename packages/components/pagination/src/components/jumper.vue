<script lang="ts" setup>
import { inject, ref } from 'vue'
import { PAGINATION_INJECTION_KEY } from '../constants'
import { jumperProps } from './jumper'
import { NInputNumber } from '@/components'

defineProps(jumperProps)

const { _currentPage, emit } = inject(PAGINATION_INJECTION_KEY, undefined)!

const val = ref(_currentPage)

const change = (value: number) => {
  val.value = Number(value)
  _currentPage.value = Number(value)
  emit('changePage', Number(value))
}
</script>

<template>
  <div class="n-pagination__jumper">
    <span>{{ jumperText || '跳转到' }}</span>
    <n-input-number
      :model-value="val"
      size="large"
      type="number"
      :controls="false"
      :disabled="disabled"
      @change="change"
    ></n-input-number>
  </div>
</template>
