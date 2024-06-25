import validateUrl from '../utils/validateUrl.js'

export const useCorridorStore = defineStore('CorridorStore', () => {
  const corridors = ref(null)
  const corridorsSimpleList = ref(null)
  
  async function getCorridors() {
    const url = 'corridor/'
    const error  = 'Error al obtener los corredores'
    const { data, status } = await validateUrl(url, error)
    if (status === 200) corridors.value = data
    return status
  }

  async function getCorridorsSimpleList() {
    const url = 'corridor/list_simple/'
    const error  = 'Error al obtener lista simple de corredores'
    const { data, status } = await validateUrl(url, error)
    if (status === 200) corridorsSimpleList.value = data
    return status
  }

  async function uploadDemand(file) {
    const url = 'corridor/upload_demand/'
    const error  = 'Error al subir la demanda'
    const method = 'post'
    const bodyFormData = new FormData()
    bodyFormData.append('file', file)
    const { status } = await validateUrl(url, error, method, bodyFormData)
    return status
  }

  return { corridors, getCorridors, corridorsSimpleList, getCorridorsSimpleList, uploadDemand }
})
