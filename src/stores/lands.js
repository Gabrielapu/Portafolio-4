import validateUrl from '../utils/validateUrl.js'
import { saveAs } from 'file-saver'

export const useLandStore = defineStore('landStore', () => {
  const lands = ref([])
  
  async function getLands() {
    const url = 'available_land/'
    const error  = 'Error al obtener los terrenos disponibles'
    const { data, status } = await validateUrl(url, error)
    if (status === 200) lands.value = data
    return status
  }

  async function createLand(land) {
    const url = 'available_land/'
    const error  = 'Error al guardar el terreno'
    const method = 'post'
    const { data, status } = await validateUrl(url, error, method, land)
    return { data, status }
  }

  async function updateLand(landId, body) {
    const url = `available_land/${landId}/`
    const error  = 'Error al actualizar el terreno'
    const method = 'put'
    const { data, status } = await validateUrl(url, error, method, body)
    return { data, status }
  }

  async function archiveLand(landId) {
    const url = `available_land/${landId}/`
    const error  = 'Error al archivar el terreno'
    const method = 'delete'
    const { status } = await validateUrl(url, error, method)
    return status
  }

  async function downloadExcel() {
    const url = 'available_land/get_land_file/'
    const error  = 'Error al descargar el excel'
    const responseType = 'blob'
    const { status, data } = await validateUrl(url, error, 'get', {}, responseType)
    if(status !== 404) saveAs(new Blob([data]), 'Terrenos.xlsx')
    return status
  }

  return { lands, getLands, createLand, updateLand, downloadExcel, archiveLand }
})
