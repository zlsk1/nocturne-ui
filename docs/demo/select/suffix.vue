<template>
  <n-space>
    <n-select v-model="suffix" style="width: 140px">
      <template #suffix><RiUserSmileLine size="16" /></template>
      <n-option
        v-for="item in 4"
        :key="item"
        :value="item"
        :label="`Option${item}`"
      />
    </n-select>
    <n-select v-model="prefix" style="width: 140px">
      <template #prefix>
        <RiUserUnfollowLine size="16" />
      </template>
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
import { RiUserSmileLine, RiUserUnfollowLine } from '@remixicon/vue'

const suffix = ref(1)
const prefix = ref(1)
</script>
