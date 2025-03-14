import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import { triggerCompositeClick } from '@nocturne-ui/tests-utils/composite-click'
import { rAF } from '@nocturne-ui/tests-utils/raf'
import Dialog from '../src/dialog.vue'

describe('Dialog', () => {
  test('render', async () => {
    const visible = ref(true)
    const wrapper = mount(() => (
      <Dialog
        v-model={visible.value}
        title="dialog"
        content="it is dialog"
      ></Dialog>
    ))
    expect(wrapper.find('.n-overlay').exists()).toBeTruthy()
    expect(wrapper.find('.n-dialog__header').text()).toBe('dialog')
    expect(wrapper.find('.n-dialog__content').text()).toBe('it is dialog')
  })

  describe('footer button', () => {
    test('confirmText', () => {
      const visible = ref(true)
      const wrapper = mount(() => (
        <Dialog v-model={visible.value} confirmText="ok"></Dialog>
      ))
      expect(wrapper.find('.n-button--primary').text()).toEqual('ok')
    })

    test('cancelText', () => {
      const visible = ref(true)
      const wrapper = mount(() => (
        <Dialog v-model={visible.value} cancelText="cancel"></Dialog>
      ))
      expect(wrapper.find('.n-button').text()).toEqual('cancel')
    })

    test('showConfirm is false', () => {
      const visible = ref(true)
      const wrapper = mount(() => (
        <Dialog v-model={visible.value} showConfirm={false}></Dialog>
      ))
      expect(wrapper.find('.n-button').text()).toBe('取消')
    })

    test('showCancel is false', () => {
      const visible = ref(true)
      const wrapper = mount(() => (
        <Dialog v-model={visible.value} showCancel={false}></Dialog>
      ))
      expect(wrapper.find('.n-button').text()).toBe('确定')
    })
  })

  describe('custom style/class', () => {
    test('custom width is number', () => {
      const visible = ref(true)
      const wrapper = mount(() => (
        <Dialog v-model={visible.value} width={40}></Dialog>
      ))
      expect(wrapper.find('.n-dialog').attributes('style')).toContain(
        'width: 40%'
      )
    })

    test('custom width is string', () => {
      const visible = ref(true)
      const wrapper = mount(() => (
        <Dialog v-model={visible.value} width="40%"></Dialog>
      ))
      expect(wrapper.find('.n-dialog').attributes('style')).toContain(
        'width: 40%'
      )
    })

    test('custom offsetTop is number', () => {
      const visible = ref(true)
      const wrapper = mount(() => (
        <Dialog v-model={visible.value} offsetTop={20}></Dialog>
      ))
      expect(wrapper.find('.n-dialog').attributes('style')).toContain(
        'top: 20vh'
      )
    })

    test('custom offsetTop is string', () => {
      const visible = ref(true)
      const wrapper = mount(() => (
        <Dialog v-model={visible.value} offsetTop="20%"></Dialog>
      ))
      expect(wrapper.find('.n-dialog').attributes('style')).toContain(
        'top: 20%'
      )
    })

    test('customClass', () => {
      const visible = ref(true)
      const wrapper = mount(() => (
        <Dialog v-model={visible.value} customClass="custom-class"></Dialog>
      ))
      expect(wrapper.find('.n-dialog').classes()).toContain('custom-class')
    })
  })

  test('center', () => {
    const visible = ref(true)
    const wrapper = mount(() => (
      <Dialog v-model={visible.value} center></Dialog>
    ))
    expect(wrapper.find('.n-overlay-dialog').classes()).toContain('is-center')
  })

  describe('event', () => {
    test('open', async () => {
      const visible = ref(false)
      const onOpen = vi.fn()
      const onOpened = vi.fn()
      const wrapper = mount(() => (
        <>
          <div class="show" onClick={() => (visible.value = true)}>
            show dialog
          </div>
          <Dialog
            v-model={visible.value}
            onOpen={onOpen}
            onOpened={onOpened}
          ></Dialog>
        </>
      ))
      await wrapper.find('div.show').trigger('click')
      await rAF()
      expect(onOpen).toBeCalledTimes(1)
      expect(onOpened).toBeCalledTimes(1)
    })
    test('close', async () => {
      const visible = ref(true)
      const onClose = vi.fn()
      const onClosed = vi.fn()
      const wrapper = mount(() => (
        <Dialog
          v-model={visible.value}
          onClose={onClose}
          onClosed={onClosed}
        ></Dialog>
      ))
      const closeBtn = wrapper.find('.n-dialog__close')
      await closeBtn.trigger('click')
      expect(wrapper.emitted()).toHaveProperty('close')
      expect(onClose).toBeCalledTimes(1)
      expect(onClosed).toBeCalledTimes(1)
    })
    test('confirm', async () => {
      const visible = ref(true)
      const onConfirm = vi.fn()
      const wrapper = mount(() => (
        <Dialog v-model={visible.value} onConfirm={onConfirm}></Dialog>
      ))
      const confirmBtn = wrapper.find('.n-button--primary')
      await confirmBtn.trigger('click')
      expect(onConfirm).toBeCalledTimes(1)
    })
    test('cancel', async () => {
      const visible = ref(true)
      const onCancel = vi.fn()
      const wrapper = mount(() => (
        <Dialog v-model={visible.value} onCancel={onCancel}></Dialog>
      ))
      const cancelBtn = wrapper.find('.n-button')
      await cancelBtn.trigger('click')
      expect(onCancel).toBeCalledTimes(1)
    })
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
    const visible = ref(true)
    const wrapper = mount(() => (
      <Dialog v-model={visible.value} showClose={false}></Dialog>
    ))
    expect(wrapper.find('.n-dialog__close').exists()).toBe(false)
  })

  test('maskClass', () => {
    const visible = ref(true)
    const wrapper = mount(() => (
      <Dialog v-model={visible.value} maskerClass="mask-class"></Dialog>
    ))
    expect(wrapper.find('.n-overlay').classes()).toContain('mask-class')
  })

  describe('slots', () => {
    test('slot header', () => {
      const visible = ref(true)
      const wrapper = mount(() => (
        <Dialog v-model={visible.value}>
          {{ header: () => <span class="header">header</span> }}
        </Dialog>
      ))
      expect(wrapper.find('.header').text()).toBe('header')
    })

    test('slot default', () => {
      const visible = ref(true)
      const wrapper = mount(() => (
        <Dialog v-model={visible.value}>{{ default: () => 'default' }}</Dialog>
      ))
      expect(wrapper.find('.n-dialog__content').text()).toBe('default')
    })

    test('slot footer', () => {
      const visible = ref(true)
      const wrapper = mount(() => (
        <Dialog v-model={visible.value}>
          {{ footer: () => <span class="footer">footer</span> }}
        </Dialog>
      ))
      expect(wrapper.find('.footer').text()).toBe('footer')
    })
  })

  // todo: test form in dialog
})
