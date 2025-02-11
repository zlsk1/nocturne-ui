import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'

export const useSidebar = () => {
  const { site } = useData()
  const route = useRoute()
  const sliptPath = computed(() => route.data.relativePath.split('/'))
  const navname = computed(() => `/${sliptPath.value[0]}/${sliptPath.value[1]}`)

  return computed(() => site.value.themeConfig.sidebar[navname.value])
}
