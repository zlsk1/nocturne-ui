import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { RiCloseLine as Close } from '@remixicon/vue'
import Drawer from '../src/drawer.vue'
import { drawerPlacement } from '../src/drawer'
import { triggerCompositeClick } from '@/tests-utils/composite-click'

describe('Drawer', () => {
  test('render', () => {
    const wrapper = mount(() => <Drawer modelValue={true}></Drawer>)
    expect(wrapper.find('.n-overlay').exists()).toBeTruthy()
    expect(wrapper.find('.n-drawer').exists()).toBeTruthy()
    expect(wrapper.find('.n-drawer__close').exists()).toBeTruthy()
  })

  test('placement', () => {
    drawerPlacement.forEach((placement) => {
      const wrapper = mount(() => (
        <Drawer modelValue={true} placement={placement}></Drawer>
      ))
      expect(wrapper.find('.n-drawer').classes()).toContain(`is-${placement}`)
    })
  })

  test('hide close', () => {
    const wrapper = mount(<Drawer modelValue={true} showClose={false}></Drawer>)
    expect(wrapper.findComponent(Close).exists()).not.toBeTruthy()
  })

  describe('size', () => {
    describe('size value while placement = right | left', () => {
      test('number', () => {
        const wrapper = mount(
          <Drawer modelValue={true} size={40} placement="left"></Drawer>
        )
        expect(wrapper.find('.n-drawer').attributes('style')).toContain(
          'width: 40%'
        )
      })
      test('string', () => {
        const wrapper = mount(
          <Drawer modelValue={true} size="40%" placement="right"></Drawer>
        )
        expect(wrapper.find('.n-drawer').attributes('style')).toContain(
          'width: 40%'
        )
      })
    })

    describe('size value while placement = top | bottom', () => {
      test('number', () => {
        const wrapper = mount(
          <Drawer modelValue={true} size={40} placement="bottom"></Drawer>
        )
        expect(wrapper.find('.n-drawer').attributes('style')).toContain(
          'height: 40%'
        )
      })
      test('string', () => {
        const wrapper = mount(
          <Drawer modelValue={true} size="40%" placement="top"></Drawer>
        )
        expect(wrapper.find('.n-drawer').attributes('style')).toContain(
          'height: 40%'
        )
      })
    })
  })

  test('clickMasker behavior', async () => {
    const visible = ref(true)
    const clickMaskerToClose = ref(false)

    const wrapper = mount(() => (
      <Drawer
        v-model={visible.value}
        clickMaskerToClose={clickMaskerToClose.value}
      ></Drawer>
    ))

    const maskerEl = wrapper.find('.n-overlay-drawer')
    expect(maskerEl.exists()).toBe(true)
    expect(wrapper.find('.n-overlay').exists()).toBe(true)
    await triggerCompositeClick(maskerEl)
    expect(visible.value).toBe(true)

    clickMaskerToClose.value = true
    await triggerCompositeClick(maskerEl)
    expect(visible.value).toBe(false)
  })

  test('beforeClose', async () => {
    const visible = ref(true)
    const beforeClose = (success: () => void) => {
      success()
      expect(visible.value).toBe(false)
    }

    const wrapper = mount(() => (
      <Drawer v-model={visible.value} beforeClose={beforeClose}></Drawer>
    ))
    const closeBtn = wrapper.find('.n-drawer__close')
    await closeBtn.trigger('click')
  })
})
