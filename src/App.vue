<template>
  <div class="flex flex-col min-h-screen">
  <NavBar />

  <main class="flex-1">
    <router-view />
  </main>

  <Footer></Footer>
</div>

</template>

<script setup>
import NavBar from './components/NavBarComponent.vue'
import Footer from './components/FooterComponent.vue'
</script>
