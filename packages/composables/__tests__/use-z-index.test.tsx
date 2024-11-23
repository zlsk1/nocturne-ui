import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { ZINDEX_INJECTION_KEY, useZIndex } from '../use-z-index'

describe('use-z-index', () => {
  test('z-index', () => {
    const wrapper = mount(
      defineComponent({
        setup() {
          const { initialZIndex, currentZIndex, nextZIndex } = useZIndex()
          return { initialZIndex, currentZIndex, nextZIndex: nextZIndex() }
        },
        template: '<div />'
      })
    )
    expect(wrapper.vm.initialZIndex).toBe(2000)
    expect(wrapper.vm.currentZIndex).toBe(2001)
    expect(wrapper.vm.nextZIndex).toBe(2001)
  })

  test('inject value', () => {
    const wrapper = mount(
      defineComponent({
        setup() {
          const { initialZIndex, currentZIndex, nextZIndex } = useZIndex()
          return { initialZIndex, currentZIndex, nextZIndex: nextZIndex() }
        },
        template: '<div />'
      }),
      {
        global: {
          provide: {
            [ZINDEX_INJECTION_KEY as symbol]: 3000
          }
        }
      }
    )
    expect(wrapper.vm.initialZIndex).toBe(3000)
    expect(wrapper.vm.currentZIndex).toBe(3002)
    expect(wrapper.vm.nextZIndex).toBe(3002)
  })
})
