<script setup>
import { GoogleMap, CustomMarker } from 'vue3-google-map'
import { ref, onMounted, onUpdated } from 'vue'
const api = 'AIzaSyAkNF2jDmfg-aJFFAwkxOLisnqmtkcHoV0'

const socket = ref(null)
const messages = ref([])
const center = ref({ lat: 41.3484387, lng: 69.3473392 })

onMounted(() => {
  socket.value = new WebSocket('wss://ocpp.voltautouz/station-status')
  socket.value.onmessage = (event) => {
    messages.value.push(JSON.parse(event.data))
  }
})
</script>

<template>
  <div class="">
    <div class="rounded-2xl overflow-hidden !w-full">
      <GoogleMap class="g-maps" :api-key="api" style="width: 100%; height: 400px" :center="center" :zoom="10">
        <CustomMarker
          v-for="item in messages[1]"
          :key="index"
          :options="{
            position: { lat: +item.lat, lng: +item.long },
          }"
        >
          <div v-if="item.connector_1 === 'Available' && item.connector_2 === 'Available'" style="text-align: center">
            <img src="/src/assets/green-change.svg" width="35" height="35" loading="lazy" />
          </div>
        </CustomMarker>

        <CustomMarker
          v-for="item in messages[1]"
          :key="index"
          :options="{
            position: { lat: +item.lat, lng: +item.long },
          }"
        >
          <div
            v-if="
              (item.connector_1 === 'Available' && item.connector_2 === 'Charging') ||
              (item.connector_1 === 'Charging' && item.connector_2 === 'Available') ||
              (item.connector_1 === 'Available' && item.connector_2 === 'Preparing') ||
              (item.connector_1 === 'Preparing' && item.connector_2 === 'Available')
            "
            style="text-align: center"
          >
            <img src="/src/assets/half-change-3.svg" width="35" height="35" loading="lazy" />
          </div>
        </CustomMarker>

        <CustomMarker
          v-for="item in messages[1]"
          :key="index"
          :options="{
            position: { lat: +item.lat, lng: +item.long },
          }"
        >
          <div v-if="item.connector_1 === 'NotWorking' && item.connector_2 === 'NotWorking'" style="text-align: center">
            <img src="/src/assets/red-change.svg" width="35" height="35" loading="lazy" />
          </div>
        </CustomMarker>

        <CustomMarker
          v-for="item in messages[1]"
          :key="index"
          :options="{
            position: { lat: +item.lat, lng: +item.long },
          }"
        >
          <div
            v-if="
              (item.connector_1 === 'Charging' && item.connector_2 === 'Charging') ||
              (item.connector_1 === 'Preparing' && item.connector_2 === 'Preparing') ||
              (item.connector_1 === 'Charging' && item.connector_2 === 'Preparing') ||
              (item.connector_1 === 'Preparing' && item.connector_2 === 'Charging')
            "
            style="text-align: center"
          >
            <img src="/src/assets/yellow-change.svg" width="35" height="35" loading="lazy" />
          </div>
        </CustomMarker>
      </GoogleMap>
    </div>
  </div>
</template>

<style>
.g-maps {
  height: 400px;
}
.g-maps a {
  display: none !important;
}
</style>
