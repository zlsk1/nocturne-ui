import { useData, useRoute } from 'vitepress'

export const useSidebar = () => {
  const { site } = useData()
  const route = useRoute()
  const relativePath = route.data.relativePath
  const navname = '/' + relativePath.split('/')[1]

  return site.value.themeConfig.sidebar[navname]
}