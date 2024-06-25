import validateUrl from '../utils/validateUrl.js'

export const useMetropolitanRegulatoryPlanStore = defineStore('MetropolitanRegulatoryPlanStore', () => {
  const regulatoryPlan = ref(null)
  
  async function getRegulatoryPlan () {
    const url = 'metropolitan_regulatory_plan/'
    const error  = 'Error al obtener el plano regulador metropolitano'
    const { data, status } = await validateUrl(url, error)
    if (status === 200) regulatoryPlan.value = data
    return status
  }

  return { regulatoryPlan, getRegulatoryPlan }
})
