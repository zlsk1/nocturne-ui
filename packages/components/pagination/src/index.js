export const paginationProps = {
  pageCount: Number,
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
  },
  total: Number,
  pageSize: {
    type: Number,
    default: 10
  },
  maxPages: {
    type: Number,
    default: 7
  },
  defaultPage: {
    type: Number,
    default: 1
  },
  currentPage: Number,
  nextText: String,
  prevText: String,
  jumperText: String
}

export const paginationEmits = [
  'changePage',
  'clickPrev',
  'clickNext',
  'update:current-page'
]
