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
