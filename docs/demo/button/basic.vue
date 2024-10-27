<template>
  <div class="mb-4">
    <n-button>Defualt</n-button>
    <n-button type="primary">Primary</n-button>
    <n-button type="danger">Danger</n-button>
    <n-button type="warning">Warning</n-button>
    <n-button type="info">Info</n-button>
    <n-button type="success">Success</n-button>
  </div>
  <div class="mb-4">
    <n-button plain>Defualt</n-button>
    <n-button type="primary" plain>Primary</n-button>
    <n-button type="danger" plain>Danger</n-button>
    <n-button type="warning" plain>Warning</n-button>
    <n-button type="info" plain>Info</n-button>
    <n-button type="success" plain>Success</n-button>
  </div>
  <div class="mb-4">
    <n-button round>Circle</n-button>
    <n-button type="primary" round>Primary</n-button>
    <n-button type="danger" round>Danger</n-button>
    <n-button type="warning" round>Warning</n-button>
    <n-button type="info" round>Info</n-button>
    <n-button type="success" round>Success</n-button>
  </div>
  <div class="mb-4">
    <n-button circle :icon="Search"></n-button>
    <n-button type="primary" circle :icon="Upload"></n-button>
    <n-button type="danger" circle :icon="Delete"></n-button>
    <n-button type="warning" circle :icon="Walk"></n-button>
    <n-button type="info" circle :icon="CodeView"></n-button>
    <n-button type="success"circle :icon="Game"></n-button>
  </div>
  <div>
    <n-button text>Default</n-button>
    <n-button type="primary" text>Primary</n-button>
    <n-button type="danger" text>Danger</n-button>
    <n-button type="warning" text>Warning</n-button>
    <n-button type="info" text>Info</n-button>
    <n-button type="success"text>Success</n-button>
  </div>
</template>

<script lang="ts" setup>
import {
  RiSearchLine as Search,
  RiUploadLine as Upload,
  RiDeleteBinLine as Delete,
  RiWalkLine as Walk,
  RiCodeView as CodeView,
  RiGameLine as Game
} from '@remixicon/vue'
</script>
