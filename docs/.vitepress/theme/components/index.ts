import vpDemo from "./vp-demo.vue";
import vpAPITyping from "./vp-api-typing.vue";

import type { Component } from "vue";

export const vpComponents:[string, Component][] = [
  ['Demo', vpDemo],
  ['api-typing', vpAPITyping],
]