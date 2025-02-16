<template>
  <NSelect
    v-model="selectedPage"
    :class="ns.e('size')"
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
import { NOption, NSelect } from '@nocturne-ui/components'
import { useNamespace } from '@nocturne-ui/composables'
import { PAGINATION_INJECTION_KEY } from '../constants'
import { sizeProps } from './size'

const { emit } = inject(PAGINATION_INJECTION_KEY, undefined)!

const props = defineProps(sizeProps)

const ns = useNamespace('pagination')

const selectedPage = ref<number>(props.pageSize)

const onSelect = () => {
  emit('update:page-size', selectedPage.value)
  emit('changeSize', selectedPage.value)
}
</script>
