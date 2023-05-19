<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{ name: string }>()
</script>

<template>
  <span
    class="inline-flex items-center mr-2 mb-2 px-2 py-1 bg-gray-200 rounded-lg text-gray-800"
  >
    {{ name }}
  </span>
</template>
