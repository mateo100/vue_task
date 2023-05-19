<script setup lang="ts">
import Pill from '@/components/Pill.vue'

defineProps<{ sectors: Array<{ name: string }> }>()
</script>

<template>
  <div class="flex flex-wrap mt-1">
    <Pill v-for="sector in sectors" :key="sector" :name="sector.name" />
  </div>
</template>
