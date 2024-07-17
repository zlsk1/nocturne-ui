<template>
  <div class="n-pagination__total">
    总共{{ total }}条
  </div>
</template>

<script lang="ts" setup>
import { totalProps } from './total'

defineProps(totalProps)
</script>
