import type { Ref } from 'vue'
export { OnlyChild as NOnlyChild } from './src/only-child'

export type OnlyChildExpose = {
  forwardRef: Ref<HTMLElement>
}
