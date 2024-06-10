<template>
  <div class="fr-pagination__total">
    总共{{ total }}
  </div>
</template>

<script lang="ts" setup>
import { totalProps } from './total'

defineProps(totalProps)
</script>
