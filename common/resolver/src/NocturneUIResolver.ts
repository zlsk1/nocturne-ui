import type {
  ComponentInfo,
  ComponentResolver,
  SideEffectsInfo
} from 'unplugin-vue-components'

export interface Options {
  importStyle?: 'css' | 'sass'
  exclude?: RegExp
  directives?: boolean
  format?: 'esm' | 'cjs'
}

export const defaultOptons: Options = {
  importStyle: 'css',
  exclude: undefined,
  directives: true,
  format: 'esm'
}

function kebabCase(key: string) {
  const result = key.replace(/([A-Z])/g, ' $1').trim()
  return result.split(' ').join('-').toLowerCase()
}

function resolveStyle(
  name: string,
  options: Options
): SideEffectsInfo | undefined {
  const { importStyle } = options

  if (importStyle === 'sass') {
    return [
      'nocturne-ui/theme-chalk/src/base.scss',
      'nocturne-ui/theme-chalk/src/dark/css-vars.scss',
      `nocturne-ui/theme-chalk/src/${name.split('-')[1]}.scss`
    ]
  } else if (importStyle === 'css') {
    return [
      'nocturne-ui/theme-chalk/base.css',
      'nocturne-ui/theme-chalk/dark/css-vars.css',
      `nocturne-ui/theme-chalk/${name}.css`
    ]
  }
}

function resolveComponent(
  name: string,
  options: Options
): ComponentInfo | undefined {
  if (options.exclude && name.match(options.exclude)) return

  if (!name.match(/^N[A-Z]/)) return

  if (name.match(/^NIcon.+/)) {
    return {
      name: name.replace(/^NIcon/, ''),
      from: '@remixicon/vue'
    }
  }

  const _name = kebabCase(name)

  return {
    name,
    from: options.format === 'esm' ? 'nocturne-ui/es' : 'nocturne-ui/cjs',
    sideEffects: resolveStyle(_name, options)
  }
}

function resolveDirective(
  name: string,
  options: Options
): ComponentInfo | undefined {
  if (!options.directives) return

  const directives: Record<string, { importName: string; styleName: string }> =
    {
      Loading: { importName: 'NLoadingDirective', styleName: 'n-loading' }
    }

  const directive = directives[name]

  return {
    name: directive.importName,
    from: options.format === 'esm' ? 'nocturne-ui/es' : 'nocturne-ui/cjs',
    sideEffects: resolveStyle(directive.styleName, options)
  }
}

export function NocturneUIResolver(options: Options = {}): ComponentResolver[] {
  let mergeOptions: Options

  function resolveOptions() {
    if (mergeOptions) return mergeOptions
    mergeOptions = {
      ...defaultOptons,
      ...options
    }
    return mergeOptions
  }

  return [
    {
      type: 'component',
      resolve: (name: string) => {
        const options = resolveOptions()
        return resolveComponent(name, options)
      }
    },
    {
      type: 'directive',
      resolve: (name: string) => {
        const options = resolveOptions()
        return resolveDirective(name, options)
      }
    }
  ]
}
