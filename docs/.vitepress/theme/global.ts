import vpDemo from './components/vp-demo.vue'
import vpAPITyping from './components/vp-api-typing.vue'

import type { Component } from 'vue'

export const vpComponents: [string, Component][] = [
  ['Demo', vpDemo],
  ['api-typing', vpAPITyping]
]
