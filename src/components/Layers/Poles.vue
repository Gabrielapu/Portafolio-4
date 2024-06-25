<template>
  <l-layer-group :visible="false" layerType="overlay" name="Polos" >
    <l-geo-json :geojson="geojson" :options="{
      onEachFeature: (feature, layer) => {
        layer.on('mouseover', function (e) {
          this.bindTooltip()
            .setTooltipContent(
              `<div class='text-sm max-w-lg'>
                <div class='flex'>
                  <h1 class='font-semibold pr-1'>Nombre:</h1>
                  <span>${feature.properties.name}</span>
                </div>
              </div>`
            )
            .openTooltip();
        });
        layer.on('add', function (e) {
          this.setStyle({
            ...feature.properties.styles
          })
          this.bringToBack()
        });
      },
    }"></l-geo-json>
  </l-layer-group>
</template>

<script setup>
import { LLayerGroup, LGeoJson } from "@vue-leaflet/vue-leaflet";

const props = defineProps(['geojson'])

</script>