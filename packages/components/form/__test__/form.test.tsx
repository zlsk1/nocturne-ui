import { nextTick, reactive, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Input from '@nocturne-ui/components/input'
import Checkbox from '@nocturne-ui/components/checkbox'
import CheckboxGroup from '@nocturne-ui/components/checkbox/src/checkbox-group.vue'
import Form from '../src/form.vue'
import FormItem from '../src/form-item.vue'
import type { FormInstance } from '../src/form'
import type { FormItemInstance } from '../src/form-item'

describe('Form', () => {
  test('render', () => {
    const wrapper = mount(() => <Form></Form>)
    expect(wrapper.classes()).toContain('n-form')
  })

  test('label-width', () => {
    const wrapper = mount(() => (
      <Form>
        <FormItem label="input" label-width="100px"></FormItem>
      </Form>
    ))
    expect(wrapper.find('.n-form-item__label').attributes('style')).toContain(
      'width: 100px;'
    )
  })

  test('form label-width can overrides form-item label-width', () => {
    const wrapper = mount(() => (
      <Form label-width="200px">
        <FormItem label="input" label-width="100px"></FormItem>
      </Form>
    ))
    expect(wrapper.find('.n-form-item__label').attributes('style')).toContain(
      'width: 200px;'
    )
  })

  describe('label-position', () => {
    test('top', () => {
      const wrapper = mount(() => (
        <Form label-position="top">
          <FormItem label="input"></FormItem>
        </Form>
      ))
      expect(wrapper.find('.n-form-item').classes()).toContain(
        'n-form-item--top'
      )
    })
    test('left', async () => {
      const wrapper = mount(() => (
        <Form label-position="left">
          <FormItem label="input" label-width="100px"></FormItem>
          <FormItem label="input" label-width="200px"></FormItem>
        </Form>
      ))
      await nextTick()
      expect(wrapper.find('.n-form-item__label').attributes('style')).toContain(
        'width: 100px; margin-right: 100px'
      )
    })
    test('right', async () => {
      const wrapper = mount(() => (
        <Form label-position="right">
          <FormItem label="input" label-width="100px"></FormItem>
          <FormItem label="input" label-width="200px"></FormItem>
        </Form>
      ))
      await nextTick()
      expect(wrapper.find('.n-form-item__label').attributes('style')).toContain(
        'width: 100px; margin-left: 100px'
      )
    })
  })

  test('label size', () => {
    const wrapper = mount({
      setup() {
        const form = reactive({
          name: ''
        })
        return () => (
          <div>
            <div>
              <Form model={form} size="small" ref="labelSmall">
                <FormItem>
                  <Input v-model={form.name} />
                </FormItem>
              </Form>
            </div>
          </div>
        )
      }
    })
    expect(wrapper.findComponent(Input).classes()).toContain('n-input--small')
  })

  test('reset field', async () => {
    vi.useFakeTimers()
    const form = reactive({
      name: '',
      address: '',
      type: new Array<string>()
    })

    const wrapper = mount({
      setup() {
        const rules = {
          name: [
            { required: true, message: 'Please input name', trigger: 'blur' }
          ],
          address: [
            {
              required: true,
              message: 'Please input address',
              trigger: 'change'
            }
          ],
          type: [
            {
              type: 'array',
              required: true,
              message: 'Please input type',
              trigger: 'change'
            }
          ]
        }
        return () => (
          <Form ref="form" model={form} rules={rules}>
            <FormItem label="name" prop="name">
              <Input v-model={form.name} ref="fieldName" />
            </FormItem>
            <FormItem label="address" prop="address">
              <Input v-model={form.address} ref="fieldAddr" />
            </FormItem>
            <FormItem label="type" prop="type">
              <CheckboxGroup v-model={form.type}>
                <Checkbox label="type1" value="type1" name="type" />
                <Checkbox label="type2" value="type2" name="type" />
                <Checkbox label="type3" value="type3" name="type" />
                <Checkbox label="type4" value="type4" name="type" />
              </CheckboxGroup>
            </FormItem>
          </Form>
        )
      }
    })

    form.name = 'jack'
    form.address = 'aaaa'
    form.type.push('type1')

    const formRef = wrapper.findComponent({ ref: 'form' }).vm as FormInstance
    formRef.resetField()
    // first await waits for the validation to be dispatched.
    await nextTick()
    // after validation dispatched, test will update `validateStateDebounced` with a 100ms delay.
    // That's why we put this `vi.runAllTimers` here.
    vi.runAllTimers()
    // after timer fired, we should wait for the UI to be updated.
    await nextTick()
    expect(form.name).toBe('')
    expect(form.address).toBe('')
    expect(form.type.length).toBe(0)
    expect(wrapper.findAll('.n-form-item__error')).toHaveLength(0)
    vi.useRealTimers()
  })

  test('clear validate', async () => {
    const wrapper = mount({
      setup() {
        const form = reactive({
          name: '',
          address: '',
          type: []
        })

        const rules = reactive({
          name: [
            { required: true, message: 'Please input name', trigger: 'blur' }
          ],
          address: [
            {
              required: true,
              message: 'Please input address',
              trigger: 'change'
            }
          ],
          type: [
            {
              type: 'array',
              required: true,
              message: 'Please input type',
              trigger: 'change'
            }
          ]
        })

        return () => (
          <Form ref="form" model={form} rules={rules}>
            <FormItem label="name" prop="name" ref="name">
              <Input v-model={form.name} />
            </FormItem>
            <FormItem label="address" prop="address" ref="address">
              <Input v-model={form.address} />
            </FormItem>
            <FormItem label="type" prop="type">
              <CheckboxGroup v-model={form.type}>
                <Checkbox label="type1" value="type1" name="type" />
                <Checkbox label="type2" value="type2" name="type" />
                <Checkbox label="type3" value="type3" name="type" />
                <Checkbox label="type4" value="type4" name="type" />
              </CheckboxGroup>
            </FormItem>
          </Form>
        )
      }
    })

    const form = wrapper.findComponent({ ref: 'form' }).vm as FormInstance
    const nameField = wrapper.findComponent({ ref: 'name' })
      .vm as FormItemInstance
    const addressField = wrapper.findComponent({ ref: 'address' })
      .vm as FormItemInstance
    await form.validate().catch(() => undefined)
    await nextTick()
    expect(nameField.invalidMessage).toBe('Please input name')
    expect(addressField.invalidMessage).toBe('Please input address')
    form.clearValidate(['name'])
    await nextTick()
    expect(nameField.invalidMessage).toBe('')
    expect(addressField.invalidMessage).toBe('Please input address')
    form.clearValidate()
    await nextTick()
    expect(addressField.invalidMessage).toBe('')
  })

  test('scroll to field', () => {
    const wrapper = mount({
      setup() {
        return () => (
          <div>
            <Form ref="form">
              <FormItem prop="name" ref="formItem">
                <Input />
              </FormItem>
            </Form>
          </div>
        )
      }
    })

    const oldScrollIntoView = window.HTMLElement.prototype.scrollIntoView

    const scrollIntoViewMock = vi.fn()
    window.HTMLElement.prototype.scrollIntoView = function () {
      scrollIntoViewMock(this)
    }

    const form = wrapper.findComponent({ ref: 'form' }).vm as FormInstance
    form.scrollToField('name')
    expect(scrollIntoViewMock).toHaveBeenCalled()
    expect(scrollIntoViewMock).toHaveBeenCalledWith(
      wrapper.findComponent({ ref: 'formItem' }).element
    )

    window.HTMLElement.prototype.scrollIntoView = oldScrollIntoView
  })

  test('validate return parameters', async () => {
    const form = reactive({
      name: 'test',
      age: ''
    })

    const wrapper = mount({
      setup() {
        const rules = reactive({
          name: [
            { required: true, message: 'Please input name', trigger: 'blur' }
          ],
          age: [
            { required: true, message: 'Please input age', trigger: 'blur' }
          ]
        })
        return () => (
          <Form
            ref="formRef"
            model={form}
            rules={rules}
            // @ts-expect-error
            onSubmit="return false"
          >
            <FormItem prop="name" label="name">
              <Input v-model={form.name} />
            </FormItem>
            <FormItem prop="age" label="age">
              <Input v-model={form.age} />
            </FormItem>
          </Form>
        )
      }
    })
    const vm = wrapper.vm

    function validate() {
      return (vm.$refs.formRef as FormInstance)
        .validate()
        .then(() => ({ valid: true, fields: undefined }))
        .catch((fields) => ({ valid: false, fields }))
    }

    let res = await validate()
    expect(res.valid).toBe(false)
    expect(Object.keys(res.fields).length).toBe(1)
    form.name = ''
    await nextTick()

    res = await validate()
    expect(res.valid).toBe(false)
    expect(Object.keys(res.fields).length).toBe(2)

    form.name = 'test'
    form.age = 'age'
    await nextTick()
    res = await validate()
    expect(res.valid).toBe(true)
    expect(res.fields).toBe(undefined)
  })

  test('validate promise callback', async () => {
    const form = reactive({
      age: '20'
    })

    const wrapper = mount({
      setup() {
        const rules = ref({
          age: [
            { required: true, message: 'Please input age', trigger: 'change' }
          ]
        })
        return () => (
          <Form ref="formRef" model={form} rules={rules.value}>
            <FormItem ref="age" prop="age" label="age">
              <Input v-model={form.age} />
            </FormItem>
          </Form>
        )
      }
    })

    const fn = vi.fn()

    await (wrapper.vm.$refs.formRef as FormInstance)
      .validate(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            fn('beforeResolve')
            resolve()
          }, 100)
        })
      })
      .finally(() => {
        fn('finally')
      })
      .catch(() => undefined)

    expect(fn.mock.calls.length).toBe(2)
    expect(fn.mock.calls[0][0]).toBe('beforeResolve')
    expect(fn.mock.calls[1][0]).toBe('finally')
  })
})
