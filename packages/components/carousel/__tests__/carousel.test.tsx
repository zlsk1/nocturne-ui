import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { RiArrowRightSLine } from '@remixicon/vue'
import Carousel from '../src/carousel.vue'
import CarouselItem from '../src/carousel-item.vue'

describe('Carousel', () => {
  test('render', async () => {
    const wrapper = mount(() => (
      <Carousel>
        <CarouselItem>
          <h2>1</h2>
        </CarouselItem>
      </Carousel>
    ))
    expect(wrapper.find('.n-carousel').exists()).toBeTruthy()
    expect(wrapper.findAll('.n-carousel__content__item')).length(1)
    await nextTick()
    expect(wrapper.findAll('.n-carousel__indicator__item')).length(1)
    expect(wrapper.findAll('.n-carousel__button')).length(2)
    expect(wrapper.findComponent(RiArrowRightSLine)).toBeTruthy()
  })

  test('item height', () => {
    const wrapper = mount(() => (
      <Carousel height={200}>
        <CarouselItem>
          <h2>1</h2>
        </CarouselItem>
      </Carousel>
    ))
    expect(wrapper.find('.n-carousel__content').attributes('style')).toContain(
      'height: 200px'
    )
  })

  test('autoplay', () => {
    const autoplay = ref(true)
    const wrapper = mount(() => (
      <div style="width: 500px">
        <Carousel autoplay={autoplay.value}>
          <CarouselItem>
            <h2>1</h2>
          </CarouselItem>
          <CarouselItem>
            <h2>2</h2>
          </CarouselItem>
        </Carousel>
      </div>
    ))
    expect(
      wrapper.findAll('.n-carousel__content__item')[0].attributes('style')
    ).toContain('transform: translateX(0px)')
    setTimeout(() => {
      expect(
        wrapper.findAll('.n-carousel__content__item')[0].attributes('style')
      ).toContain('transform: translateX(-500px)')
    }, 3000)
    autoplay.value = false
    setTimeout(() => {
      expect(wrapper.find('.n-carousel__content').text()).toBe('2')
      expect(
        wrapper.findAll('.n-carousel__content__item')[0].attributes('style')
      ).toContain('transform: translateX(-500px)')
    }, 3000)
  })

  test('change interval value', () => {
    const wrapper = mount(() => (
      <div style="width: 500px">
        <Carousel interval={5000}>
          <CarouselItem>
            <h2>1</h2>
          </CarouselItem>
          <CarouselItem>
            <h2>2</h2>
          </CarouselItem>
        </Carousel>
      </div>
    ))
    expect(
      wrapper.findAll('.n-carousel__content__item')[0].attributes('style')
    ).toContain('transform: translateX(0px)')
    setTimeout(() => {
      expect(
        wrapper.findAll('.n-carousel__content__item')[0].attributes('style')
      ).toContain('transform: translateX(-500px)')
    }, 5000)
  })

  test('hide arrow', () => {
    const wrapper = mount(() => (
      <Carousel showArrow={false}>
        <CarouselItem>
          <h2>1</h2>
        </CarouselItem>
      </Carousel>
    ))
    expect(wrapper.findAll('.n-carousel__button')).length(0)
  })

  test('hide indicator', () => {
    const wrapper = mount(() => (
      <Carousel hideIndicator={true}>
        <CarouselItem>
          <h2>1</h2>
        </CarouselItem>
      </Carousel>
    ))
    expect(wrapper.findAll('.n-carousel__indicator__item')).length(0)
  })

  test('ciricle indicator', () => {
    const wrapper = mount(() => (
      <Carousel indicatorShape="circle">
        <CarouselItem>
          <h2>1</h2>
        </CarouselItem>
      </Carousel>
    ))
    expect(wrapper.find('.is-circle')).toBeTruthy()
  })

  test('vertical mode', () => {
    const wrapper = mount(() => (
      <Carousel mode="vertical">
        <CarouselItem>
          <h2>1</h2>
        </CarouselItem>
        <CarouselItem>
          <h2>2</h2>
        </CarouselItem>
        <CarouselItem>
          <h2>3</h2>
        </CarouselItem>
      </Carousel>
    ))
    expect(
      wrapper.find('.n-carousel__content__item').attributes('style')
    ).toContain('transform: translateY(0px)')
  })

  test('indicatorPlacement', () => {
    ;['bottom', 'top', 'left', 'right'].forEach((placement) => {
      const wrapper = mount(() => (
        <Carousel indicatorPlacement={placement}>
          <CarouselItem>
            <h2>1</h2>
          </CarouselItem>
        </Carousel>
      ))
      expect(
        wrapper.find(`.n-carousel__indicator--${placement}`).exists()
      ).toBeTruthy()
    })
  })

  test('switch by clicking button', async () => {
    const wrapper = mount(() => (
      <div style="width: 500px">
        <Carousel>
          <CarouselItem>
            <h2>1</h2>
          </CarouselItem>
          <CarouselItem>
            <h2>2</h2>
          </CarouselItem>
          <CarouselItem>
            <h2>3</h2>
          </CarouselItem>
        </Carousel>
      </div>
    ))
    const nextBtn = wrapper.find('.n-carousel__button--right')
    const prevBtn = wrapper.find('.n-carousel__button--left')
    expect(
      wrapper.findAll('.n-carousel__content__item')[0].attributes('style')
    ).toContain('transform: translateX(0px)')
    await nextBtn.trigger('click')
    setTimeout(() => {
      expect(
        wrapper.findAll('.n-carousel__content__item')[0].attributes('style')
      ).toContain('transform: translateX(-500px)')
    }, 300)
    await prevBtn.trigger('click')
    setTimeout(() => {
      expect(
        wrapper.findAll('.n-carousel__content__item')[0].attributes('style')
      ).toContain('transform: translateX(0px)')
    }, 300)
  })

  test('switch by hovering indicator', async () => {
    const wrapper = mount(() => (
      <div style="width: 500px">
        <Carousel trigger="hover">
          <CarouselItem>
            <h2>1</h2>
          </CarouselItem>
          <CarouselItem>
            <h2>2</h2>
          </CarouselItem>
          <CarouselItem>
            <h2>3</h2>
          </CarouselItem>
        </Carousel>
      </div>
    ))
    const carouselItem = wrapper.findAll('.n-carousel__content__item')[0]
    await nextTick()
    const indicatorItems = wrapper.findAll('.n-carousel__indicator__item')
    expect(carouselItem.attributes('style')).toContain(
      'transform: translateX(0px)'
    )
    await indicatorItems[1].trigger('mouseenter')
    setTimeout(() => {
      expect(carouselItem.attributes('style')).toContain(
        'transform: translateX(-500px)'
      )
    }, 300)
    await indicatorItems[2].trigger('mouseenter')
    setTimeout(() => {
      expect(carouselItem.attributes('style')).toContain(
        'transform: translateX(500px)'
      )
    }, 300)
  })

  test('loop is false', async () => {
    const wrapper = mount(() => (
      <div style="width: 500px">
        <Carousel loop={false}>
          <CarouselItem>
            <h2>1</h2>
          </CarouselItem>
          <CarouselItem>
            <h2>2</h2>
          </CarouselItem>
        </Carousel>
      </div>
    ))
    const prevBtn = wrapper.find('.n-carousel__button--left')
    expect(
      wrapper.find('.n-carousel__button--left').attributes('style')
    ).toContain('display: none')
    await prevBtn.trigger('click')
    setTimeout(() => {
      expect(prevBtn.attributes('style')).toContain('display: block')
    }, 300)
  })
})
