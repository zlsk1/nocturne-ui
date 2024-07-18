import { useData } from "vitepress"

export const useTocAnchor = () => {
  const { page } = useData()
  console.log(page)
}