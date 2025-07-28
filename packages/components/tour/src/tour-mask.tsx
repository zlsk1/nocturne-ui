import { computed, defineComponent } from 'vue'
import {
  useId,
  useNamespace,
  useScrollLocker,
  useZIndex
} from '@nocturne-ui/composables'
import { canUseDom, definePropType } from '@nocturne-ui/utils'
import type { CSSProperties } from 'vue'
import type { PosInfo } from './use-target'

const COVER_PROPS = {
  fill: 'transparent',
  'pointer-events': 'auto'
}

export default defineComponent({
  name: 'NTourMask',
  props: {
    open: {
      type: Boolean,
      default: true
    },
    mask: {
      type: definePropType<boolean | { style?: CSSProperties; color?: string }>(
        [Boolean, Object]
      ),
      default: true
    },
    animated: {
      type: definePropType<boolean | { placeholder: boolean }>([
        Boolean,
        Object
      ]),
      default: true
    },
    zIndex: {
      type: Number
    },
    pos: {
      type: definePropType<PosInfo>(Object)
    },
    fill: {
      type: String,
      default: 'rgba(0,0,0,0.5)'
    }
  },
  setup(props, { attrs }) {
    const { initialZIndex } = useZIndex()
    const id = useId()
    const ns = useNamespace('tour')

    useScrollLocker(computed(() => props.open && canUseDom()))

    return () => {
      const { open, zIndex, mask, pos, animated, fill } = props

      const maskId = `${ns.b()}-mask-${id.value}`
      const mergedAnimated =
        typeof animated === 'object' ? animated?.placeholder : animated

      return (
        open && (
          <div
            class={ns.b('mask')}
            style={[
              {
                position: 'fixed',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                zIndex: zIndex || initialZIndex.value,
                pointerEvents: 'none'
              },
              attrs.style as CSSProperties
            ]}
          >
            {mask ? (
              <svg
                style={{
                  width: '100%',
                  height: '100%'
                }}
              >
                <defs>
                  <mask id={maskId}>
                    <rect
                      x="0"
                      y="0"
                      width="100vw"
                      height="100vh"
                      fill="white"
                    />
                    {pos && (
                      <rect
                        x={pos.left}
                        y={pos.top}
                        rx={pos.radius}
                        width={pos.width}
                        height={pos.height}
                        fill="black"
                        class={
                          mergedAnimated ? `${ns.b()}-placeholder-animated` : ''
                        }
                      />
                    )}
                  </mask>
                </defs>
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill={fill}
                  mask={`url(#${maskId})`}
                />

                {/* Block click region */}
                {pos && (
                  <>
                    <rect
                      {...COVER_PROPS}
                      x="0"
                      y="0"
                      width="100%"
                      height={pos.top}
                    />
                    <rect
                      {...COVER_PROPS}
                      x="0"
                      y="0"
                      width={pos.left}
                      height="100%"
                    />
                    <rect
                      {...COVER_PROPS}
                      x="0"
                      y={pos.top + pos.height}
                      width="100%"
                      height={`calc(100vh - ${pos.top + pos.height}px)`}
                    />
                    <rect
                      {...COVER_PROPS}
                      x={pos.left + pos.width}
                      y="0"
                      width={`calc(100vw - ${pos.left + pos.width}px)`}
                      height="100%"
                    />
                  </>
                )}
              </svg>
            ) : null}
          </div>
        )
      )
    }
  }
})
