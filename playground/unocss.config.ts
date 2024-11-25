import { defineConfig, presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  presets: [presetUno(), presetAttributify()],
  content: {
    pipeline: {
      include: [`${__dirname}/**/*`],
      exclude: [`${__dirname}/node_modules/**/*`]
    }
  },
  theme: {}
})
