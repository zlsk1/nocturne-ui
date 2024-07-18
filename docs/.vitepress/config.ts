import { mdPlugin }from './config/plugins'
import path from 'path'

import type { UserConfig } from "vitepress"

export const config: UserConfig = {
  title: 'Nocturne-ui',
  description: '一个vue3组件库',
  lastUpdated: true,

  themeConfig: {
    doscDir: '../../dosc',
    nav: [
      { text: '指南', link: '/zh-CN/guide/use' },
      { text: '组件', link: '/zh-CN/components/button', activeMatch: true },
    ],
    sidebar: {
      '/zh-CN/components': [
        { 
          text: '基础',
          items: [
            { text: 'Button 按钮', link: '/zh-CN/components/button' },
          ],
        },
        { 
          text: '表单',
          items: [
            { text: 'Checkbox 多选框', link: '/zh-CN/components/checkbox' },
            { text: 'Input 输入框', link: '/zh-CN/components/input' },
            { text: 'Input Number 数字输入框', link: '/zh-CN/components/input-number' },
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
            { text: 'Message 消息通知', link: '/zh-CN/components/message' },
            { text: 'Tooltip 文字提示', link: '/zh-CN/components/tooltip' },
          ],
        },
      ],
      '/zh-CN/guide': [
        {
          items: [
            { text: '快速上手 ', link: '/zh-CN/guide/use' },
          ],
        },
      ]
    },
  },
  markdown: {
    config: (md) => mdPlugin(md)
  }
}

export default config