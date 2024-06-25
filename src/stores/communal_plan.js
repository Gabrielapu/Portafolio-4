import validateUrl from '../utils/validateUrl.js'

export const useCommunalRegulatoryPlanStore = defineStore('CommunalRegulatoryPlanStore', () => {
  const communalPlan = ref(null)
  
  async function getCommunalPlan() {
    const url = 'communal_regulatory_plan/'
    const error  = 'Error al obtener el plano regulador comunal'
    const { data, status } = await validateUrl(url, error)
    if (status === 200) communalPlan.value = data
    return status
  }

  return { communalPlan, getCommunalPlan }
})
