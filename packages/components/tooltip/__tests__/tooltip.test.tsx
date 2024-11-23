import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import Tooltip from '../src/tooltip.vue'
import TooltipTrigger from '../src/reference.vue'

import type { VNode } from 'vue'
import type { VueWrapper } from '@vue/test-utils'

const VARIABLE = 'render text'

const mountTooltip = (props = {}, content?: string | VNode) =>
  mount(
    <Tooltip {...props}>
      {{ default: () => VARIABLE }}
      {{ content: () => content }}
    </Tooltip>,
    {
      attachTo: document.body
    }
  ) as VueWrapper<any, any>

let wrapper: ReturnType<typeof mountTooltip>

describe('Tooltip', () => {
  afterEach(() => {
    wrapper?.unmount()
    document.body.innerHTML = ''
  })

  describe('render', () => {
    test('should render correctly', () => {
      wrapper = mountTooltip()
      expect(wrapper.findComponent(TooltipTrigger).text()).toBe(VARIABLE)
    })

    test('content should render according to appendTo', async () => {
      const appendToEl = document.createElement('div')
      appendToEl.id = 'test'
      wrapper = mountTooltip({ appendTo: appendToEl }, 'appendTo')
      const triggerEl = wrapper.findComponent(TooltipTrigger)
      await triggerEl.trigger('mouseenter')
      expect(document.querySelector('#test')?.innerHTML).toContain('appendTo')
    })
  })

  test('should show & hide', async () => {
    wrapper = mountTooltip()
    const triggerEl = wrapper.findComponent(TooltipTrigger)

    vi.useFakeTimers()
    await triggerEl.trigger('mouseenter')
    vi.runAllTimers()
    vi.useRealTimers()
    expect(triggerEl.emitted()).toHaveProperty('show')

    vi.useFakeTimers()
    await triggerEl.trigger('mouseleave')
    vi.runAllTimers()
    vi.useRealTimers()
    expect(triggerEl.emitted()).toHaveProperty('hide')
  })

  test('should be able to update popper content manually', async () => {
    wrapper = mountTooltip()

    const { vm } = wrapper
    expect(vm.updatePopper).toBeDefined()
    vm.updatePopper()
  })
})
