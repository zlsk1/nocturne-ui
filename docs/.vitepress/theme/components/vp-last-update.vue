<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useData } from 'vitepress'

const date = ref<string | undefined>('') 

const { page } = useData()

onMounted(() => {
  if(page.value.lastUpdated) {
    date.value = new Date(page.value.lastUpdated).toLocaleString()
  }
  else {
    date.value = undefined
  }
})
</script>

<template>
  <div class="vp-last-update" v-if="date">
    上次更新时间：<span>{{ date }}</span>
  </div>
</template>

<style>
.vp-last-update {
  margin-top: 40px;
  color: var(--n-color-primary);
}
</style>