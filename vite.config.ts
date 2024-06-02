import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(__dirname, 'packages/assets/svg')],
      // 指定 symbolId 的格式
      symbolId: 'fr-icon-[name]'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./packages', import.meta.url))
    }
  }
})
