<script lang="ts" setup>
import { inject, ref } from 'vue'
import { PAGINATION_INJECTION_KEY } from '../constants'
import { jumperProps } from './jumper'
import { FrInputNumber } from '@/components'

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
  <div class="fr-pagination__jumper">
    <span>{{ jumperText || '跳转到' }}</span>
    <fr-input-number
      :model-value="val"
      size="large"
      type="number"
      :controls="false"
      :disabled="disabled"
      @change="change"
    ></fr-input-number>
  </div>
</template>
