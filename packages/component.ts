import type { Plugin } from 'vue'
import { NAlert } from '@/components/alert'
import { NAnchor, NAnchorItem } from '@/components/anchor'
import { NAvatar } from '@/components/avatar'
import { NBadge } from '@/components/badge'
import { NBreadcrumb, NBreadcrumbItem } from '@/components/breadcrumb'
import { NButton, NButtonGroup } from '@/components/button'
import { NCard } from '@/components/card'
import { NCarousel, NCarouselItem } from '@/components/carousel'
import { NCheckbox, NCheckboxGroup } from '@/components/checkbox'
import { NCol } from '@/components/col'
import {
  NCollapse,
  NCollapseItem,
  NCollapseTransition
} from '@/components/collapse'
import { NColorPicker } from '@/components/color-picker'
import { NConfigProvider } from '@/components/config-provider'
import { NCountdown } from '@/components/countdown'
import { NDatePicker } from '@/components/date-picker'
import { NDialog } from '@/components/dialog'
import { NDrawer } from '@/components/drawer'
import { NDropdown, NDropdownItem } from '@/components/dropdown'
import { NForm, NFormItem } from '@/components/form'
import { NIcon } from '@/components/icon'
import { NInput } from '@/components/input'
import { NInputNumber } from '@/components/input-number'
import { NLink } from '@/components/link'
import { NMenu, NMenuItem, NMenuItemGroup, NSubMenu } from '@/components/menu'
import { NOption } from '@/components/option'
import { NOverlay } from '@/components/overlay'
import { NPagination } from '@/components/pagination'
import { NPopconfirm } from '@/components/popconfirm'
import { NPopover } from '@/components/popover'
import { NPopper } from '@/components/popper'
import { NProgress } from '@/components/progress'
import { NRadio, NRadioGroup } from '@/components/radio'
import { NRow } from '@/components/row'
import { NSelect } from '@/components/select'
import { NSlider } from '@/components/slider'
import { NStatistic } from '@/components/statistic'
import { NSwitch } from '@/components/switch'
import { NTag } from '@/components/tag'
import { NTimePicker } from '@/components/time-picker'
import { NTimeline } from '@/components/timeline'
import { NTimelineItem } from '@/components/timeline-item'
import { NTooltip } from '@/components/tooltip'

export default [
  NAlert,
  NAnchor,
  NAnchorItem,
  NAvatar,
  NBadge,
  NBreadcrumb,
  NBreadcrumbItem,
  NButton,
  NButtonGroup,
  NCard,
  NCarousel,
  NCarouselItem,
  NCheckbox,
  NCheckboxGroup,
  NCol,
  NCollapse,
  NCollapseItem,
  NCollapseTransition,
  NColorPicker,
  NConfigProvider,
  NCountdown,
  NDatePicker,
  NDialog,
  NDrawer,
  NDropdown,
  NDropdownItem,
  NForm,
  NFormItem,
  NIcon,
  NInput,
  NInputNumber,
  NLink,
  NMenu,
  NMenuItem,
  NSubMenu,
  NMenuItemGroup,
  NOption,
  NOverlay,
  NPagination,
  NPopconfirm,
  NPopover,
  NPopper,
  NProgress,
  NRadio,
  NRadioGroup,
  NRow,
  NSelect,
  NSlider,
  NStatistic,
  NSwitch,
  NTag,
  NTimePicker,
  NTimeline,
  NTimelineItem,
  NTooltip
] as Plugin[]
