<template>
  <l-layer-group :visible="false" layerType="overlay" name="Plan regulador comunal" >
    <l-geo-json :geojson="geojson" :options="{
      onEachFeature: (feature, layer) => {
        layer.on('mouseover', function (e) {
          this.bindTooltip()
            .setTooltipContent(
              `<div class='text-sm max-w-lg min-w-[400px]'>
                <div class='flex'>
                  <h1 class='font-semibold pr-1'>Nombre zona:</h1>
                  <span>${feature.properties.name || '-'}</span>
                </div>
                <div class='flex'>
                  <h1 class='font-semibold pr-1'>Usos permitidos:</h1>
                  <span class='whitespace-pre-line'>
                    ${feature.properties.permitted_uses || '-'}
                  </span>
                </div>
                <div class='flex'>
                  <h1 class='font-semibold pr-1'>Tipo bodegaje:</h1>
                  <span>${feature.properties.type || '-'}</span>
                </div>
                <div class='flex'>
                  <h1 class='font-semibold pr-1'>Residencial:</h1>
                  <span>${feature.properties.residential? 'Verdadero' : 'Falso'}</span>
                </div>
                <div class='flex'>
                  <h1 class='font-semibold pr-1'>C. Constructibilidad:</h1>
                  <span>${feature.properties.constructability_coefficient}</span>
                </div>
                <div class='flex'>
                  <h1 class='font-semibold pr-1'>C. Uso de suelo:</h1>
                  <span>${feature.properties.soil_coefficient}</span>
                </div>
                <div class='flex'>
                  <h1 class='font-semibold pr-1'>Altura máxima:</h1>
                  <span>${feature.properties.max_height}</span>
                </div>
              </div>`
            )
            .openTooltip();
          this.setStyle({
            ...feature.properties.highlight,
          })
        });
        layer.on('click', function(e) {
          this.bindPopup()
            .setPopupContent(
              `<div class='text-sm max-w-2xl min-w-[300px]'>
                <div class='flex'>
                  <h1 class='font-semibold pr-1'>Nombre zona:</h1>
                  <span>${feature.properties.name || '-'}</span>
                </div>
                <div class='flex'>
                  <h1 class='font-semibold pr-1'>Usos permitidos:</h1>
                  <span class='whitespace-pre-line'>
                    ${feature.properties.permitted_uses || '-'}
                  </span>
                </div>
                <div class='flex'>
                  <h1 class='font-semibold pr-1'>Tipo bodegaje:</h1>
                  <span>${feature.properties.type || '-'}</span>
                </div>
                <div class='flex'>
                  <h1 class='font-semibold pr-1'>Residencial:</h1>
                  <span>${feature.properties.residential? 'Verdadero' : 'Falso'}</span>
                </div>
                <div class='flex'>
                  <h1 class='font-semibold pr-1'>C. Constructibilidad:</h1>
                  <span>${feature.properties.constructability_coefficient}</span>
                </div>
                <div class='flex'>
                  <h1 class='font-semibold pr-1'>C. Uso de suelo:</h1>
                  <span>${feature.properties.soil_coefficient}</span>
                </div>
                <div class='flex'>
                  <h1 class='font-semibold pr-1'>Altura máxima:</h1>
                  <span>${feature.properties.max_height}</span>
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