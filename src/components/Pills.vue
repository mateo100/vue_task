<script setup lang="ts">
import Pill from '@/components/Pill.vue'

defineProps<{ elements: Array<{ name: string }> }>()
</script>

<template>
  <div class="flex flex-wrap mt-1">
    <Pill v-for="element in elements" :key="element" :name="element.name" />
  </div>
</template>
