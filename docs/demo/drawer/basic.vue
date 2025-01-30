<template>
  <n-radio-group v-model="placement">
    <n-radio value="right">left to right</n-radio>
    <n-radio value="left">right to left</n-radio>
    <n-radio value="bottom">top to bottom</n-radio>
    <n-radio value="top">bottom to top</n-radio>
  </n-radio-group>

  <n-button type="primary" style="margin-left: 16px" @click="drawer = true">
    open
  </n-button>
  <n-button type="primary" style="margin-left: 16px" @click="drawer2 = true">
    with footer
  </n-button>

  <n-drawer v-model="drawer" title="I am the title" :placement="placement">
    <span>Hi, there!</span>
  </n-drawer>
  <n-drawer v-model="drawer2" :placement="placement">
    <template #header>
      <h4>set title by slot</h4>
    </template>
    <template #default>
      <div>
        <n-radio v-model="radio1" value="Option 1" size="large">
          Option 1
        </n-radio>
        <n-radio v-model="radio1" value="Option 2" size="large">
          Option 2
        </n-radio>
      </div>
    </template>
  </n-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const drawer = ref(false)
const drawer2 = ref(false)
const placement = ref('right')
const radio1 = ref('Option 1')
</script>
