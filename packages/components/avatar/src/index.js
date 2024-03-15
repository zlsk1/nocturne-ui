export const avatarProps = {
  shape: {
    type: String,
    values: ['circle', 'square'],
    default: 'circle'
  },
  size: {
    type: [Number, String],
    values: ['large', 'default', 'small'],
    default: 'default'
  },
  icon: String,
  src: String,
  alt: String,
  fit: {
    type: String,
    values: ['fill', 'contain', 'cover', 'none', 'scale-down'],
    default: 'cover'
  }
}

export const avatarEmits = [
  'error'
]
