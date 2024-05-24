export const roleTypes = [
  'dialog',
  'grid',
  'group',
  'listbox',
  'menu',
  'navigation',
  'tooltip',
  'tree'
]

export const popperProps = {
  role: {
    type: String,
    values: roleTypes,
    default: 'tooltip'
  }
}

