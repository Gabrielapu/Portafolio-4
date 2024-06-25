import validateUrl from '../utils/validateUrl.js'

export const useDensityStore = defineStore('DensityStore', () => {
  const densities = ref(null)
  
  async function getDensities() {
    const url = 'density/'
    const error  = 'Error al obtener las densidades'
    const { data, status } = await validateUrl(url, error)
    if (status === 200) densities.value = data
    return status
  }

  return { densities, getDensities }
})
