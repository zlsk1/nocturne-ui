<template>
  <div
    class="sticky left-0 top-0 flex items-center justify-between w-100% h-[var(--nav-height)] pl-[40px] pr-[30px] z-[100] shadow-sm max-lg:(relative left-0 top-0) max-md:px-[20px]"
    :class="[plain ? 'bg-transparent' : 'bg-[var(--n-bg-color)]']"
  >
    <a href="/index.html" class="flex items-center">
      <img src="/logo.svg" alt="" />
      <span
        class="ml-2 text-lg"
        style="font-family: var(--code-font-family); color: var(--theme-color)"
        >Nocturne</span
      >
    </a>
    <div class="flex items-center gap-4">
      <vpDocSearch />
      <nav class="flex max-md:hidden">
        <a
          v-for="(item, index) in navlist"
          :key="item.text"
          :href="item.link"
          :class="
            actived(navlist[index].link)
              ? 'before:(content-empty absolute bottom-0 left-0 w-100% h-[2px] bg-[var(--theme-color)] z-2)'
              : ''
          "
          class="block relative px-[10px] leading-[55px] text-[14px] transition-color duration-[var(--duration-time)] cursor-pointer hover:color-[var(--theme-color)]"
          >{{ item.text }}
        </a>
      </nav>
      <div class="max-md:hidden">
        <vpThemeToggle />
      </div>
      <a
        href="https://github.com/zlsk1/nocturne-ui"
        class="flex align-center p-1 rounded-md transition-bg duration-[var(--duration-time)] hover:bg-[var(--n-fill-color)] active:bg-[var(--n-fill-color-darker)]"
        title="github"
        target="_blank"
      >
        <Github size="20" />
      </a>
      <div
        class="hidden p-1 rounded-md transition-bg duration-[var(--duration-time)] hover:bg-[var(--n-fill-color)] active:bg-[var(--n-fill-color-darker)] max-md:(flex align-center cursor-pointer)"
        @click="openDrawer"
      >
        <Menu size="20" />
      </div>
    </div>
  </div>
  <vpNavMenu
    v-if="route.data.filePath !== 'index.md'"
    :open="open"
    :on-open="openMenu"
  />
  <vpNavMobile v-model:visible="visible" />
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import { useThrottleFn } from '@vueuse/core'
import { RiGithubFill as Github, RiMenu3Fill as Menu } from '@remixicon/vue'
import vpThemeToggle from './common/vp-theme-toggle.vue'
import vpDocSearch from './vp-doc-search.vue'
import vpNavMenu from './vp-nav-menu.vue'
import vpNavMobile from './vp-nav-mobile.vue'

defineProps({
  plain: {
    type: Boolean,
    default: false
  }
})

const { theme } = useData<{ nav: Record<'link' | 'text', any>[] }>()
const navlist = theme.value.nav
const route = useRoute()

const open = ref(false)
const visible = ref(false)

onMounted(() => {
  const autoClose = () => {
    if (window.innerWidth > 768) visible.value = false
  }
  window.addEventListener('resize', autoClose)
  useThrottleFn(autoClose, 30)
})

watch(
  () => route.path,
  () => {
    if (open.value) openMenu()
  }
)

const actived = (link: string) => {
  const slpitlink = link.split('/')
  const joinlink = [slpitlink[1], slpitlink[2]].join('/')

  return route.path.includes(joinlink)
}

const openMenu = () => {
  const sidebarEl = document.querySelector('.sidebar')

  if (!sidebarEl) return
  sidebarEl.classList.contains('open')
    ? sidebarEl.classList.remove('open')
    : sidebarEl.classList.add('open')

  open.value = !open.value
}

const openDrawer = () => {
  if (!visible.value) document.body.style.overflow = 'hidden'

  visible.value = !visible.value
}
</script>
