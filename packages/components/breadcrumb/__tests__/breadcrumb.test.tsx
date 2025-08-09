import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { LineChartOutlined } from '@ant-design/icons-vue'
import Breadcrumb from '../src/breadcrumb'
import BreadcrumbItem from '../src/breadcrumb-item'

describe('Breadcrumb', () => {
  test('separator', () => {
    const wrapper = mount(() => (
      <Breadcrumb separator="#">
        <BreadcrumbItem>index</BreadcrumbItem>
      </Breadcrumb>
    ))
    expect(wrapper.find('.n-breadcrumb__separator').text()).toBe('#')
  })

  test('separator-icon', () => {
    const wrapper = mount(() => (
      <Breadcrumb separator={LineChartOutlined}>
        <BreadcrumbItem>index</BreadcrumbItem>
      </Breadcrumb>
    ))
    expect(wrapper.find('.n-breadcrumb__separator').text()).toBe('')
    expect(wrapper.findComponent(LineChartOutlined).exists()).toBe(true)
  })

  test('is-link', () => {
    const wrapper = mount(() => (
      <Breadcrumb>
        <BreadcrumbItem path="/index">index</BreadcrumbItem>
      </Breadcrumb>
    ))
    expect(wrapper.find('.n-breadcrumb__content.is-link').exists()).toBe(true)
  })

  test('click event', async () => {
    const wrapper = mount(() => (
      <Breadcrumb>
        <BreadcrumbItem path="/index">index</BreadcrumbItem>
      </Breadcrumb>
    ))
    const content = wrapper.find('.n-breadcrumb__content')
    expect(content.exists()).toBe(true)
    await content.trigger('click')
    expect(wrapper.emitted()).toBeDefined()
  })
})
