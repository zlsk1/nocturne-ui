export const statisticProps = {
  value: {
    type: [Number, Object],
    default: 0
  },
  title: String,
  suffixIcon: String,
  prefixIcon: String,
  precision: {
    type: Number,
    default: 0
  },
  valueStyle: [String, Object],
  formatter: Function
}