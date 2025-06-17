import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { IMAGE_SUCCESS } from '@nocturne-ui/tests-utils/image'
import Skeleton from '@nocturne-ui/components/skeleton'
import Avatar from '@nocturne-ui/components/avatar'
import Card from '../src/card.vue'

describe('Card', () => {
  test('title', () => {
    const wrapper = mount(() => <Card title="Aatrox"></Card>)
    expect(wrapper.find('.n-card').exists()).toBeTruthy()
    expect(wrapper.find('.n-card__header').exists()).toBeTruthy()
  })

  test('cover', () => {
    const wrapper = mount(() => <Card cover={IMAGE_SUCCESS}></Card>)
    expect(wrapper.find('.n-card').exists()).toBeTruthy()
    expect(wrapper.find('.n-card--cover').exists()).toBeTruthy()
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

  test('extra slot', () => {
    const wrapper = mount(() => (
      <Card v-slots={{ extra: () => <a href="/"></a> }}></Card>
    ))
    expect(wrapper.find('.n-card__header').exists()).toBeTruthy()
    expect(wrapper.find('.n-card__header').find('a')).toBeTruthy()
  })

  test('action slot', () => {
    const wrapper = mount(() => (
      <Card v-slots={{ action: () => <a href="/"></a> }}></Card>
    ))
    expect(wrapper.find('.n-card__action').exists()).toBeTruthy()
    expect(wrapper.find('.n-card__action').find('a')).toBeTruthy()
  })

  test('loading', async () => {
    const loading = ref(false)
    const wrapper = mount(() => <Card loading={loading.value}></Card>)
    expect(wrapper.findComponent(Skeleton).exists()).toBe(false)

    loading.value = true
    await nextTick()
    expect(wrapper.findComponent(Skeleton).exists()).toBe(true)
  })

  test('meta', async () => {
    const wrapper = mount(() => (
      <Card
        meta={{ title: 'title', description: 'desc', avatar: IMAGE_SUCCESS }}
      ></Card>
    ))

    expect(wrapper.find('.n-card-meta').exists()).toBe(true)
    expect(wrapper.find('.n-card-meta--wrapper').exists()).toBe(true)
    expect(wrapper.findComponent(Avatar).exists()).toBe(true)
  })
})
