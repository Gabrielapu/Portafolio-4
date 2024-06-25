<template>
  <l-layer-group :visible="true" layerType="overlay" name="Estudio de bodegas" >
    <l-geo-json :geojson="geojson" :options="{
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
          icon: L.AwesomeMarkers.icon({
            icon: 'b',
            prefix: 'fa',
            markerColor: 'darkblue',
            iconColor: 'white',
          })
        });
      },
      onEachFeature: (feature, layer) => {
        layer.on('mouseover', function (e) {
          this.bindTooltip()
            .setTooltipContent(
              `<div class='text-sm max-w-lg'>
                <div class='flex'>
                  <h1 class='font-semibold pr-1'>Propietario SII</h1>
                  <span>${feature.properties.owner || '-'}</span>
                </div>
                <div class='flex'>
                  <h1 class='font-semibold pr-1'>Usuario:</h1>
                  <span>${feature.properties.user || '-'}</span>
                </div>
                <div class='flex'>
                  <h1 class='font-semibold pr-1'>Dirección:</h1>
                  <span>${feature.properties.address || '-'}</span>
                </div>
                <div class='flex'>
                  <h1 class='font-semibold pr-1'>Superficie construida:</h1>
                  <span>${feature.properties.builded_surface || '-'}</span>
                </div>
              </div>`
            )
            .openTooltip();
          this.setStyle({
            ...feature.properties.hightlight
          })
        });
        layer.on('click', function (e) {
          this.bindPopup()
            .setPopupContent(
              `<div class='text-sm max-w-2xl'>
                <div class='flex'>
                  <h1 class='font-semibold pr-1'>Propietario SII</h1>
                  <span>${feature.properties.owner || '-'}</span>
                </div>
                <div class='flex'>
                  <h1 class='font-semibold pr-1'>Usuario:</h1>
                  <span>${feature.properties.user || '-'}</span>
                </div>
                <div class='flex'>
                  <h1 class='font-semibold pr-1'>Dirección:</h1>
                  <span>${feature.properties.address || '-'}</span>
                </div>
                <div class='flex'>
                  <h1 class='font-semibold pr-1'>Superficie construida:</h1>
                  <span>${feature.properties.builded_surface || '-'}</span>
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
import L from 'leaflet'
import { LLayerGroup, LGeoJson } from "@vue-leaflet/vue-leaflet";

const props = defineProps(['geojson'])
</script>