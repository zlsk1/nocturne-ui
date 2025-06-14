<script lang="ts" setup>
import { inject, ref } from 'vue'
import NInputNumber from '@nocturne-ui/components/input-number'
import { useLocale, useNamespace } from '@nocturne-ui/composables'
import { PAGINATION_INJECTION_KEY } from '../constants'
import { jumperProps } from './jumper'

defineProps(jumperProps)

const { _currentPage, emit } = inject(PAGINATION_INJECTION_KEY, undefined)!

const ns = useNamespace('pagination')
const { t } = useLocale()

const val = ref(_currentPage)

const change = (value?: number) => {
  val.value = Number(value)
  _currentPage.value = Number(value)
  emit('changePage', Number(value))
}
</script>

<template>
  <div :class="ns.e('jumper')">
    <span>{{ jumperText || t('noc.pagination.goto') }}</span>
    <n-input-number
      :model-value="val"
      size="large"
      :controls="false"
      :disabled="disabled"
      :aria-label="t('noc.pagination.page')"
      @change="change"
    />
  </div>
</template>
