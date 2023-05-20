<script setup lang="ts">
import { useInvestorsStore } from '@/stores/investorsStore'
import { usePaginate } from '@/hooks/usePaginate'
import { InvestorDTO } from '@/api/investors.types'
import { reactive, computed } from 'vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { STAGES } from '@/consts'
import InvestorItem from '@/pages/Investors/InvestorItem.vue'
import FilterSelect from '@/components/FilterSelect.vue'
import Pagination from '@/components/common/Pagination/Pagination.vue'

const store = useInvestorsStore()

const filters = reactive({
  search: '',
  stages: [],
})

const filteredInvestors = computed(() => {
  return store.investors.filter((investor) => {
    const matchesSearch =
      !filters.search ||
      investor.name.toLowerCase().includes(filters.search.toLowerCase())
    const matchesStage =
      !filters.stages.length ||
      investor.stages.some((stage) => filters.stages.includes(stage.name))
    return matchesSearch && matchesStage
  })
})

const pageSize = 10
const { pageObjects, setPage } = usePaginate<InvestorDTO>(filteredInvestors, {
  pageSize,
})

const stageOptions = STAGES.map((stage) => ({ value: stage, label: stage }))
</script>

<template>
  <div class="p-8">
    <h1 class="text-lg font-semibold">Investors</h1>
    <p v-if="store.fetchInProgress">Loading ...</p>

    <div class="my-8 flex">
      <div class="relative">
        <MagnifyingGlassIcon
          class="h-5 w-5 absolute top-[12px] left-[10px] text-gray-400"
          aria-hidden="true"
        />
        <input
          class="border rounded-lg bg-blue-50 p-2 pl-10 text-gray-500"
          v-model="filters.search"
          placeholder="Search by name"
        />
      </div>
      <FilterSelect
        v-model="filters.stages"
        :options="stageOptions"
        class="ml-4"
      />
    </div>
    <div v-for="investor in pageObjects" :key="investor.id" class="my-4">
      <InvestorItem :investor="investor" />
    </div>
    <Pagination
      :total="filteredInvestors.length"
      :pageSize="pageSize"
      @change="setPage"
    />
  </div>
</template>
