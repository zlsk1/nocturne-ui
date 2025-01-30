<template>
  <n-tag
    v-for="(type, index) in ['primary', 'success', 'warning', 'danger', 'info']"
    :key="index"
    class="mr-2"
    :type="type"
    closable
    >{{ `Tag-${index + 1}` }}
  </n-tag>
</template>
