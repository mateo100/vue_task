<script setup lang="ts">
import { useInvestorsStore } from '@/stores/investorsStore'
const store = useInvestorsStore()
if (!store.initialFetchDone) store.fetch()
</script>

<template>
  <router-view />
</template>
