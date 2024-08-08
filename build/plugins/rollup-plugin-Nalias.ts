import type { Plugin } from 'rollup'

export function NAlias(): Plugin {
  const themeChalk = 'theme-chalk'
  const sourceThemeChalk = `@/${themeChalk}` as const
  const bundleThemeChalk = `nocturne-ui/${themeChalk}` as const

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
