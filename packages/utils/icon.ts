import type { Component } from 'vue'
import { definePropType } from '@/utils'

export const iconPropType = definePropType<string | Component>([
  String,
  Object,
  Function
])
