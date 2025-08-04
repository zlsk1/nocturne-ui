export const getPackageManifest = (path: string) => {
  return require(path)
}

export const getPackageDependencies = (path: string) => {
  const manifest = getPackageManifest(path)

  return {
    dependencies: Object.keys(manifest.dependencies),
    peerDependencies: Object.keys(manifest.peerDependencies ?? [])
  }
}

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
