import validateUrl from '../utils/validateUrl.js'

export const useCentersStore = defineStore('CentersStore', () => {
  const centers = ref(null)
  
  async function getCenters() {
    const url = 'center/'
    const error  = 'Error al obtener los centros'
    const { data, status } = await validateUrl(url, error)
    if (status === 200) centers.value = data
    return status
  }

  return { centers, getCenters }
})
