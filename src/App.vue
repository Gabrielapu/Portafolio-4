<template>
  <div v-if="route.name !== 'login'">
    <RouterView />
  </div>
  <div v-else class="background w-screen h-screen flex flex-row items-center justify-center">
    <RouterView />
  </div>
</template>

<script setup>
const route = useRoute()
</script>

<style scoped>
.background {
  background-image: url(../src/assets/background.png);
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100vh;
}
</style>