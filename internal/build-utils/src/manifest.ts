import glob from 'fast-glob'
import { readJson, writeJSON } from 'fs-extra'
import { projRoot } from './path'
import type { ProjectManifest } from '@pnpm/types'

export const getWorkspacePath = async () => {
  const pkgPaths = await glob(['**/package.json', '!**/node_modules'], {
    cwd: projRoot,
    absolute: true,
    onlyFiles: true
  })

  return pkgPaths
}

export const findWorkspace = async () => {
  const pkgPaths = await getWorkspacePath()

  const pkgs = Object.create(null)

  for (const path of pkgPaths) {
    const manifest = await readJson(path, {
      encoding: 'utf8'
    })
    pkgs[manifest.name!] = {
      path,
      manifest
    }
  }

  return pkgs as Record<string, { path: string; manifest: ProjectManifest }>
}

export const writeProjectManifest = async (
  pkgName: string,
  manifest: ProjectManifest & { gitHead?: string }
) => {
  const workspace = await findWorkspace()
  const pkg = workspace[pkgName]

  writeJSON(
    pkg.path,
    { ...pkg.manifest, ...manifest },
    { encoding: 'utf8', spaces: 2 }
  )
}
