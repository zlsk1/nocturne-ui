import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import PopperTrigger from '@nocturne-ui/components/popper/src/trigger.vue'
import { rAF } from '@nocturne-ui/test-utils/raf'
import Tooltip from '../src/tooltip.vue'

import type { VNode } from 'vue'

const VARIABLE = 'aatrox'

describe('NTooltip', () => {
  const createComponent = (props = {}, content: string | VNode = '') =>
    mount(
      <Tooltip
        {...props}
        v-slots={{
          default: () => VARIABLE,
          content: () => content
        }}
      />,
      {
        attachTo: document.body
      }
    )
  let wrapper: ReturnType<typeof createComponent>
  const findTrigger = () => wrapper.findComponent(PopperTrigger)

  afterEach(() => {
    wrapper?.unmount()
    document.body.innerHTML = ''
  })

  describe('rendering', () => {
    it('should render correctly', async () => {
      wrapper = createComponent()
      await nextTick()
      expect(findTrigger().text()).toContain(VARIABLE)
    })
    it('content should teleport according appendTo', async () => {
      const el = document.createElement('div')
      el.id = 'test'
      document.body.appendChild(el)
      wrapper = createComponent({ appendTo: '#test' }, 'test appendTo props')
      await nextTick()
      const trigger$ = findTrigger()
      const triggerEl = trigger$.find('.n-tooltip__trigger')
      await triggerEl.trigger('mouseenter')
      expect(document.querySelector('#test')?.innerHTML).toContain(
        'test appendTo props'
      )
    })
  })

  describe('functionality', () => {
    const content = 'Test content'

    it('should be able to update popper content manually', async () => {
      wrapper = createComponent()
      await nextTick()

      const { vm } = wrapper
      expect(vm.updatePopper).toBeDefined()
      // @ts-ignore
      vm.updatePopper()
    })

    it('should be able to open & close tooltip content', async () => {
      wrapper = createComponent({}, content)
      await nextTick()

      const trigger$ = findTrigger()
      const triggerEl = trigger$.find('.n-tooltip__trigger')

      vi.useFakeTimers()
      await triggerEl.trigger('mouseenter')
      vi.runAllTimers()
      vi.useRealTimers()
      await rAF()

      expect(wrapper.emitted()).toHaveProperty('show')

      vi.useFakeTimers()
      await triggerEl.trigger('mouseleave') // dispatches a timer with 200ms timeout.
      vi.runAllTimers()
      vi.useRealTimers()
      await rAF()

      expect(wrapper.emitted()).toHaveProperty('hide')
    })

    it('should be able to toggle visibility of tooltip content', async () => {
      wrapper = createComponent(
        {
          trigger: 'click'
        },
        content
      )
      await nextTick()

      const trigger$ = findTrigger()
      const triggerEl = trigger$.find('.n-tooltip__trigger')

      vi.useFakeTimers()
      await triggerEl.trigger('click')
      vi.runAllTimers()
      vi.useRealTimers()
      await rAF()
      expect(wrapper.emitted()).toHaveProperty('show')

      vi.useFakeTimers()
      await triggerEl.trigger('click')
      vi.runAllTimers()
      vi.useRealTimers()
      await rAF()
      expect(wrapper.emitted()).toHaveProperty('hide')
    })
  })
})
