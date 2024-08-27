import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePriceStore = defineStore('priceStore', {
  state: () => ({
    dynamicPrice: null,
    // Store only a single piece of data
  }),
  actions: {
    setPrice(priceData) {
      this.dynamicPrice = priceData
      console.log(priceData)
    },
  },
})

export const useSocketStore = defineStore('socketStore', {
  state: () => ({
    socket: null,
    // Store only a single piece of data
  }),
  actions: {
    setSocket(socketData) {
      this.socket = socketData
      console.log(socketData)
    },
  },
})
