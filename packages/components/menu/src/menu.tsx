import {
  defineComponent,
  getCurrentInstance,
  nextTick,
  onMounted,
  provide,
  reactive,
  ref,
  toRefs,
  watch,
  watchEffect
} from 'vue'
import { isArray, isNil } from 'lodash'
import { useNamespace } from '@nocturne-ui/composables'
import NIcon from '@nocturne-ui/components/icon'
import { RiMoreFill as More } from '@remixicon/vue'
import { useResizeObserver } from '@vueuse/core'
import { flattedChildren } from '@nocturne-ui/utils'
import { menuEmit, menuProps } from './props'
import { NMENU_INJECTION_KEY } from './constants'
import NSubMenu from './sub-menu.vue'
import type { NMenuInjectionContext, NSubMenuInjectionContext } from './types'
import type { VNodeArrayChildren } from 'vue'
import type { UseResizeObserverReturn } from '@vueuse/core'

export default defineComponent({
  name: 'NMenu',
  components: { NSubMenu, NIcon },
  props: menuProps,
  emits: menuEmit,
  setup(props, { emit, slots }) {
    const ns = useNamespace('menu')

    const instance = getCurrentInstance()!

    const selectedIndex = ref<string>(props.defaultActive || '')
    const subMenus = ref<NMenuInjectionContext['subMenus']>({})
    const openedMenus = ref<string[]>([])
    const mouseInChild = ref(false)
    const menuRef = ref<HTMLElement>()
    const sliceIndex = ref(-1)

    const addSubMenu: NMenuInjectionContext['addSubMenu'] = (item) => {
      subMenus.value[item.index] = item
    }

    const removeSubMenu: NMenuInjectionContext['removeSubMenu'] = (item) => {
      delete subMenus.value[item.index]
    }

    const openMenu: NMenuInjectionContext['openMenu'] = (index, indexPath) => {
      if (openedMenus.value.includes(index)) return

      if (
        props.uniqueOpened &&
        subMenus.value &&
        subMenus.value[index].level === 0
      ) {
        openedMenus.value = openedMenus.value.filter((index) =>
          indexPath.includes(index)
        )
      }

      openedMenus.value.push(index)
      emit('open', index, indexPath)
    }

    const closeMenu: NMenuInjectionContext['closeMenu'] = (
      index,
      indexPath
    ) => {
      const target = openedMenus.value.indexOf(index)
      if (target > -1) {
        openedMenus.value.splice(target, 1)
        emit('close', index, indexPath)
      }
    }

    const handleSubMenuClick: NMenuInjectionContext['handleSubMenuClick'] = (
      index,
      indexPath
    ) => {
      const opened = openedMenus.value.includes(index)

      if (opened) closeMenu(index, indexPath)
      else openMenu(index, indexPath)
    }

    const handleMenuItemClick: NMenuInjectionContext['handleMenuItemClick'] = (
      item
    ) => {
      if (props.direction === 'horizontal') {
        openedMenus.value = []
      }
      const { index, indexPath } = item

      if (isNil(index)) return

      selectedIndex.value = index

      emit('select', index, indexPath)
    }

    const calcMenuItemWidth = (menuItem: HTMLElement) => {
      const computedStyle = getComputedStyle(menuItem)
      const marginLeft = Number.parseInt(computedStyle.marginLeft, 10)
      const marginRight = Number.parseInt(computedStyle.marginRight, 10)
      return menuItem.offsetWidth + marginLeft + marginRight || 0
    }

    const calcSliceIndex = () => {
      if (!menuRef.value) return -1

      const items = Array.from(menuRef.value?.childNodes ?? []).filter(
        (item) => item.nodeName !== '#text' || item.nodeValue
      ) as HTMLElement[]

      const moreItemWidth = 64
      const computedMenuStyle = getComputedStyle(menuRef.value)
      const paddingLeft = Number.parseInt(computedMenuStyle.paddingLeft, 10)
      const paddingRight = Number.parseInt(computedMenuStyle.paddingRight, 10)
      const menuWidth = menuRef.value.clientWidth - paddingLeft - paddingRight
      let calcWidth = 0
      let sliceIndex = 0

      items.forEach((item, index) => {
        if (item.nodeName === '#comment') return
        calcWidth += calcMenuItemWidth(item)
        if (calcWidth <= menuWidth - moreItemWidth) {
          sliceIndex = index + 1
        }
      })
      return sliceIndex === items.length ? -1 : sliceIndex
    }

    const handleResize = () => {
      if (sliceIndex.value === calcSliceIndex()) return
      const callback = () => {
        sliceIndex.value = -1
        nextTick(() => {
          sliceIndex.value = calcSliceIndex()
        })
      }
      callback()
    }

    let resizeStopper: UseResizeObserverReturn['stop']
    watchEffect(() => {
      if (props.direction === 'horizontal' && props.ellipsis)
        resizeStopper = useResizeObserver(menuRef, handleResize).stop
      else {
        resizeStopper?.()
        sliceIndex.value = -1
      }
    })

    const updateSelecedIndex = (index: string) => {
      selectedIndex.value = index
    }

    watch(
      () => props.collapse,
      (val) => {
        if (val) {
          openedMenus.value = []
        } else if (!val && props.defaultOpeneds) {
          openedMenus.value = props.defaultOpeneds
        }
      }
    )

    watch(
      () => props.defaultActive,
      (current) => {
        if (current) {
          updateSelecedIndex(current)
        }
      }
    )

    onMounted(() => {
      if (isArray(props.defaultOpeneds)) {
        openedMenus.value.push(...props.defaultOpeneds)
      }
    })

    provide(
      NMENU_INJECTION_KEY,
      reactive({
        ...toRefs(props),
        subMenus,
        openedMenus,
        selectedIndex,
        addSubMenu,
        removeSubMenu,
        openMenu,
        closeMenu,
        handleSubMenuClick,
        handleMenuItemClick
      })
    )
    provide<NSubMenuInjectionContext>(`subMenu:${instance.uid}`, {
      addSubMenu,
      removeSubMenu,
      level: 0,
      mouseInChild
    })

    return () => {
      const { collapse, direction } = props
      const slot: VNodeArrayChildren = slots.default?.() ?? []
      const originalSlot = flattedChildren(slot)
      const defaultSlot =
        sliceIndex.value === -1
          ? originalSlot
          : originalSlot.slice(0, sliceIndex.value)
      const slotMore =
        sliceIndex.value === -1 ? [] : originalSlot.slice(sliceIndex.value)

      const MenuMore = (
        <>
          {slotMore.length ? (
            <NSubMenu
              style={{ minWidth: '64px' }}
              index="sub-menu-more"
              v-slots={{
                icon: () => <NIcon>{{ default: () => <More></More> }}</NIcon>,
                default: () => slotMore
              }}
            ></NSubMenu>
          ) : null}
        </>
      )

      return (
        <ul
          ref={menuRef}
          role="menu"
          class={[ns.b(), ns.is(direction), ns.is('collapse', collapse)]}
        >
          {defaultSlot}
          {MenuMore}
        </ul>
      )
    }
  }
})
