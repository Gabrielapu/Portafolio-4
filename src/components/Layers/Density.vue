<template>
  <l-layer-group :visible="false" layerType="overlay" name="Densidad poblacional" >
    <l-geo-json :geojson="geojson" :options="{
      onEachFeature: (feature, layer) => {
        layer.on('mouseover', function (e) {
          this.bindTooltip()
            .setTooltipContent(
              `<div class='text-sm max-w-lg'>
                <div class='flex'>
                  <h1 class='font-semibold pr-1'>Densidad poblacional:</h1>
                  <span>${feature.properties.density || '-'}</span>
                </div>
                <div class='flex'>
                  <h1 class='font-semibold pr-1'>Total viviendas:</h1>
                  <span>${feature.properties.total_houses || '-'}</span>
                </div>
              </div>`
            )
            .openTooltip();
          this.setStyle({
            ...feature.properties.highlight,
          })
        });
        layer.on('click', function (e) {
          this.bindPopup()
            .setPopupContent(
              `<div class='text-sm max-w-lg'>
                <div class='flex'>
                  <h1 class='font-semibold pr-1'>Densidad poblacional:</h1>
                  <span>${feature.properties.density || '-'}</span>
                </div>
                <div class='flex'>
                  <h1 class='font-semibold pr-1'>Total viviendas:</h1>
                  <span>${feature.properties.total_houses || '-'}</span>
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
        layer.on('mouseout', function (e) {
          this.setStyle({
            ...feature.properties.styles
          })
        });
      },
    }"></l-geo-json>
  </l-layer-group>
</template>

<script setup>
import { LLayerGroup, LGeoJson } from "@vue-leaflet/vue-leaflet";

const props = defineProps(['geojson'])

</script>