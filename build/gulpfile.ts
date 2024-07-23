import path from 'path'
import { copyFile, cp, mkdir } from 'fs/promises'
import { parallel, series } from 'gulp'
import {
  projRoot,
  pkgRoot,
  pkgOutput,
  distRoot
} from './utils'
import { run, withTaskName } from './utils'
import { buildConfig } from './build-info'
import { buildModules } from './tasks/modules'
import { buildFullBundle } from './tasks/full-bundle'
import { generateTypesDefinitions } from './tasks/types-definitions'
import type { TaskFunction } from 'gulp'
import type { Module } from './build-info'

const copyFiles = () => {
  return Promise.all([
    copyFile(path.resolve(pkgRoot, 'package.json'), path.resolve(pkgOutput, 'package.json')),
    copyFile(path.resolve(projRoot, 'README.md'), path.resolve(pkgOutput, 'README.md')),
    copyFile(path.resolve(projRoot, 'global.d.ts'), path.resolve(pkgOutput, 'global.d.ts'))
  ])
}

export const copyTypesDefinitions: TaskFunction = (done) => {
  const src = path.resolve(distRoot, 'types', 'packages')
  const copyTypes = (module: Module) =>
    withTaskName(`copyTypes:${module}`, () =>
      cp(src, buildConfig[module].output.path, { recursive: true })
    )

  return parallel(copyTypes('esm'), copyTypes('cjs'))(done)
}

export const copyFullStyle = async() => {
  await mkdir(path.resolve(pkgOutput, 'dist'), { recursive: true })
  await copyFile(
    path.resolve(pkgOutput, 'theme-chalk/index.css'),
    path.resolve(pkgOutput, 'dist/index.css')
  )
}

export default series(
  withTaskName('clean', () => run('pnpm run clean:dist')),
  withTaskName('createOutput', () => mkdir(pkgOutput, { recursive: true })),

  parallel(
    buildModules,
    buildFullBundle,
    generateTypesDefinitions,
    series(
      withTaskName('buildThemeChalk', () =>
        run('pnpm run -C packages/theme-chalk build')
      ),
      copyFullStyle
    )
  ),

  parallel(copyTypesDefinitions, copyFiles)
)
