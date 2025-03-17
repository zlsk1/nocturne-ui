export function consoleWarn(message: string): void
export function consoleWarn(scope: string, message: string): void
export function consoleWarn(scoped: string, message?: string) {
  console.warn(`[${scoped}]: ${message}`)
}
