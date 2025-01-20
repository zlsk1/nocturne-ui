import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { IMAGE_SUCCESS } from '@/tests-utils/image'
import Card from '../src/card.vue'

describe('Card', () => {
  test('header', () => {
    const wrapper = mount(() => <Card header="Aatrox"></Card>)
    expect(wrapper.find('.n-card').exists()).toBeTruthy()
    expect(wrapper.find('.n-card__header').exists()).toBeTruthy()
  })

  test('footer', () => {
    const wrapper = mount(() => <Card footer="footer content"></Card>)
    expect(wrapper.find('.n-card').exists()).toBeTruthy()
    expect(wrapper.find('.n-card__footer').exists()).toBeTruthy()
  })

  test('content text', () => {
    const wrapper = mount(() => (
      <Card>
        <p>
          亚托克斯和他的同胞曾是为恕瑞玛对抗虚空的守护者一族。曾经满载荣誉的他们，却成了符文之地上更大的威胁，最后被人类设下的圈套所击败。
        </p>
      </Card>
    ))
    expect(wrapper.find('.n-card').exists()).toBeTruthy()
    expect(wrapper.find('.n-card__content').exists()).toBeTruthy()
    expect(wrapper.find('.n-card__content p').text()).toBe(
      '亚托克斯和他的同胞曾是为恕瑞玛对抗虚空的守护者一族。曾经满载荣誉的他们，却成了符文之地上更大的威胁，最后被人类设下的圈套所击败。'
    )
  })

  test('content img', () => {
    const wrapper = mount(() => (
      <Card>
        <img style="width: 120px; height: 70px" src={IMAGE_SUCCESS} />
      </Card>
    ))
    expect(wrapper.find('.n-card').exists()).toBeTruthy()
    expect(wrapper.find('.n-card__content').exists()).toBeTruthy()
    expect(wrapper.find('.n-card__content img').attributes('style')).toContain(
      `width: 120px`
    )
    expect(wrapper.find('.n-card__content img').attributes('style')).toContain(
      `height: 70px`
    )
  })

  test('custom-class', () => {
    const wrapper = mount(() => (
      <Card contentClass="custom-class">
        <p>
          亚托克斯和他的同胞曾是为恕瑞玛对抗虚空的守护者一族。曾经满载荣誉的他们，却成了符文之地上更大的威胁，最后被人类设下的圈套所击败。
        </p>
      </Card>
    ))
    expect(wrapper.find('.n-card').exists()).toBeTruthy()
    expect(wrapper.find('.n-card__content').exists()).toBeTruthy()
    expect(wrapper.find('.n-card__content').classes()).toContain('custom-class')
  })
})
