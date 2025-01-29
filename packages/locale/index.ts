export { default as en } from './lang/en'
export { default as zhCn } from './lang/zh-cn'

export type Locale = {
  name: string
  noc: LocalUnit
}

export type LocalUnit = {
  [key: string]: string | string[] | LocalUnit
}
