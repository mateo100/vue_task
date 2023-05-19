import { ref } from 'vue'
import { InvestorDTO } from '@/api/investors.types'
import { defineStore } from 'pinia'
import { fetchInvestors } from '@/api'

export const useInvestorsStore = defineStore('investors', () => {
  const investors = ref<InvestorDTO[]>([])
  const fetchInProgress = ref(false)
  const initialFetchDone = ref(false)

  const fetch = async () => {
    fetchInProgress.value = true
    investors.value = await fetchInvestors()
    fetchInProgress.value = false
    initialFetchDone.value = true
  }

  const getById = (investorId: number) => {
    return investors.value.filter((i) => i.id === investorId)[0]
  }

  return {
    investors,
    fetchInProgress,
    initialFetchDone,
    fetch,
    getById,
  }
})
