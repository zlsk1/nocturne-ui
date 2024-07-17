import { mdPlugin }from './config/plugins'

import type { UserConfig } from "vitepress"

export const config: UserConfig = {
  title: 'Nocturne-ui',
  description: '一个vue3组件库',

  themeConfig: {
    doscDir: '../../dosc',
    nav: [
      {
        text: 'Example',
        items: [
          { text: 'ItemA', link: '/example' },
          { text: 'ItemB', link: '/example' },
          { text: 'ItemC', link: '/example' },
        ]
      },
      { text: '组件', link: '/example' },
    ],

    sidebar: [
      {
        // text: 'Guide',
        items: [
          { text: 'button', link: '/ch-ZH/components/button' },
          // ...
        ],
      },
    ],
  },
  markdown: {
    config: (md) => mdPlugin(md)
  }
}

export default config