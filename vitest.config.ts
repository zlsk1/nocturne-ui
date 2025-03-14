import path from 'path'
import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [Vue(), VueJsx()],
  resolve: {
    alias: {
      '@nocturne-ui': path.resolve(__dirname, 'packages')
    }
  },
  test: {
    clearMocks: true,
    environment: 'jsdom',
    reporters: 'default',
    testTransformMode: {
      web: ['*.{ts,tsx}']
    },
    coverage: {
      reporter: ['json', 'text', 'json-summary'],
      include: ['packages'],
      exclude: ['packages/components/*/style/**', 'packages/locale/lang/**'],
      reportOnFailure: true
    }
  }
})
