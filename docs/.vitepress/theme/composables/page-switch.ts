import { computed } from 'vue'
import { useData } from 'vitepress'
import { subExtention } from '../../../utils'

type Item = {
  text: string
  link: string
}

type Sidebar = {
  items: Item[]
  text: string
}

export const usePageSwitch = () => {
  const { page, theme } = useData()
  const path = computed(() => `/${subExtention(page.value.filePath)}`)

  const flatSideBar = computed(() =>
    findSidebar(theme.value.sidebar, path.value)
  )
  const index = computed(() =>
    flatSideBar.value.findIndex((v) => v.link === path.value)
  )
  const pageSwitch = computed(() => {
    if (index.value === 0) {
      return {
        next: flatSideBar.value[index.value + 1]
      }
    } else if (index.value > 0) {
      return {
        prev: flatSideBar.value[index.value - 1],
        next: flatSideBar.value[index.value + 1]
      }
    } else if (index.value === flatSideBar.value.length - 1) {
      return {
        prev: flatSideBar.value[index.value - 1]
      }
    }
    return {
      prev: flatSideBar.value[index.value - 1],
      next: flatSideBar.value[index.value + 1]
    }
  })

  return pageSwitch
}

const findSidebar = (sidebar: Sidebar, path: string) => {
  let sidebars = []

  for (const key of Object.keys(sidebar)) {
    if (path.startsWith(key)) sidebars = sidebar[key]
  }

  const flatSideBar = getFlatSidebarLinks(sidebars)

  return flatSideBar
}

export const getFlatSidebarLinks = (sidebar) => {
  return sidebar.reduce((links, item) => {
    if (item.link) {
      links.push({ text: item.text, link: item.link })
    }
    if (item.items !== undefined) {
      links = [...links, ...getFlatSidebarLinks(item.items)]
    }
    return links
  }, [])
}
