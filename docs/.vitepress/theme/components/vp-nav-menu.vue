<template>
  <div class="vp-nav-menu">
    <div class="flex items-center" @click="onClick">
      <Menu size="20"></Menu>
      <span>Menu</span>
    </div>
    <transition name="n-fade-in">
      <div v-show="showBacktoTop" @click="handleScoll">
        Back to top
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { useWindowScroll } from '@vueuse/core';
import { RiMenu2Fill as Menu } from '@remixicon/vue';
import { computed } from 'vue';

const props = defineProps<{handler: () => void}>()

const { y }  = useWindowScroll()

const showBacktoTop = computed(() => y.value > 60)

const onClick = props.handler ? props.handler : () => {}

const handleScoll = () => window.scrollTo(0, 0)
</script>