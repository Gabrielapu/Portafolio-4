<template>
  <l-layer-group :visible="false" layerType="overlay" name="Carreteras" >
    <l-geo-json :geojson="geojson" :options="{
      onEachFeature: (feature, layer) => {
        layer.on('mouseover', function (e) {
          this.bindTooltip()
            .setTooltipContent(
              `<div class='text-sm max-w-lg'>
                <div class='flex'>
                  <h1 class='font-semibold pr-1'>Calle:</h1>
                  <span>${feature.properties.name || '-'}</span>
                </div>
                <div class='flex'>
                  <h1 class='font-semibold pr-1'>Tipo:</h1>
                  <span>${feature.properties.road_type || '-'}</span>
                </div>
              </div>`
            )
            .openTooltip();
        });
        layer.on('click', function (e) {
          this.bindPopup()
            .setPopupContent(
              `<div class='text-sm max-w-lg'>
                <div class='flex'>
                  <h1 class='font-semibold pr-1'>Calle:</h1>
                  <span>${feature.properties.name || '-'}</span>
                </div>
                <div class='flex'>
                  <h1 class='font-semibold pr-1'>Tipo:</h1>
                  <span>${feature.properties.road_type || '-'}</span>
                </div>
              </div>`
            )
            .openPopup();
        });
        layer.on('add', function (e) {
          this.setStyle({
            ...feature.properties.styles
          })
          this.bringToBack()
        });
      },
    }">
    </l-geo-json>
  </l-layer-group>   
</template>

<script setup>
import { LLayerGroup, LGeoJson } from "@vue-leaflet/vue-leaflet";

const props = defineProps(['geojson'])
</script>