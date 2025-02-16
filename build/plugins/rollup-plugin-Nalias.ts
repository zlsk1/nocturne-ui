import type { Plugin } from 'rollup'

export function NAlias(): Plugin {
  const themeChalk = 'theme-chalk'
  const sourceThemeChalk = `@nocturne-ui/${themeChalk}`
  const bundleThemeChalk = `nocturne-ui/${themeChalk}`

  return {
    name: 'nocturn-ui-alias-plugin',
    resolveId(id) {
      if (!id.startsWith(sourceThemeChalk)) return
      return {
        id: id.replaceAll(sourceThemeChalk, bundleThemeChalk),
        external: 'absolute'
      }
    }
  }
}
