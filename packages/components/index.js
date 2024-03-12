import FrButton from './button/src/button.vue'
import FrIcon from './svg-icon/src/icon.vue'
import FrInput from './input/src/input.vue'
import FrInputNumber from './input-number/src/input-number.vue'
import FrSwitch from './switch/src/switch.vue'
import FrRadio from './radio/src/radio.vue'
import FrRadioGroup from './radio-group/src/radio-group.vue'
import FrCheckbox from './checkbox/src/checkbox.vue'
import FrCheckboxGroup from './checkbox-group/src/checkbox-group.vue'
import FrTag from './tag/src/tag.vue'
import FrLink from './link/src/link.vue'
import FrBadge from './badge/src/badge.vue'
import FrSlider from './slider/src/slider.vue'
import FrTimeLine from './timeline/src/timeline.vue'
import FrTimeLineItem from './timeline-item/src/timeline-item.vue'
import FrAlert from './alert/src/alert.vue'

const components = [
  FrButton,
  FrIcon,
  FrInput,
  FrInputNumber,
  FrSwitch,
  FrRadio,
  FrRadioGroup,
  FrCheckbox,
  FrCheckboxGroup,
  FrTag,
  FrLink,
  FrBadge,
  FrSlider,
  FrTimeLine,
  FrTimeLineItem,
  FrAlert
]

const install = app => {
  components.forEach(comp => {
    app.component(comp.name, comp)
  })
}

export default install

export {
  FrButton,
  FrIcon,
  FrInput,
  FrInputNumber,
  FrSwitch,
  FrRadio,
  FrRadioGroup,
  FrCheckbox,
  FrCheckboxGroup,
  FrTag,
  FrLink,
  FrBadge,
  FrSlider,
  FrTimeLine,
  FrTimeLineItem,
  FrAlert
}
