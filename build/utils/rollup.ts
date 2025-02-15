import { getPackageDependencies, nuPackage } from '.'
import type { OutputOptions, RollupBuild } from 'rollup'

export function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map((option) => bundle.write(option)))
}

export function formatBundleFilename(
  name: string,
  minify: boolean,
  ext: string
) {
  return `${name}${minify ? '.min' : ''}.${ext}`
}

export const getExternal = (full: boolean = false) => {
  const { dependencies, peerDependencies } = getPackageDependencies(nuPackage)

  // for fine-grained control
  return (id: string) => {
    const packages: string[] = [...peerDependencies]
    if (!full) {
      packages.push('@vue', ...dependencies)
    }

    return [...new Set(packages)].some(
      (pkg) => id === pkg || id.startsWith(`${pkg}/`)
    )
  }
}
