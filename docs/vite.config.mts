import path from 'path'
import { defineConfig } from 'vite'
import { autoImportDemo } from './.vitepress/plugins/demo-import'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  resolve: {
    alias: [
      { find: /^@docs\/(.+)/, replacement: path.resolve(__dirname, '$1') }
    ]
  },
  plugins: [
    autoImportDemo(),
    UnoCSS()
  ]
})
