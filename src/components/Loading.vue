<template>
  <div class="loading-overlay">
    <div class="spinner"></div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
}
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.5em;
}

.spinner {
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 5px solid white;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
