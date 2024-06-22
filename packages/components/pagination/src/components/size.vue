<template>
  <FrSelect
    v-model="selectedPage"
    class="fr-pagination__size"
    :size="small ? 'small' : ''"
    @update:model-value="onSelect"
  >
    <FrOption
      v-for="(item, index) in pageSizes"
      :key="index"
      :label="`${item}条/页`"
      :value="item"
    >
      {{ item }}条/页
    </FrOption>
  </FrSelect>
</template>

<script lang="ts" setup>
import { inject, ref } from 'vue'
import { sizeProps } from './size'
import { PAGINATION_INJECTION_KEY } from '../constants'
import { FrSelect, FrOption } from '@/components'

const {
  pageSize,
  emit
} = inject(PAGINATION_INJECTION_KEY, undefined)!

const props = defineProps(sizeProps)

const selectedPage = ref<number>(props.pageSize)

const onSelect = () => {
  pageSize.value = selectedPage.value

  emit('update:page-size', selectedPage.value)
  emit('changeSize', selectedPage.value)
}
</script>
