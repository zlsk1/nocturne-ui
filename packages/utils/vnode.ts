import { Comment, Fragment, isVNode } from 'vue'
import { isArray } from '.'
import type {
  VNode,
  VNodeArrayChildren,
  VNodeChild,
  VNodeNormalizedChildren
} from 'vue'

export type VNodeChildAtom = Exclude<VNodeChild, Array<any>>
export type RawSlots = Exclude<
  VNodeNormalizedChildren,
  Array<any> | null | string
>

export type FlattenVNodes = Array<VNodeChildAtom | RawSlots>

export const flattedChildren = (
  children: FlattenVNodes | VNode | VNodeNormalizedChildren
): FlattenVNodes => {
  const vNodes = isArray(children) ? children : [children]
  const result: FlattenVNodes = []

  vNodes.forEach((child) => {
    if (isArray(child)) {
      result.push(...flattedChildren(child))
    } else if (isVNode(child) && child.component?.subTree) {
      result.push(child, ...flattedChildren(child.component.subTree))
    } else if (isVNode(child) && isArray(child.children)) {
      result.push(...flattedChildren(child.children))
    } else if (isVNode(child) && child.shapeFlag === 2) {
      // @ts-ignore
      result.push(...flattedChildren(child.type()))
    } else {
      result.push(child)
    }
  })
  return result
}

export const ensureValidVNode = (slot: VNodeArrayChildren | null) => {
  return (slot || []).some((child) => {
    if (!isVNode(child)) return true
    if (child.type === Comment) return false
    if (
      child.type === Fragment &&
      !ensureValidVNode(child.children as VNodeArrayChildren)
    )
      return false
    return true
  })
    ? slot
    : null
}
