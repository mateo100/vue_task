<script setup lang="ts">
import { InvestorDTO } from '@/api/investors.types'
import { computed, PropType, ref } from 'vue'
import Pills from '@/components/Pills.vue'

const MAX_SECTORS_DISPLAY = 5
const props = defineProps({
  investor: {
    type: Object as PropType<InvestorDTO>,
    required: true,
  },
})
const investorDetailsUrl = computed(() =>
  props.investor ? `/investor/${props.investor.id}` : '/'
)
const displayedSectors = computed(() =>
  props.investor.sectors.slice(0, MAX_SECTORS_DISPLAY)
)
const remainingSectorCount = computed(
  () => props.investor.sectors.length - displayedSectors.value.length
)
const remainingSectors = computed(() =>
  props.investor.sectors.slice(MAX_SECTORS_DISPLAY)
)

const showAllSectors = ref(false)

function toggleShowAllSectors() {
  showAllSectors.value = !showAllSectors.value
}
</script>

<template>
  <div class="border rounded-lg bg-blue-50 border-blue-100 p-4">
    <h3 class="text-base font-semibold">
      <router-link :to="investorDetailsUrl">{{ investor.name }}</router-link>
    </h3>
    <div class="mt-2">
      <strong>Stages:</strong>
      <Pills :elements="investor.stages" />
    </div>
    <div class="mt-2">
      <strong>Sectors:</strong>
      <Pills :elements="displayedSectors" />
      <div v-if="remainingSectorCount > 0" class="mt-2">
        <button
          @click="toggleShowAllSectors"
          class="text-blue-500 hover:underline focus:outline-none"
        >
          {{ showAllSectors ? 'Show less' : `+${remainingSectorCount} more` }}
        </button>
      </div>
    </div>
    <Pills
      v-if="showAllSectors && remainingSectorCount > 0"
      :elements="remainingSectors"
    />
  </div>
</template>
