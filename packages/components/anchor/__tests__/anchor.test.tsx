import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Anchor from '../src/anchor.vue'
import AnchorItem from '../src/anchor-item.vue'

let id = 0

const getHash = () => `#anchor-item-${id++}`

describe('Anchor.vue', () => {
  test('snapshot', async () => {
    const hash = getHash()
    const wrapper = mount({
      props: ['direction'],
      render() {
        return (
          <Anchor>
            <AnchorItem href={hash}>{hash}</AnchorItem>
          </Anchor>
        )
      }
    })

    wrapper.setProps({
      direction: 'vertical'
    })
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.setProps({
      direction: 'horizontal'
    })
    await nextTick()
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.setProps({
      direction: 'vertical'
    })
    await nextTick()
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.setProps({
      direction: 'horizontal'
    })
    await nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('scroll after click', async () => {
    const hash = getHash()
    const wrapper = mount(
      () => (
        <>
          <div id={hash.replace('#', '')}>hash</div>
          <Anchor>
            <AnchorItem href={hash}>{hash}</AnchorItem>
          </Anchor>
        </>
      ),
      {
        attachTo: 'body'
      }
    )
    const scrollSpy = vi
      .spyOn(window, 'scrollTo')
      .mockImplementation(() => undefined)
    await nextTick()
    wrapper.find(`a[href="${hash}"]`).trigger('click')
    await nextTick()
    expect(scrollSpy).toHaveBeenCalledTimes(1)
  })

  test('scrollTo method', async () => {
    const hash = getHash()
    const anchorRef = ref<InstanceType<typeof Anchor> | null>(null)
    mount(
      () => (
        <>
          <div id={hash.replace('#', '')}>hash</div>
          <Anchor ref={anchorRef}>
            <AnchorItem href={hash}>{hash}</AnchorItem>
          </Anchor>
        </>
      ),
      {
        attachTo: 'body'
      }
    )
    const scrollSpy = vi
      .spyOn(window, 'scrollTo')
      .mockImplementation(() => undefined)
    await nextTick()
    anchorRef.value?.handleScrollTo(hash)
    await nextTick()
    expect(scrollSpy).toHaveBeenCalledTimes(1)
  })

  test('change event', async () => {
    const hash1 = getHash()
    const hash2 = getHash()
    const wrapper = mount(() => (
      <Anchor>
        <AnchorItem href={hash1}>{hash1}</AnchorItem>
        <AnchorItem href={hash2}>{hash2}</AnchorItem>
      </Anchor>
    ))
    wrapper.find(`a[href="${hash1}"]`).trigger('click')
    wrapper.find(`a[href="${hash2}"]`).trigger('click')
    expect(wrapper.findComponent(Anchor).emitted('change')).toEqual([
      [hash1],
      [hash2]
    ])
  })

  test('click event', async () => {
    const hash = getHash()
    const wrapper = mount(() => (
      <Anchor>
        <AnchorItem href={hash}>{hash}</AnchorItem>
      </Anchor>
    ))
    wrapper.find(`a[href="${hash}"]`).trigger('click')

    expect(
      (wrapper.findComponent(Anchor).emitted('click') as any)[0][0]
    ).toBeInstanceOf(MouseEvent)
    expect((wrapper.findComponent(Anchor).emitted('click') as any)[0][1]).toBe(
      hash
    )
  })
})
