<template>
  <div class="w-full flex">
    <div class="flex flex-col justify-between">
      <MainForm 
        class="h-[100vh] overflow-y-auto"
        :polygon="polygonOnEdit" 
        @update:polygon="saveChanges()" 
        @deletePolygon="deletePolygon()"
        @clearForm="onClearForm()"
      />
    </div>
    <div class="w-full flex flex-col">
      <NavBar />
      <div class="w-full">
        <l-map
          ref="myMap"
          style="height: 93vh; width: 100%" 
          :zoom="zoom" 
          :center="center" 
          @ready="e => onMapReady(e)"
        >
          <l-control-layers position="topright"></l-control-layers>
          <l-tile-layer
            v-for="tileProvider in tileProviders"
            :key="tileProvider.name"
            :name="tileProvider.name"
            :visible="tileProvider.visible"
            :url="tileProvider.url"
            :attribution="tileProvider.attribution"
            :subdomains="tileProvider.subdomains"
            layer-type="base"
          />
          <CommunalPlan :geojson="communalPlanStore.communalPlan"/>
          <MetropolitanPlan :geojson="regulatoryPlanStore.regulatoryPlan"/>
          <Megacenters :geojson="megacenters"/>
          <Competitors :geojson="competitors"/>
          <Density :geojson="densityStore.densities"/>          
          <Roads :geojson="roadStore.roads"/>
          <Lands :polygons="polygons" @click="({e, polygon}) => onPolygonClick(e, polygon)"/>
          <Warehouses :geojson="warehouseStore.warehouses"/>         
          <Corridors :geojson="corridorsStore.corridors"/> 
          <Poles :geojson="polesStore.poles"/>
        </l-map>
      </div>
    </div>
  </div>
</template>

<script setup>
import { LMap, LTileLayer, LControlLayers } from "@vue-leaflet/vue-leaflet";

const landStore = useLandStore()
const roadStore = useRoadStore()
const regulatoryPlanStore = useMetropolitanRegulatoryPlanStore()
const communalPlanStore = useCommunalRegulatoryPlanStore()
const warehouseStore = useWarehouseStore()
const densityStore = useDensityStore()
const corridorsStore = useCorridorStore()
const centersStore = useCentersStore()
const polesStore = usePolesStore()
const loading = ref(false)
const zoom = ref(14)
const center = [-33.437005, -70.662137]
const myMap = ref(null)
const polygonOnEdit = ref(null)
const currentPolygon = ref(null)
const polygons = ref([])
const megacenters = ref(null)
const competitors = ref(null)

const tileProviders = [
  {
    name: 'Street',
    visible: true,
    attribution:
      '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  },
  {
    name: 'Satellite',
    visible: false,
    url: 'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    attribution:
      'Map data: Google, Maxar Technologies',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  },
]

onBeforeMount(async () => {
  loading.value = true  
  await corridorsStore.getCorridorsSimpleList()
  await landStore.getLands()
  polygons.value = landStore.lands
  await polesStore.getPolesListSimple()
  await polesStore.getPoles()
  await centersStore.getCenters()
  megacenters.value = centersStore.centers.megacenters
  competitors.value = centersStore.centers.competitors
  await corridorsStore.getCorridors()
  await roadStore.getRoads()
  await warehouseStore.getWarehouses()
  await communalPlanStore.getCommunalPlan()
  await regulatoryPlanStore.getRegulatoryPlan()
  await densityStore.getDensities()
  loading.value = false
})

const onClearForm = () => {
  if(currentPolygon.value) {
    currentPolygon.value.target.pm.disable()
  }
  polygonOnEdit.value = null
}

const saveChanges = () => {
  currentPolygon.value.target.pm.disable()
  polygonOnEdit.value = null
}

const onPolygonClick = (e, polygon) => {
  if(currentPolygon.value) {
    currentPolygon.value.target.pm.disable()
  }
  currentPolygon.value = e
  e.target.pm.enable()
  e.target.on('pm:edit', (e) => { 
    polygon.coordinates = e.target._latlngs[0]
  })
  polygonOnEdit.value = polygon
}

const deletePolygon = () => {
  polygons.value = polygons.value.filter(polygon => polygon.id !== polygonOnEdit.value.id)
  polygonOnEdit.value = null
}

const onMapReady = () => {
  myMap.value.leafletObject.pm.addControls({  
    position: 'topleft',
    drawMarker: false,
    drawPolygon: true,
    editMode: false,
    dragMode: false,
    drawCircleMarker: false,
    drawPolyline: false,
    drawRectangle: false,
    drawCircle: false,
    drawText: false,
    cutPolygon: false,
    removalMode: false,
    rotateMode: false,
  })  

  myMap.value.leafletObject.on("pm:create", (e) => {
    if(currentPolygon.value) {
      polygonOnEdit.value = null
      currentPolygon.value.target.pm.disable()
    }
    if(e.shape === 'Polygon') {
      polygons.value.push({
        id: `Temporal ${e.layer._leaflet_id}`,
        name: `Poligono ${e.layer._leaflet_id}`,
        coordinates: e.layer._latlngs[0],
      })
      e.layer.remove()
    }
  });
}

</script>

<style scoped>
.edit-icon {
  background-image: url('../src/assets/edit.svg');
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #999999;
}
::-webkit-scrollbar-thumb:hover {
  background: #757575;
}
</style>