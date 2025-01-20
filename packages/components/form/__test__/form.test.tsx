import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Form from '../src/form.vue'
import FormItem from '../src/form-item.vue'

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
      expect(
        wrapper.findAll('.n-form-item__label')[0].attributes('style')
      ).toContain('margin-right: 100px')
    })
    test('right', async () => {
      const wrapper = mount(() => (
        <Form label-position="right">
          <FormItem label="input" label-width="100px"></FormItem>
          <FormItem label="input" label-width="200px"></FormItem>
        </Form>
      ))
      await nextTick()
      expect(
        wrapper.findAll('.n-form-item__label')[0].attributes('style')
      ).toContain('margin-left: 100px')
    })
  })
})
