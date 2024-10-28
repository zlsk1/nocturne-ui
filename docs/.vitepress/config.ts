import { mdPlugin }from './config/plugins'

import type { UserConfig } from "vitepress"

export const config: UserConfig = {
  title: 'Nocturne-ui',
  description: '一个vue3组件库',
  lastUpdated: true,
  appearance: false,
  lang: 'zh-CH',

  themeConfig: {
    doscDir: '../../dosc',
    nav: [
      { text: '指南', link: '/zh-CN/guide/nocturne-ui' },
      { text: '组件', link: '/zh-CN/components/button', activeMatch: true },
    ],
    sidebar: {
      '/zh-CN/components': [
        { 
          text: '基础',
          items: [
            { text: 'Button 按钮', link: '/zh-CN/components/button' },
            { text: 'Icon 图标', link: '/zh-CN/components/icon' },
            { text: 'Link 链接', link: '/zh-CN/components/link' },
            { text: 'Layout 布局', link: '/zh-CN/components/layout' }
          ],
        },
        { 
          text: '表单',
          items: [
            { text: 'Checkbox 多选框', link: '/zh-CN/components/checkbox' },
            { text: 'ColorPicker 多选框', link: '/zh-CN/components/color-picker' },
            { text: 'Input 输入框', link: '/zh-CN/components/input' },
            { text: 'Input Number 数字输入框', link: '/zh-CN/components/input-number' },
            { text: 'Form 表单', link: '/zh-CN/components/form' },
            { text: 'Radio 单选框', link: '/zh-CN/components/radio' },
            { text: 'Select 选择器', link: '/zh-CN/components/select' },
            { text: 'Slider 滑块', link: '/zh-CN/components/slider' },
            { text: 'Switch 开关', link: '/zh-CN/components/switch' },
          ],
        },
        { 
          text: '数据',
          items: [
            { text: 'Avatar 头像', link: '/zh-CN/components/avatar' },
            { text: 'Badge 徽章', link: '/zh-CN/components/badge' },
            { text: 'Carousel 轮播图', link: '/zh-CN/components/carousel' },
            { text: 'Collapse 折叠面板', link: '/zh-CN/components/collapse' },
            { text: 'Pagination 分页器', link: '/zh-CN/components/pagination' },
            { text: 'Progress 进度条', link: '/zh-CN/components/progress' },
            { text: 'Tag 标签', link: '/zh-CN/components/tag' },
          ],
        },
        { 
          text: '响应',
          items: [
            { text: 'Alert 警告', link: '/zh-CN/components/alert' },
            { text: 'Dialog 对话框', link: '/zh-CN/components/dialog' },
            { text: 'Drawer 抽屉', link: '/zh-CN/components/drawer' },
            { text: 'Loading 加载中', link: '/zh-CN/components/loading' },
            { text: 'Message 消息通知', link: '/zh-CN/components/message' },
            { text: 'Notification 通知', link: '/zh-CN/components/notification' },
            { text: 'Popconfirm 气泡提示', link: '/zh-CN/components/popconfirm' },
            { text: 'Popover 弹出层', link: '/zh-CN/components/popover' },
            { text: 'Tooltip 文字提示', link: '/zh-CN/components/tooltip' },
          ],
        },
      ],
      '/zh-CN/guide': [
        {
          items: [
            { text: 'Nocturne UI', link: '/zh-CN/guide/nocturne-ui' },
            { text: '快速上手 ', link: '/zh-CN/guide/quickstart' },
          ],
        },
      ]
    }
  },
  markdown: {
    config: (md) => mdPlugin(md),
    headers: {
      level: [1, 2, 3, 4, 5, 6]
    }
  },
  vite: {
    ssr: {
      noExternal: ['nocturne-ui', 'lodash', '@popperjs/core']
    }
  }
}

export default config