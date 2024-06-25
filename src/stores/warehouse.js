import validateUrl from '../utils/validateUrl.js'

export const useWarehouseStore = defineStore('WarehouseStore', () => {
  const warehouses = ref(null)
  
  async function getWarehouses() {
    const url = 'warehouse/'
    const error  = 'Error al obtener los almacenes'
    const { data, status } = await validateUrl(url, error)
    if (status === 200) warehouses.value = data
    return status
  }

  return { warehouses, getWarehouses }
})
