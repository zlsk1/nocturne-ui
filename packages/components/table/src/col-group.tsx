import { isNumber } from '@nocturne-ui/utils'
import type { TableProps } from './props'

export interface ColGroupProps {
  columns?: TableProps['columns']
  colWidths?: Array<number | string>
}

const ColGroup = ({ columns = [], colWidths = [] }: ColGroupProps) => {
  const cols = []
  const len = columns.length

  for (let i = 0; i < len; i++) {
    const width = colWidths[i]

    cols.push(
      <col key={i} style={{ width: isNumber(width) ? `${width}px` : width }} />
    )
  }

  return <colgroup>{cols}</colgroup>
}

export default ColGroup
