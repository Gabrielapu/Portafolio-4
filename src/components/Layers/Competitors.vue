<template>
  <l-layer-group :visible="true" layerType="overlay" name="Competencia" >
    <l-geo-json :geojson="geojson" :options="{
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
          icon: L.AwesomeMarkers.icon({
            icon: 'c',
            prefix: 'fa',
            markerColor: '#EF4444',
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
          this.setStyle({
            ...feature.properties.highlight,
          })
        });
        layer.on('click', function(e) {
          this.bindPopup()
            .setPopupContent(
              `<div class='text-sm max-w-2xl min-w-[300px]'>
                <div class='flex'>
                  <h1 class='font-semibold pr-1'>Nombre:</h1>
                  <span>${feature.properties.name}</span>
                </div>
                <div class='flex'>
                  <h1 class='font-semibold pr-1'>Dirección:</h1>
                  <span>${feature.properties.address}</span>
                </div>
                <div class='flex'>
                  <h1 class='font-semibold pr-1'>GLA actual:</h1>
                  <span>${feature.properties.gla}</span>
                </div>
                <div class='flex'>
                  <h1 class='font-semibold pr-1'>GLA proyectado:</h1>
                  <span>${feature.properties.proyected_gla || '-'}</span>
                </div>
              </div>`
            )
            .openPopup();
        });
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
      },
    }"></l-geo-json>
  </l-layer-group>
</template>

<script setup>
import { LLayerGroup, LGeoJson } from "@vue-leaflet/vue-leaflet";
import L from 'leaflet'

const props = defineProps(['geojson'])
</script>