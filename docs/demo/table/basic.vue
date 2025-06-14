<template>
  <n-table :columns="columns" :data="dataSource" />
</template>

<script lang="ts" setup>
const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号'
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号'
  }
]

const columns = [
  {
    title: '姓名',
    dataKey: 'name',
    key: 'name'
  },
  {
    title: '年龄',
    dataKey: 'age',
    key: 'age'
  },
  {
    title: '住址',
    dataKey: 'address',
    key: 'address'
  }
]
</script>
