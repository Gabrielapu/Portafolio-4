<template>
  <l-layer-group :visible="true" layerType="overlay" name="Bodegas" >
    <l-geo-json :geojson="geojson" :options="{
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
          icon: L.AwesomeMarkers.icon({
            icon: 'm',
            prefix: 'fa',
            markerColor: 'orange',
            iconColor: 'white',
          })
        });
      },
      onEachFeature: (feature, layer) => {
        layer.on('mouseover', function (e) {
          this.bindTooltip()
            .setTooltipContent(
              `<div class='flex text-sm'>
                <h1 class='font-semibold pr-1'>Nombre:</h1>
                <span>${feature.properties.name}</span>
              </div>`
            )
            .openTooltip();
          if(feature.geometry.type === 'GeometryCollection') {
            this.setStyle({
              ...feature.properties.highlight,
            })
          }          
        });
        layer.on('click', function (e) {
          featureData = feature
          ufm2Options.xaxis.categories = feature.properties.uf_m2.categories
          vacancyOptions.xaxis.categories = feature.properties.vacancy.categories
        });
        if(feature.geometry.type === 'GeometryCollection') {
          layer.on('add', function (e) {
            this.setStyle({
              ...feature.properties.styles,
            })
            this.bringToBack()
          });
          layer.on('mouseout', function (e) {
            this.setStyle({
              ...feature.properties.styles
            })
          });
        }        
      },
    }">
      <l-popup :options="{ minWidth: '600px' }" >
        <div v-if="featureData" class="overflow-x-auto max-h-[400px]">
          <div class='flex text-sm'>
            <h1 class='font-semibold pr-1'>Nombre:</h1>
            {{featureData.properties.name}}
            <h1 class='font-semibold pl-4'>GLA:</h1>
            {{featureData.properties.gla}}
          </div>
          <Divider />
          <apexchart            
            class="w-[600px] h-[300px]"
            type='line' 
            :options="vacancyOptions"
            :series="[featureData.properties.vacancy.series]"
          />
          <Divider class="my-4"/>
          <apexchart            
            class="w-[600px] h-[300px]"
            type='line' 
            :options="ufm2Options"
            :series="[featureData.properties.uf_m2.series]"
          />
        </div>
      </l-popup>
    </l-geo-json>
  </l-layer-group>
</template>

<script setup>
import { LLayerGroup, LGeoJson, LPopup } from "@vue-leaflet/vue-leaflet";
import L from 'leaflet'

const props = defineProps(['geojson'])
let featureData = ref(null)
let ufm2Options = reactive({
  chart: {
    type: 'line',
    toolbar: {
      show: false,
    },
  },
  title: {
    text: 'Evolución tarifa',
    align: 'center'
  },
  noData: {
    text: 'Sin datos',
  },  
  yaxis: {
    title: {
      text: 'Tarifa (UF/m2)'
    },
  },
  xaxis: {
    categories: [],
    title: {
      text: 'Semestre'
    },
  },
})
let vacancyOptions = reactive({
  chart: {
    type: 'line',
    toolbar: {
      show: false, // Hide the default toolbar
    },
  },
  title: {
    text: 'Vacancia',
    align: 'center'
  },
  noData: {
    text: 'Sin datos',
  },  
  yaxis: {
    title: {
      text: 'Vacancia (%)'
    },
  },
  xaxis: {
    categories: [],
    title: {
      text: 'Semestre'
    },
  },
})
</script>

<style scoped>
::-webkit-scrollbar {
  width: 5px;
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