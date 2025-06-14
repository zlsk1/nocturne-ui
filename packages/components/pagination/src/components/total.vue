<template>
  <div :class="ns.e('total')">
    {{ t('noc.pagination.total', { total }) }}
  </div>
</template>

<script lang="ts" setup>
import { useLocale, useNamespace } from '@nocturne-ui/composables'
import { totalProps } from './total'

defineProps(totalProps)

const ns = useNamespace('pagination')
const { t } = useLocale()
</script>
