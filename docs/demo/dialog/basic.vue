<template>
  <n-button plain @click="dialogVisible = true">
    Click to open the Dialog
  </n-button>

  <n-dialog v-model="dialogVisible" title="Tips" width="500">
    <span class="text-sm">it is a dialog</span>
    <template #footer>
      <div class="dialog-footer">
        <n-button @click="dialogVisible = false">Ok</n-button>
      </div>
    </template>
  </n-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const dialogVisible = ref(false)
</script>
