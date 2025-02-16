import { nextTick, reactive, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import Form from '@nocturne-ui/components/form/src/form.vue'
import FormItem from '@nocturne-ui/components/form/src/form-item.vue'
import Checkbox from '../src/checkbox.vue'
import CheckboxGroup from '../src/checkbox-group.vue'
import type { FormInstance } from '@nocturne-ui/components/form'
import type { CheckModelValueType } from '../src/checkbox'
import type { VueWrapper } from '@vue/test-utils'

describe('Checkbox', () => {
  test('render', () => {
    const wrapper = mount(() => <Checkbox>checkbox 1</Checkbox>)
    expect(wrapper.find('.n-checkbox').exists()).toBeTruthy()
    expect(wrapper.find('.n-checkbox').text()).toContain('checkbox 1')
  })

  test('disabled', async () => {
    let value = ''
    const wrapper = mount(() => (
      <Checkbox
        disabled
        value="checkbox 1"
        onChange={(val) => (value = val as string)}
      >
        checkbox 1
      </Checkbox>
    ))
    expect(wrapper.find('.n-checkbox').classes()).toContain('is-disabled')
    await wrapper.trigger('click')
    expect(value).toBe('')
  })

  test('size', () => {
    const wrapper = mount(() => <Checkbox size="small">checkbox 1</Checkbox>)
    expect(wrapper.find('.n-checkbox--small').exists()).toBeTruthy()
  })

  test('change event', async () => {
    const value = ref(false)
    const value1 = ref()
    const onChange = (val: CheckModelValueType) => (value1.value = val)
    const wrapper = mount(
      () => (
        <Checkbox v-model={value.value} onChange={onChange}>
          checkbox 1
        </Checkbox>
      ),
      { attachTo: document.body }
    )
    await nextTick()
    await wrapper.trigger('click')
    expect(value1.value).toBe(true)
  })

  test('checked', () => {
    const wrapper = mount(() => <Checkbox checked>1</Checkbox>)
    expect(wrapper.find('.is-checked').exists()).toBe(true)
  })

  test('trueValue or falseValue is correctly', async () => {
    const value = ref()
    const wrapper = mount(
      () => (
        <Checkbox
          size="small"
          trueValue={1}
          falseValue={0}
          onChange={(val) => (value.value = val)}
        >
          checkbox 1
        </Checkbox>
      ),
      { attachTo: document.body }
    )
    await wrapper.trigger('click')
    expect(value.value).toBe(1)
    await wrapper.trigger('click')
    expect(value.value).toBe(0)
  })

  test('indeterminate', async () => {
    const wrapper = mount(() => <Checkbox indeterminate>checkbox 1</Checkbox>)
    expect(wrapper.find('.is-indeterminate').exists()).toBe(true)
  })
})

describe('Checkbox Group', () => {
  test('render', () => {
    const wrapper = mount(() => (
      <CheckboxGroup>
        <Checkbox>1</Checkbox>
        <Checkbox>2</Checkbox>
      </CheckboxGroup>
    ))
    expect(wrapper.find('.n-checkbox-group'))
    expect(wrapper.findAll('.n-checkbox')).length(2)
  })

  test('max & min checked item', async () => {
    const value = ref([1, 2, 3])
    const wrapper = mount(() => (
      <CheckboxGroup v-model={value.value} max={2} min={1}>
        <Checkbox value={1}>1</Checkbox>
        <Checkbox value={2}>2</Checkbox>
        <Checkbox value={3}>3</Checkbox>
      </CheckboxGroup>
    ))
    const checkboxs = wrapper.findAll('.n-checkbox')
    expect(checkboxs[2].classes()).toContain('is-checked')
    await checkboxs[1].trigger('click')
    expect(checkboxs[1].classes()).toContain('is-checked')
  })

  test('size', async () => {
    const wrapper = mount(() => (
      <CheckboxGroup size="large">
        <Checkbox></Checkbox>
        <Checkbox></Checkbox>
      </CheckboxGroup>
    ))
    const checkboxs = wrapper.findAll('.n-checkbox')
    expect(checkboxs[0].classes()).toContain('n-checkbox--large')
    expect(checkboxs[1].classes()).toContain('n-checkbox--large')
  })

  test('label with no value', async () => {
    const value = ref(['1'])
    const wrapper = mount(() => (
      <CheckboxGroup v-model={value.value}>
        <Checkbox label="1"></Checkbox>
        <Checkbox label="2"></Checkbox>
      </CheckboxGroup>
    ))
    const checkboxs = wrapper.findAll('.n-checkbox')
    expect(checkboxs[0].text()).toBe('1')
    expect(checkboxs[0].classes()).toContain('is-checked')
    expect(checkboxs[1].text()).toBe('2')
  })

  describe('used together with the form component', () => {
    test('form size', async () => {
      const wrapper = mount(() => (
        <Form size="large">
          <CheckboxGroup size="small">
            <Checkbox></Checkbox>
          </CheckboxGroup>
        </Form>
      ))
      expect(wrapper.findComponent(Checkbox).classes()).toContain(
        'n-checkbox--large'
      )
      expect(wrapper.findComponent(Checkbox).classes()).not.toContain(
        'n-checkbox--small'
      )
    })
    test('form-item size', async () => {
      const wrapper = mount(() => (
        <Form size="large">
          <FormItem size="default">
            <CheckboxGroup size="small">
              <Checkbox></Checkbox>
            </CheckboxGroup>
          </FormItem>
        </Form>
      ))
      expect(wrapper.findComponent(Checkbox).classes()).toContain('n-checkbox')
      expect(wrapper.findComponent(Checkbox).classes()).not.toContain(
        'n-checkbox--small'
      )
      expect(wrapper.findComponent(Checkbox).classes()).not.toContain(
        'n-checkbox--large'
      )
    })
    test('form disabled', async () => {
      const wrapper = mount(() => (
        <Form disabled>
          <CheckboxGroup disabled={false}>
            <Checkbox></Checkbox>
          </CheckboxGroup>
        </Form>
      ))
      expect(wrapper.findComponent(Checkbox).classes()).toContain('is-disabled')
    })
    test('form disabled and form-item not disabled', async () => {
      const wrapper = mount(() => (
        <Form disabled>
          <FormItem disabled={false}>
            <CheckboxGroup>
              <Checkbox></Checkbox>
            </CheckboxGroup>
          </FormItem>
        </Form>
      ))
      expect(wrapper.findComponent(Checkbox).classes()).toContain('is-disabled')
    })
    test('form-item not disabled and checkGroup disabled', async () => {
      const wrapper = mount(() => (
        <Form disabled>
          <FormItem>
            <CheckboxGroup disabled={false}>
              <Checkbox></Checkbox>
            </CheckboxGroup>
          </FormItem>
        </Form>
      ))
      expect(wrapper.findComponent(Checkbox).classes()).toContain('is-disabled')
    })

    describe('validate action with checkbox-group', () => {
      beforeEach(() => {
        wrapper = _mount()
      })
      afterEach(() => {
        wrapper.unmount()
      })

      const formData = reactive({
        checkbox: []
      })
      const formRules = reactive({
        checkbox: {
          type: 'array',
          required: true,
          message: 'please check',
          trigger: 'change'
        }
      })
      let wrapper: VueWrapper<FormInstance>
      const _mount = () =>
        mount(
          <Form model={formData} rules={formRules}>
            <FormItem prop="checkbox">
              <CheckboxGroup v-model={formData.checkbox}>
                <Checkbox value={1}></Checkbox>
              </CheckboxGroup>
            </FormItem>
          </Form>
        ) as unknown as VueWrapper<FormInstance>

      test('form validate while checkbox no value', async () => {
        await wrapper.vm.validate(() => {})
        expect(wrapper.find('.n-form-item__error').exists()).toBe(true)
      })
      test('form validate while checkbox has value', async () => {
        await wrapper.findComponent(Checkbox).trigger('click')
        await wrapper.vm.validate(() => {})
        expect(wrapper.find('.n-form-item__error').exists()).toBe(false)
      })
    })
  })
})
