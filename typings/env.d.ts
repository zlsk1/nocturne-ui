import { INSTALLED_KEY } from '@/constants'
import type { Component, vShow } from 'vue'

// declare global {
//   const process: {
//     env: {
//       NODE_ENV: string
//     }
//   }
// }

declare module '@vue/runtime-core' {
  export interface App {
    [INSTALLED_KEY]?: boolean
  }

  export interface GlobalComponents {
    Component: (props: { is: Component | string }) => void
  }

  export interface ComponentCustomProperties {
    vShow: typeof vShow
  }
}

export {}
