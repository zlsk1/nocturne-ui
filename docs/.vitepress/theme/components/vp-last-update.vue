<script lang="ts" setup>
import { onMounted, ref, computed, watchEffect } from 'vue'
import { useData } from 'vitepress'

const { theme, page, lang } = useData()

const date = computed(() => new Date(page.value.lastUpdated!))

const isoDatetime = computed(() => date.value.toISOString())
const datetime = ref('')

// set time on mounted hook to avoid hydration mismatch due to
// potential differences in timezones of the server and clients
onMounted(() => {
  watchEffect(() => {
    datetime.value = new Intl.DateTimeFormat(
      theme.value.lastUpdated?.formatOptions?.forceLocale
        ? lang.value
        : undefined,
      theme.value.lastUpdated?.formatOptions ?? {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    ).format(date.value)
  })
})
</script>

<template>
  <div class="vp-last-update" v-if="date">
    上次更新时间：<span>{{ datetime }}</span>
  </div>
</template>

<style>
.vp-last-update {
  margin-top: 40px;
  font-size: 13px;
  color: var(--theme-color);
}
</style>
