<template>
  <n-tag
    v-for="(type, index) in ['primary', 'success', 'warning', 'danger', 'info']"
    :key="index"
    class="mr-2"
    :type="type"
    >{{ `Tag-${index + 1}` }}
  </n-tag>
</template>
