<template>
  <div>
    <div class="container">
      <div class="rounded-2xl overflow-hidden w-[100%]">
        <GoogleMap @click="handleClick" id="map" class="g-maps" ref="mapRef" :api-key="api" :center="center" :zoom="12">
          <Marker :options="markerOptions" />
        </GoogleMap>
      </div>
      <div class="flex gap-4 mt-5 w-full">
        <div class="flex flex-col gap-2 w-[50%]">
          <label>Lat</label>
          <el-input v-model="center.lat" placeholder="lat" />
        </div>

        <div class="flex flex-col gap-2 w-[50%]">
          <label>Lang</label>
          <el-input v-model="center.lng" placeholder="lang" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { GoogleMap, Marker } from 'vue3-google-map'
import { ref, watch, defineProps, defineEmits } from 'vue'
const api = 'AIzaSyAkNF2jDmfg-aJFFAwkxOLisnqmtkcHoV0'

const props = defineProps(['lat', 'lng'])
const center = ref({ lat: props.lat, lng: props.lng })
const markerOptions = ref({ position: center })

const handleClick = (event) => {
  center.value = { lat: +event.latLng.lat().toFixed(6), lng: +event.latLng.lng().toFixed(6) }
  markerOptions.value = { position: center.value }
}
</script>

<style scoped>
.g-maps {
  height: 400px;
}

.g-maps a {
  display: none !important;
}
</style>
