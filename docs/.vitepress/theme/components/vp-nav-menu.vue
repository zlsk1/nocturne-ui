<template>
  <n-overlay v-show="open" :z-index="199" @click="onOpen" />
  <div
    class="hidden items-center justify-between w-100% h-[40px] px-[40px] text-[13px] cursor-pointer text-[var(--n-border-color-darker)] max-lg:(sticky left-0 top-0 flex bg-[var(--n-bg-color)] z-10) max-md:px-[20px]"
    style="border-bottom: 1px solid var(--n-border-color)"
  >
    <div class="flex items-center" @click="onOpen">
      <Menu size="20" class="ml-[10px]" />
      <span>Menu</span>
    </div>
    <transition name="n-fade-in">
      <div v-show="showBacktoTop" @click="handleScoll">Back to top</div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import { RiMenu2Fill as Menu } from '@remixicon/vue'

withDefaults(defineProps<{ onOpen: () => void; open: boolean }>(), {
  open: false,
  onOpen: () => ({})
})

const { y } = useWindowScroll()

const showBacktoTop = computed(() => y.value > 60)

const handleScoll = () => window.scrollTo(0, 0)
</script>
