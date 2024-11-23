import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { POPPER_INJECTION_KEY } from '../src/constants'
import Trigger from '../src/reference.vue'

import type { VueWrapper } from '@vue/test-utils'
import type { PopperTriggerInstance } from '../src/reference'

const VARIABLE = 'text'

const popperInjection = {
  triggerRef: ref(null),
  popperInstanceRef: ref(null),
  contentRef: ref(null)
}

const mountTrigger = (props = {}) =>
  mount(<Trigger {...props}>{VARIABLE}</Trigger>, {
    global: {
      provide: {
        [POPPER_INJECTION_KEY as symbol]: popperInjection
      }
    }
  }) as unknown as VueWrapper<PopperTriggerInstance>

describe('Popper Trigger', () => {
  let wrapper: VueWrapper<PopperTriggerInstance>

  afterEach(() => {
    popperInjection.triggerRef.value = null
  })
  describe('rendering', () => {
    it('should be able to render with children', async () => {
      wrapper = mountTrigger()
      await nextTick()

      expect(popperInjection.triggerRef.value).not.toBeNull()
      expect(wrapper.text()).toEqual(VARIABLE)
    })

    it('should be able to render for virtual ref', async () => {
      wrapper = mountTrigger({
        virtualTriggering: true
      })

      await nextTick()

      expect(wrapper.text()).not.toEqual(VARIABLE)

      const virtualRef = document.createElement('div')
      await wrapper.setProps({
        virtualRef
      })

      expect(popperInjection.triggerRef.value).toStrictEqual
    })
  })

  describe('can attach handlers', () => {
    it('should be able to attach handlers to the trigger', async () => {
      const onClick = vi.fn()
      const virtualRef = document.createElement('div')
      wrapper = mountTrigger({
        onClick,
        virtualTriggering: true,
        virtualRef
      })
      await nextTick()
      expect(onClick).not.toHaveBeenCalled()
      const evt = new MouseEvent('click')
      virtualRef.dispatchEvent(evt)
      await nextTick()
      expect(onClick).toHaveBeenCalled()
    })
  })
})
