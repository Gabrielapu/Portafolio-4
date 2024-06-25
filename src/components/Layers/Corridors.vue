<template>
  <l-layer-group :visible="false" layerType="overlay" name="Corredores" >
    <l-geo-json :geojson="geojson" :options="{
      onEachFeature: (feature, layer) => {
        layer.on('mouseover', function (e) {
          this.bindTooltip()
            .setTooltipContent(
              `<l-tooltip>
                <h1 class='font-semibold text-sm pr-1'> 
                  Corredor: ${feature.properties.zone}
                </h1>
              </l-tooltip>`
            )
            .openTooltip();
        });
        layer.on('click', function (e) {
          featureData = feature
          rentOptions.xaxis.categories = feature.properties.rent.categories
          vacancyOptions.xaxis.categories = feature.properties.vacancy.categories
          productionOptions.xaxis.categories = feature.properties.vacancy.categories
        });
        layer.on('add', function (e) {
          this.setStyle({
            ...feature.properties.styles
          })
          this.bringToBack()
        });
      },
    }">
      <l-popup :options="{ minWidth: '600px' }" >
        <div v-if="featureData" class="overflow-x-auto max-h-[550px]">
          <div class='flex'>
            <h1 class='font-semibold pr-1'>Demanda anualizada:</h1>
            <span>{{ useThousandSeparator(featureData.properties.annualized_demand) }} m2</span>
          </div>
          <Divider class="my-2"/>
          <apexchart            
            :width="600"
            :height="300"
            type="line"
            :options="productionOptions"
            :series="featureData.properties.vacancy.series.slice(0,2)"
          />
          <apexchart            
            :width="600"
            :height="200"
            type="line"
            :options="vacancyOptions"
            :series="featureData.properties.vacancy.series.slice(2,3)"
          />
          <Divider class="py-0.5"/>
          <apexchart            
            :width="600"
            :height="400"
            :options="rentOptions"
            :series="featureData.properties.rent.series"
          />
        </div>
      </l-popup>
    </l-geo-json>
  </l-layer-group>         
</template>

<script setup>
import { LLayerGroup, LGeoJson, LPopup } from "@vue-leaflet/vue-leaflet";
import useThousandSeparator from '@/composables/useThousandSeparator'

const props = defineProps(['geojson'])
let featureData = ref(null)
let vacancyOptions = reactive({
  chart: {
    id: 'vacancy-chart',
    group: 'vacancy',
    type: 'line',
    toolbar: {
      show: false,
    },
  },
  stroke: {
    width: 4
  },
  zoom: {
    enabled: false
  },
  yaxis: {
    title: {
      text: 'Vacancia (%)',
      style: {
        fontFamily: 'Inter',
        fontSize: '14px',
      }
    },
    labels: {
      width: 40,
    }
  },
  xaxis: {
    categories: [],
    title: {
      text: 'Semestre'
    },
  },
})

let productionOptions = reactive({
  chart: {
    id: 'vacancy-chart',
    group: 'vacancy',
    type: 'line',
    toolbar: {
      show: false,
    },
  },
  stroke: {
    width: [1, 1]
  },
  zoom: {
    enabled: false
  },
  title: {
    text: 'Evolución del mercado',
    align: 'center'
  },
  noData: {
    text: 'Sin datos',
  },  
  yaxis: {
    title: {
      text: 'Produccion y absorción (m2)',
      style: {
        fontFamily: 'Inter',
        fontSize: '14px',
      }
    },
    labels: {
      minWidth: 40,
      formatter: (value) => {
        if(value) return useThousandSeparator(value.toFixed(0))
      }
    }
  },
  xaxis: {
    categories: [],
  },
})

let rentOptions = reactive({
  chart: {
    type: 'line',
    toolbar: {
      show: false,
    },
  },
  stroke: {
    width: [1,4]
  },
  legend: {
    itemMargin: {
      vertical: 20
    },
    onItemClick: {
      toggleDataSeries: false
    }
  },
  zoom: {
    enabled: false
  },
  title: {
    text: 'Evolución del mercado',
    align: 'center'
  },
  noData: {
    text: 'Sin datos',
  },  
  yaxis: [
    {
      title: {
        text: 'Inventario (m2)',
        style: {
          fontFamily: 'Inter',
          fontSize: '14px',
        }
      },
      labels: {
        formatter: (value) => {
          return useThousandSeparator(value.toFixed(0))
        }
      }
    }, 
    {
      opposite: true,
      title: {
        text: 'Valor arriendo (UF/m2)',
        style: {
          fontFamily: 'Inter',
          fontSize: '14px',
        }
      }
    }
  ],
  xaxis: {
    categories: [],
    title: {
      text: 'Semestre'
    },
  },
})
</script>
