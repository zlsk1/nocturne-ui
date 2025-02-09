import { nextTick } from 'vue'
import { afterAll, beforeAll } from 'vitest'

export const IMAGE_SUCCESS =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAX9JREFUSEu11c9LFWEUxvGPkJaL3CoYhgshN64jBcFFUCpiIIKg5MqwTbi1nTshWkW6Egw3LQMxdy1C8h/wNyK6CmzRSois7gsj3saZO3cc79kMM7zv8z3nmXPet06No67G+rIAtzCC57iLQfzIk1QlQB8W0BEJdmMjj3hYmwS4Xcr2DV6WiX3EaF7xNMCnyIpyvSGE77kjXsE03iWotOB7bvWYRQ04RnOCUD1+FwWETllKEbmRCpK8v+A9weeiFZzgXorIIl4UBZzhTorIL3TiMC+kvIt+oqmCwB7CsJ1WAWmLGua/QdvGg4zN++hHeKbFMF6hNz5oKxirIrtg13t8wW7pnDpCO3owWWqGh/hQsnMiDhjHchWAapYMYDUOaMQOgn9FYgtdOI8DwvtjrBdQ/4tH+HahkXSavsbcNSEzeFu+N+0+yAsJ59Qs5uOJVbpwQjuGCW7NqOYrphC8vxJZV2aY7Gd4Gv24+/iDA2xGnbJWKYEswDV/xeW2mgP+ARcfORk1aS3VAAAAAElFTkSuQmCC'

export const IMAGE_FAIL = 'data:image/png;base64,fail'

export function mockImageEvent() {
  const imageProto = global.Image.prototype
  const oldDescriptor = Object.getOwnPropertyDescriptor(imageProto, 'src')
  beforeAll(() => {
    Object.defineProperty(imageProto, 'src', {
      set(src) {
        const evt = !src || src === IMAGE_FAIL ? 'error' : 'load'
        const event = new Event(evt)
        nextTick(() => this.dispatchEvent(event))
      }
    })
  })
  afterAll(() => {
    Object.defineProperty(imageProto, 'src', oldDescriptor!)
  })
}
