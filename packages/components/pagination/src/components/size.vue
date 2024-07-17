<template>
  <NSelect
    v-model="selectedPage"
    class="n-pagination__size"
    :size="small ? 'small' : ''"
    @update:model-value="onSelect"
  >
    <NOption
      v-for="(item, index) in pageSizes"
      :key="index"
      :label="`${item}条/页`"
      :value="item"
    >
      {{ item }}条/页
    </NOption>
  </NSelect>
</template>

<script lang="ts" setup>
import { inject, ref } from 'vue'
import { sizeProps } from './size'
import { PAGINATION_INJECTION_KEY } from '../constants'
import { NSelect, NOption } from '@/components'

const {
  emit
} = inject(PAGINATION_INJECTION_KEY, undefined)!

const props = defineProps(sizeProps)

const selectedPage = ref<number>(props.pageSize)

const onSelect = () => {
  emit('update:page-size', selectedPage.value)
  emit('changeSize', selectedPage.value)
}
</script>
