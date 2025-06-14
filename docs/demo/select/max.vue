<template>
  <n-space>
    <n-select
      v-model="maxCount"
      style="width: 340px"
      :max-tag-count="2"
      multiple
    >
      <n-option
        v-for="item in 4"
        :key="item"
        :value="item"
        :label="`Option${item}`"
      />
    </n-select>
    <n-select
      v-model="maxCountTooltip"
      style="width: 340px"
      :max-tag-count="2"
      max-tag-count-with-tooltip
      multiple
      tag-type="primary"
    >
      <n-option
        v-for="item in 4"
        :key="item"
        :value="item"
        :label="`Option${item}`"
      />
    </n-select>
  </n-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const maxCount = ref([1, 2, 3])
const maxCountTooltip = ref([1, 2, 3])
</script>
