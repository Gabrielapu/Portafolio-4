<template>
  <l-layer-group :visible="true" layerType="overlay" name="Terrenos disponibles">
    <l-polygon 
      v-for="polygon in polygons"
      :key="polygon.id"
      :lat-lngs="polygon.coordinates" 
      :name="polygon.name"
      :color="polygon.styles?.color || 'orange'"
      :fillColor="polygon.styles?.fillColor || 'gray'"
      :fillOpacity="polygon.styles?.fillOpacity || 0.5"
      @mouseover="e => e.target.setStyle({...polygon.highlight})"
      @mouseout="e => e.target.setStyle({...polygon.styles})"
      @click="e => emit('click', { e, polygon })"        
    >
      <l-marker 
        v-if="polygon.marker" 
        :lat-lng="polygon.marker" 
        :options="{
          icon: L.AwesomeMarkers.icon({
            icon: 't',
            prefix: 'fa',
            markerColor: 'orange',
            iconColor: 'white',
          })
        }"  
      ></l-marker>
      <l-tooltip>
        <div class='text-sm max-w-lg'>
          <div class='flex'>
            <h1 class='font-semibold pr-1'>Nombre:</h1>
            <span>{{polygon.name}}</span>
          </div>
          <div class='flex'>
            <h1 class='font-semibold pr-1'>Scoring:</h1>
            <span>{{polygon.scoring}}</span>
          </div>
        </div>
      </l-tooltip>
    </l-polygon>
  </l-layer-group>
</template>

<script setup>
import { LLayerGroup, LPolygon, LMarker, LTooltip } from "@vue-leaflet/vue-leaflet";
import L from "leaflet";

const props = defineProps(['polygons'])
const emit = defineEmits(['click'])
</script>