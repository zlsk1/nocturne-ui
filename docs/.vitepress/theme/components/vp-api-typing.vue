<script setup lang="ts">
import { RiErrorWarningLine as Warning } from '@remixicon/vue'

defineProps({
  type: String,
  details: String
})
</script>

<template>
  <span class="inline-flex items-center">
    <code class="api-typing mr-1">
      {{ type }}
    </code>
    <ClientOnly>
      <n-tooltip v-if="details" effect="light" trigger="click">
        <n-button :icon="Warning" class="p-2 text-4" style="border: none" />
        <template #content>
          <slot>
            <div class="m-1" style="max-width: 600px">
              <code
                style="
                  color: var(--code-tooltip-color);
                  background-color: var(--code-tooltip-bg-color);
                "
              >
                {{ details }}
              </code>
            </div>
          </slot>
        </template>
      </n-tooltip>
    </ClientOnly>
  </span>
</template>
