export const paginationProps = {
  pageCount: [Number, String],
  background: {
    type: Boolean,
    default: false
  },
  small: {
    type: Boolean,
    default: false
  },
  layout: {
    type: String,
    values: ['prev', 'pages', 'next', 'jumper', 'total'],
    default: 'prev, pages, next'
  }
}

export const paginationEmits = [
  'changePage'
]
