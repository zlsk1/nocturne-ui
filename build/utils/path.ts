import { fileURLToPath } from 'url'
import { resolve } from 'path'

export const projRoot = fileURLToPath(new URL('../../', import.meta.url))
export const distRoot = resolve(projRoot, 'dist')
/** /packages */
export const pkgRoot = resolve(projRoot, 'packages')
/** /dist/nocturne-ui */
export const pkgOutput = resolve(distRoot, 'nocturne-ui')
export const buildRoot = resolve(pkgRoot, 'build')
export const nuRoot = resolve(pkgRoot, 'nocturne-ui')
export const nuPackage = resolve(pkgRoot, 'nocturne-ui/package.json')

export const excludeFiles = (files: string[]) => {
  const excludes = ['node_modules', 'dist', 'gulpfile', 'test']
  return files.filter((path) => !excludes.some((exP) => path.includes(exP)))
}

/** used for type generator */
export const pathRewriter = () => {
  return (id: string) => {
    id = id.replaceAll(`@nocturne-ui/theme-chalk`, `nocturne-ui/theme-chalk`)
    id = id.replaceAll(`@nocturne-ui/`, `nocturne-ui/es/`)
    return id
  }
}

export const camelCase = (str: string) => {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''))
}

/**
 * @example
 * upperFirst('noc') => Noc
 */
export const upperFirst = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
