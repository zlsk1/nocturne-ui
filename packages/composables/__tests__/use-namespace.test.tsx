import { computed, defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { NAMESPACE_INJECTION_KEY, useNamespace } from '../use-namespace'

describe('use-namespace', () => {
  test('override ns', () => {
    const override = 'el'
    const { vm } = mount(
      defineComponent({
        setup(_, { expose }) {
          const { ns } = useNamespace(
            'ns',
            computed(() => override)
          )
          expose({
            ns
          })
        },
        template: '<div />'
      }),
      {
        global: {
          provide: {
            [NAMESPACE_INJECTION_KEY as symbol]: 'n'
          }
        }
      }
    )
    expect((vm as any).ns).toBe(override)
  })

  test('bem', () => {
    const ns = useNamespace('dom')
    const wrapper = mount(() => (
      <div
        id="test"
        class={[
          ns.b(),
          ns.b('body'),
          ns.e('header'),
          ns.m('full'),
          ns.be('body', 'header'),
          ns.em('header', 'full'),
          ns.bem('container', 'content', 'active'),
          ns.is('focus'),
          ns.e(),
          ns.m(),
          ns.be(),
          ns.em(),
          ns.bem(),
          ns.is('hover', undefined),
          ns.is('clicked', false)
        ]}
      >
        text
      </div>
    ))
    expect(wrapper.find('#test').classes()).toEqual([
      'n-dom',
      'n-dom-body',
      'n-dom__header',
      'n-dom--full',
      'n-dom-body__header',
      'n-dom__header--full',
      'n-dom-container__content--active',
      'is-focus'
    ])
  })
})
