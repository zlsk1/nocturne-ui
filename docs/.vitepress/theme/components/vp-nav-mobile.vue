<template>
  <ClientOnly>
    <n-drawer
      :model-value="visible"
      placement="bottom"
      size="95%"
      :masker="false"
      @close="closeDrawer"
      @update:model-value="(visible) => $emit('update:visible', visible)"
    >
      <template #content>
        <ul class="w-60 m-auto text-center text-sm" @click="handleNavigate">
          <li class="py-4" style="border-bottom: 1px solid #363636">
            <a
              class="hover:text-[var(--theme-color)] transition-colors"
              href="../../../zh-CN/guide/nocturne-ui.html"
              >指南</a
            >
          </li>
          <li class="py-4" style="border-bottom: 1px solid #363636">
            <a
              class="hover:text-[var(--theme-color)] transition-colors"
              href="../../../zh-CN/components/button.html"
              >组件</a
            >
          </li>
        </ul>
      </template>
    </n-drawer>
  </ClientOnly>
</template>

<script lang="ts" setup>
defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{ 'update:visible': [visible: boolean] }>()

const handleNavigate = (e: Event) => {
  if ((e.target as HTMLElement).tagName === 'A') emit('update:visible', false)
  return
}

const closeDrawer = () => {
  document.body.style.overflow = 'auto'
}
</script>
