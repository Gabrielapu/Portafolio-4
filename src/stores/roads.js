import validateUrl from '../utils/validateUrl.js'

export const useRoadStore = defineStore('RoadStore', () => {
  const roads = ref(null)
  
  async function getRoads() {
    const url = 'road/'
    const error  = 'Error al obtener las carreteras'
    const { data, status } = await validateUrl(url, error)
    if (status === 200) roads.value = data
    return status
  }

  return { roads, getRoads }
})
