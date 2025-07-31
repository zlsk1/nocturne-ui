<script lang="ts">
import {
  type CSSProperties,
  computed,
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  ref,
  watch
} from 'vue'
import { useCssVar, useMutationObserver } from '@vueuse/core'
import { defaultFont, watermarkProps } from './watermark'
import { getPixelRatio, getStyleStr } from './util'

// 2 for alternate layout, 1 for parallel layout
const BaseSize = 2

export default defineComponent({
  name: 'NWatermark',
  props: watermarkProps,
  setup(props, { slots }) {
    const wrapperRef = ref<HTMLDivElement>()
    const watermarkRef = ref<HTMLDivElement>()

    const color = useCssVar('--n-fill-color-darker', wrapperRef.value)

    const offset = computed(
      () => props.offset ?? [props.spacing[0] / 2, props.spacing[1] / 2]
    )

    const watermarkStyle = computed<CSSProperties>(() => {
      const _style: CSSProperties = {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundRepeat: 'repeat',
        pointerEvents: 'none',
        zIndex: props.zIndex
      }

      let positionLeft = offset.value[0] - props.spacing[0] / 2
      let positionTop = offset.value[1] - props.spacing[1] / 2
      if (positionLeft > 0) {
        _style.left = `${positionLeft}px`
        _style.width = `calc(100% - ${positionLeft}px)`
        positionLeft = 0
      }
      if (positionTop > 0) {
        _style.top = `${positionTop}px`
        _style.height = `calc(100% - ${positionTop}px)`
        positionTop = 0
      }
      _style.backgroundPosition = `${positionLeft}px ${positionTop}px`

      return _style
    })

    const mergedFont = computed(() =>
      Object.assign({ ...defaultFont, color: color.value }, props.font)
    )

    const appendWatermark = (base64Str: string, markWidth: number) => {
      if (wrapperRef.value && watermarkRef.value) {
        watermarkRef.value.setAttribute(
          'style',
          getStyleStr({
            ...watermarkStyle.value,
            backgroundImage: `url(${base64Str})`,
            backgroundSize: `${(props.spacing[0] + markWidth) * BaseSize}px`
          })
        )
        wrapperRef.value?.append(watermarkRef.value)
      }
    }

    const removeWatermark = () => {
      if (watermarkRef.value) {
        watermarkRef.value.remove()
        watermarkRef.value = undefined
      }
    }

    const getMarkSize = (ctx: CanvasRenderingContext2D) => {
      let { width, height, content = undefined, image = undefined } = props

      if (!image && ctx.measureText) {
        ctx.font = `${Number(mergedFont.value.fontSize)}px ${mergedFont.value.fontFamily}`
        const contents = Array.isArray(content) ? content : [content]
        const widths = contents.map((item) => ctx.measureText(item!).width)
        width = Math.ceil(Math.max(...widths))
        height =
          Number(mergedFont.value.fontSize) * contents.length +
          (contents.length - 1)
      }

      return [width, height]
    }

    const fillTexts = (
      ctx: CanvasRenderingContext2D,
      drawX: number,
      drawY: number,
      drawWidth: number,
      drawHeight: number
    ) => {
      const content = props.content
      const { fontSize, fontWeight, fontFamily, fontStyle, color } =
        mergedFont.value
      const ratio = getPixelRatio()
      const mergedFontSize = Number(fontSize) * ratio
      ctx.font = `${fontStyle} normal ${fontWeight} ${mergedFontSize}px/${drawHeight}px ${fontFamily}`
      ctx.fillStyle = color
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      ctx.globalAlpha = props.opacity
      ctx.translate(drawWidth / 2, 0)
      const contents = Array.isArray(content) ? content : [content]
      contents?.forEach((item, index) => {
        ctx.fillText(
          item ?? '',
          drawX,
          drawY + index * (mergedFontSize * ratio)
        )
      })
    }

    const rotateWatermark = (
      ctx: CanvasRenderingContext2D,
      rotateX: number,
      rotateY: number,
      rotate: number
    ) => {
      ctx.translate(rotateX, rotateY)
      ctx.rotate((Math.PI / 180) * Number(rotate))
      ctx.translate(-rotateX, -rotateY)
    }

    const drawWatermark = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx || !wrapperRef.value) return

      if (!watermarkRef.value) {
        watermarkRef.value = document.createElement('div')
      }

      const ratio = getPixelRatio()

      const { content, rotate, spacing, image = undefined } = props
      if (!content) return

      const [markWidth, markHeight] = getMarkSize(ctx)
      const canvasWidth = (spacing[0] + markWidth) * ratio
      const canvasHeight = (spacing[1] + markHeight) * ratio
      canvas.setAttribute('width', `${canvasWidth * BaseSize}px`)
      canvas.setAttribute('height', `${canvasHeight * BaseSize}px`)

      const drawX = (spacing[0] * ratio) / 2
      const drawY = (spacing[1] * ratio) / 2
      const drawWidth = markWidth * ratio
      const drawHeight = markHeight * ratio
      const rotateX = (drawWidth + spacing[0] * ratio) / 2
      const rotateY = (drawHeight + spacing[1] * ratio) / 2
      /** Alternate drawing parameters */
      const alternateDrawX = drawX + canvasWidth
      const alternateDrawY = drawY + canvasHeight
      const alternateRotateX = rotateX + canvasWidth
      const alternateRotateY = rotateY + canvasHeight

      ctx.save()
      rotateWatermark(ctx, rotateX, rotateY, rotate)

      if (image) {
        const img = new Image()
        img.onload = () => {
          ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight)
          ctx.restore()
          rotateWatermark(ctx, alternateRotateX, alternateRotateY, rotate)
          ctx.drawImage(
            img,
            alternateDrawX,
            alternateDrawY,
            drawWidth,
            drawHeight
          )
          appendWatermark(canvas.toDataURL(), markWidth)
        }
        img.crossOrigin = 'anonymous'
        img.referrerPolicy = 'no-referrer'
        img.src = image
      } else {
        fillTexts(ctx, drawX, drawY, drawWidth, drawHeight)
        /** Fill the interleaved text after rotation */
        ctx.restore()
        rotateWatermark(ctx, alternateRotateX, alternateRotateY, rotate)
        fillTexts(ctx, alternateDrawX, alternateDrawY, drawWidth, drawHeight)
        appendWatermark(canvas.toDataURL(), markWidth)
      }
    }

    useMutationObserver(
      wrapperRef,
      (records) => {
        const hasChanged = records.some(
          (record) =>
            (record.removedNodes.length &&
              record.target === watermarkRef.value) ||
            (record.type === 'attributes' &&
              record.target === watermarkRef.value)
        )

        if (hasChanged) {
          removeWatermark()
          drawWatermark()
        }
      },
      {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ['style', 'class']
      }
    )

    watch(() => props, drawWatermark, { deep: true, flush: 'post' })

    onMounted(() => {
      drawWatermark()
    })

    onBeforeUnmount(() => {
      removeWatermark()
    })

    return () =>
      h(
        'div',
        {
          ref: wrapperRef,
          style: {
            position: 'relative',
            overflow: 'hidden'
          }
        },
        slots.default?.()
      )
  }
})
</script>
