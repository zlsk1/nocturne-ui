<template>
  <div :class="[ns.b('node')]">
    <div>
      <n-checkbox />
    </div>
    <n-collapse-transition>
      <div>
        <n-tree-node />
      </div>
    </n-collapse-transition>
  </div>
</template>
<script lang="ts" setup>
import NCollapseTransition from '@/components/collapse/src/collapse-transition.vue'
import NCheckbox from '@/components/checkbox'
import { useNamespace } from '@/composables'

defineOptions({
  name: 'NTreeNode'
})

const ns = useNamespace('tree')
</script>
