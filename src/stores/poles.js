import validateUrl from '../utils/validateUrl.js'

export const usePolesStore = defineStore('PolesStore', () => {
  const poles = ref(null)
  const polesListSimple = ref(null)
  
  async function getPoles() {
    const url = 'pole/'
    const error  = 'Error al obtener los polos'
    const { data, status } = await validateUrl(url, error)
    if (status === 200) poles.value = data
    return status
  }

  async function getPolesListSimple() {
    const url = 'pole/list_simple/'
    const error  = 'Error al obtener lista simple de polos'
    const { data, status } = await validateUrl(url, error)
    if (status === 200) polesListSimple.value = data
    return status
  }

  return { poles, polesListSimple, getPoles, getPolesListSimple }
})
