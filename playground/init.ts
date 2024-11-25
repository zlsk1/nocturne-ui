import { existsSync, readFileSync, writeFileSync } from 'fs'

export const init = () => {
  if (!existsSync('./src/app.vue')) {
    const data = readFileSync('./default-app.vue', 'utf-8')
    writeFileSync('./src/app.vue', data)
  }
}

init()
