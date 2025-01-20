import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { triggerCompositeClick } from '@/tests-utils/composite-click'
import Dialog from '../src/dialog.vue'

describe('Dialog', () => {
  test('render', async () => {
    const wrapper = mount(() => (
      <Dialog title="dialog" content="it is dialog"></Dialog>
    ))
    expect(wrapper.find('.n-overlay').exists()).toBeTruthy()
    expect(wrapper.find('.n-dialog').exists()).toBeTruthy()
    expect(wrapper.find('.n-dialog__footer').exists()).toBeTruthy()
    expect(wrapper.find('.n-dialog__header').text()).toBe('dialog')
    expect(wrapper.find('.n-dialog__content').text()).toBe('it is dialog')
  })

  describe('footer button', () => {
    test('confirmText', () => {
      const wrapper = mount(() => <Dialog confirmText="ok"></Dialog>)
      expect(
        wrapper.find('.n-dialog__footer button:nth-child(2)').text()
      ).toEqual('ok')
    })

    test('cancelText', () => {
      const wrapper = mount(() => <Dialog cancelText="cancel"></Dialog>)
      expect(
        wrapper.find('.n-dialog__footer button:nth-child(1)').text()
      ).toEqual('cancel')
    })

    test('showConfirm is false', () => {
      const wrapper = mount(() => <Dialog showConfirm={false}></Dialog>)
      expect(wrapper.find('.n-button').text()).toBe('取消')
    })

    test('showCancel is false', () => {
      const wrapper = mount(() => <Dialog showCancel={false}></Dialog>)
      expect(wrapper.find('.n-button').text()).toBe('确定')
    })
  })

  describe('custom style/class', () => {
    test('custom width is number', () => {
      const wrapper = mount(() => <Dialog width={40}></Dialog>)
      expect(wrapper.find('.n-dialog').attributes('style')).toContain(
        'width: 40%'
      )
    })

    test('custom width is string', () => {
      const wrapper = mount(() => <Dialog width="40%"></Dialog>)
      expect(wrapper.find('.n-dialog').attributes('style')).toContain(
        'width: 40%'
      )
    })

    test('custom offsetTop is number', () => {
      const wrapper = mount(() => <Dialog offsetTop={20}></Dialog>)
      expect(wrapper.find('.n-dialog').attributes('style')).toContain(
        'margin: 20vh auto auto'
      )
    })

    test('custom offsetTop is string', () => {
      const wrapper = mount(() => <Dialog offsetTop="20%"></Dialog>)
      expect(wrapper.find('.n-dialog').attributes('style')).toContain(
        'margin: 20% auto auto'
      )
    })

    test('customClass', () => {
      const wrapper = mount(() => <Dialog customClass="custom-class"></Dialog>)
      expect(wrapper.find('.n-dialog').classes()).toContain('custom-class')
    })
  })

  test('center', () => {
    const wrapper = mount(() => <Dialog center></Dialog>)
    expect(wrapper.find('.n-dialog').classes()).toContain('is-center')
  })

  test('callback', async () => {
    const callbackType = ref('')
    const callback = (action: 'confirm' | 'cancel') => {
      callbackType.value = action
    }

    const wrapper = mount(() => <Dialog callback={callback}></Dialog>)

    const buttons = wrapper.findAll('.n-button')
    await buttons[0].trigger('click')
    expect(callbackType.value).toBe('cancel')

    await buttons[1].trigger('click')
    expect(callbackType.value).toBe('confirm')
  })

  test('beforeClose', async () => {
    const visible = ref(true)
    const beforeClose = (success: () => void) => {
      success()
      expect(visible.value).toBe(false)
    }

    const wrapper = mount(() => (
      <Dialog v-model={visible.value} beforeClose={beforeClose}></Dialog>
    ))
    const closeBtn = wrapper.find('.n-dialog__close')
    await closeBtn.trigger('click')
  })

  test('clickMasker behavior', async () => {
    const visible = ref(true)
    const clickMaskerToClose = ref(false)

    const wrapper = mount(() => (
      <Dialog
        v-model={visible.value}
        clickMaskerToClose={clickMaskerToClose.value}
      ></Dialog>
    ))

    const maskerEl = wrapper.find('.n-overlay-dialog')
    expect(maskerEl.exists()).toBe(true)
    expect(wrapper.find('.n-overlay').exists()).toBe(true)
    await triggerCompositeClick(maskerEl)
    expect(visible.value).toBe(true)

    clickMaskerToClose.value = true
    await triggerCompositeClick(maskerEl)
    expect(visible.value).toBe(false)
  })

  test('click closeBtn', async () => {
    const visible = ref(true)
    const wrapper = mount(() => <Dialog v-model={visible.value}></Dialog>)

    const closeBtn = wrapper.find('.n-dialog__close')
    await closeBtn.trigger('click')
    expect(visible.value).toBe(false)
  })

  test('showClose is false', () => {
    const wrapper = mount(() => <Dialog showClose={false}></Dialog>)
    expect(wrapper.find('.n-dialog__close').exists()).toBe(false)
  })

  // test('maskClass', () => {
  //   const wrapper = mount(() => <Dialog maskerClass="mask-class"></Dialog>)
  //   expect(wrapper.find('.n-overlay').classes()).toContain('mask-class')
  // })

  describe('slots', () => {
    test('slot header', () => {
      const wrapper = mount(() => (
        <Dialog>{{ header: () => <span class="header">header</span> }}</Dialog>
      ))
      expect(wrapper.find('.header').text()).toBe('header')
    })

    test('slot default', () => {
      const wrapper = mount(() => (
        <Dialog>{{ default: () => 'default' }}</Dialog>
      ))
      expect(wrapper.find('.n-dialog__content').text()).toBe('default')
    })

    test('slot footer', () => {
      const wrapper = mount(() => (
        <Dialog>{{ footer: () => <span class="footer">footer</span> }}</Dialog>
      ))
      expect(wrapper.find('.footer').text()).toBe('footer')
    })
  })
})
