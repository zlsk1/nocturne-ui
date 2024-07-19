import { useData, useRoute } from 'vitepress'

export const useSidebar = () => {
  const { site } = useData()
  const route = useRoute()
  const sliptPath = route.data.relativePath.split('/')
  const navname = `/${sliptPath[0]}/${sliptPath[1]}`

  return site.value.themeConfig.sidebar[navname]
}