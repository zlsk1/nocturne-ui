import { mdPlugin } from './config/plugins'

import type { UserConfig } from 'vitepress'

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
      { text: '组件', link: '/zh-CN/components/button', activeMatch: true }
    ],
    sidebar: {
      '/zh-CN/components': [
        {
          text: '基础',
          items: [
            { text: 'Button 按钮', link: '/zh-CN/components/button' },
            { text: 'Icon 图标', link: '/zh-CN/components/icon' },
            { text: 'Link 链接', link: '/zh-CN/components/link' }
          ]
        },
        {
          text: '布局',
          items: [
            { text: 'Divider 分割线', link: '/zh-CN/components/divider' },
            { text: 'Layout 布局', link: '/zh-CN/components/layout' },
            { text: 'Space 间隔', link: '/zh-CN/components/space' }
          ]
        },
        {
          text: '表单',
          items: [
            {
              text: 'AutoComplete 自动完成',
              link: '/zh-CN/components/auto-complete'
            },
            { text: 'Checkbox 多选框', link: '/zh-CN/components/checkbox' },
            {
              text: 'ColorPicker 颜色选择器',
              link: '/zh-CN/components/color-picker'
            },
            {
              text: 'DatePicker 日期选择器',
              link: '/zh-CN/components/date-picker'
            },
            { text: 'Input 输入框', link: '/zh-CN/components/input' },
            {
              text: 'InputNumber 数字输入框',
              link: '/zh-CN/components/input-number'
            },
            { text: 'Form 表单', link: '/zh-CN/components/form' },
            { text: 'Radio 单选框', link: '/zh-CN/components/radio' },
            { text: 'Rate 评分', link: '/zh-CN/components/rate' },
            { text: 'Select 选择器', link: '/zh-CN/components/select' },
            { text: 'Slider 滑块', link: '/zh-CN/components/slider' },
            { text: 'Switch 开关', link: '/zh-CN/components/switch' },
            {
              text: 'TimePicker 时间选择器',
              link: '/zh-CN/components/time-picker'
            },
            {
              text: 'Transfer 穿梭框',
              link: '/zh-CN/components/transfer'
            },
            {
              text: 'TreeSelect 树形选择器',
              link: '/zh-CN/components/tree-select'
            }
          ]
        },
        {
          text: '数据',
          items: [
            { text: 'Avatar 头像', link: '/zh-CN/components/avatar' },
            { text: 'Badge 徽章', link: '/zh-CN/components/badge' },
            { text: 'Card 卡片', link: '/zh-CN/components/card' },
            { text: 'Carousel 轮播图', link: '/zh-CN/components/carousel' },
            { text: 'Collapse 折叠面板', link: '/zh-CN/components/collapse' },
            { text: 'Image 图片', link: '/zh-CN/components/image' },
            { text: 'Pagination 分页器', link: '/zh-CN/components/pagination' },
            { text: 'Progress 进度条', link: '/zh-CN/components/progress' },
            {
              text: 'Segmented 分段控制器',
              link: '/zh-CN/components/segmented'
            },
            { text: 'Statistic 统计', link: '/zh-CN/components/statistic' },
            { text: 'Table 表格', link: '/zh-CN/components/table' },
            { text: 'Tabs 标签页', link: '/zh-CN/components/tabs' },
            { text: 'Tag 标签', link: '/zh-CN/components/tag' },
            {
              text: 'Tree 树形控件',
              link: '/zh-CN/components/tree'
            }
          ]
        },
        {
          text: '导航',
          items: [
            { text: 'Anchor 锚点', link: '/zh-CN/components/anchor' },
            { text: 'Breadcrumb 面包屑', link: '/zh-CN/components/breadcrumb' },
            { text: 'Dropdown 下拉框', link: '/zh-CN/components/dropdown' },
            { text: 'Menu 菜单', link: '/zh-CN/components/menu' }
          ]
        },
        {
          text: '响应',
          items: [
            { text: 'Alert 警告', link: '/zh-CN/components/alert' },
            { text: 'Dialog 对话框', link: '/zh-CN/components/dialog' },
            { text: 'Drawer 抽屉', link: '/zh-CN/components/drawer' },
            { text: 'Loading 加载中', link: '/zh-CN/components/loading' },
            { text: 'Message 消息通知', link: '/zh-CN/components/message' },
            {
              text: 'Notification 通知',
              link: '/zh-CN/components/notification'
            },
            {
              text: 'Popconfirm 气泡提示',
              link: '/zh-CN/components/popconfirm'
            },
            { text: 'Popover 气泡卡片', link: '/zh-CN/components/popover' },
            { text: 'Skeleton 骨架屏', link: '/zh-CN/components/skeleton' },
            { text: 'Tooltip 文字提示', link: '/zh-CN/components/tooltip' }
          ]
        },
        {
          text: '其他',
          items: [
            {
              text: 'ConfigProvider 全局配置',
              link: '/zh-CN/components/config-provider'
            }
          ]
        }
      ],
      '/zh-CN/guide': [
        {
          text: '基础',
          items: [
            { text: 'NocturneUI', link: '/zh-CN/guide/nocturne-ui' },
            { text: '快速上手 ', link: '/zh-CN/guide/quickstart' }
          ]
        },
        {
          text: '进阶',
          items: [
            { text: '主题', link: '/zh-CN/guide/theme' },
            { text: '命名空间', link: '/zh-CN/guide/namespace' },
            { text: '开发指南', link: '/zh-CN/guide/dev' }
          ]
        }
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
  },
  sitemap: {
    hostname: 'https://nocturne.org.cn'
  },
  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }],
    [
      'script',
      {
        async: '',
        src: 'https://www.googletagmanager.com/gtag/js?id=G-37MYXEYMJF'
      }
    ],
    [
      'script',
      {},
      `
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());

        gtag('config', 'G-37MYXEYMJF')
      `
    ]
  ]
}

export default config
