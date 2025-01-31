import { computed, defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { POPPER_INJECTION_KEY } from '../src/constants'
import Content from '../src/content.vue'

import type { VueWrapper } from '@vue/test-utils'
import type { PopperContentInstance } from '../src/content'

const VARIABLE = 'text'
const popperInjection = {
  triggerRef: ref(),
  popperInstanceRef: ref(),
  contentRef: ref(),
  role: computed(() => 'test-role')
}

const TestComponent = defineComponent({
  setup() {
    return {
      contentRef: ref()
    }
  },
  render() {
    return (
      <Content ref="contentRef" {...this.$attrs}>
        {VARIABLE}
      </Content>
    )
  }
})

const mountContent = (props = {}) =>
  mount(<Content {...props}>{VARIABLE}</Content>, {
    global: {
      provide: {
        [POPPER_INJECTION_KEY as symbol]: popperInjection
      }
    }
  }) as unknown as VueWrapper<PopperContentInstance>

const mountWrappedContent = (props = {}) =>
  mount(<TestComponent {...props} />, {
    global: {
      provide: {
        [POPPER_INJECTION_KEY as symbol]: popperInjection
      }
    }
  }) as unknown as typeof TestComponent

describe('Popper Content', () => {
  describe('with triggerRef provided', () => {
    const triggerKls = 'n-popper__trigger'
    let wrapper: VueWrapper<PopperContentInstance>

    beforeEach(() => {
      const trigger = document.createElement('div')
      trigger.className = triggerKls

      popperInjection.triggerRef.value = trigger
    })

    afterEach(() => {
      popperInjection.triggerRef.value = null
      wrapper?.unmount()
    })

    it('should mount the component correctly and set popperInstance correctly', async () => {
      wrapper = mountContent()
      await nextTick()

      expect(popperInjection.triggerRef).toBeDefined()
      expect(wrapper.html()).toContain(VARIABLE)
      expect(wrapper.classes()).toEqual(['n-popper'])
      expect(wrapper.vm.contentStyle).toHaveLength(3)
      expect(wrapper.vm.contentStyle[0]).toHaveProperty('zIndex')
      expect(wrapper.vm.contentStyle[1]).toEqual(
        expect.objectContaining({
          position: 'absolute',
          top: '0',
          left: '0'
        })
      )
      expect(wrapper.vm.contentStyle[2]).toEqual({})
    })

    it('should be able to be pure', async () => {
      wrapper = mountContent()
      await nextTick()

      await wrapper.setProps({
        pure: true
      })

      expect(wrapper.classes()).toEqual(['n-popper', 'is-pure'])
    })

    it('should be able to set customized styles', async () => {
      wrapper = mountContent()
      await nextTick()

      const style = {
        position: 'absolute'
      }
      await wrapper.setProps({
        // @ts-ignore
        popperStyle: style
      })

      expect(wrapper.vm.contentStyle[2]).toEqual(style)
    })

    it('should be able to emit events', async () => {
      wrapper = mountContent()
      await nextTick()

      expect(wrapper.emitted()).not.toHaveProperty('mouseenter')
      expect(wrapper.emitted()).not.toHaveProperty('mouseleave')

      await wrapper.trigger('mouseenter')
      expect(wrapper.emitted()).toHaveProperty('mouseenter')

      await wrapper.trigger('mouseleave')
      expect(wrapper.emitted()).toHaveProperty('mouseleave')
    })

    describe('instantiate popper instance', () => {
      it('should be able to update the current instance', async () => {
        await nextTick()

        vi.spyOn(
          popperInjection.triggerRef.value,
          'getBoundingClientRect'
        ).mockImplementation(() => ({
          bottom: 1,
          height: 0,
          left: 0,
          right: 0,
          top: 0,
          width: 0
        }))

        wrapper.vm.$forceUpdate()
      })

      it('should be able to update the reference node', async () => {
        const w = mountWrappedContent()
        await nextTick()

        const { contentRef } = w.vm
        // const oldInstance = contentRef.popperInstanceRef

        const newRef = document.createElement('div')
        newRef.classList.add('new-ref')

        popperInjection.triggerRef.value = newRef
        await nextTick()

        popperInjection.triggerRef.value = undefined

        await nextTick()

        expect(contentRef.popperInstanceRef).toBeUndefined()
      })
    })
  })
})
