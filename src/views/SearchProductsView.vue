<template>
  <div class="p-6 max-w-6xl mx-auto">
    <h2 class="text-2xl font-bold text-fuchsia-900 mb-4">Resultados da busca por "{{ termo }}" </h2>    
    <div v-if="produtos.length" class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div v-for="produto in produtos" :key="produto.id" class="bg-white p-4 rounded shadow">
        <img :src="produto.thumbnail" class="h-40 w-full object-cover mb-3 rounded" />
        <h3 class="text-lg font-semibold">{{ produto.title }}</h3>
        <p class="text-green-600 font-bold">${{ produto.price }}</p>
        <router-link
          :to="`/produto/${produto.id}`"
          class="block mt-2 bg-blue-600 text-white text-center py-1 rounded hover:bg-blue-700"
        >
          Ver detalhes
        </router-link>
      </div>
    </div>
    <p v-else>Nenhum produto encontrado.</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const produtos = ref([])
const route = useRoute()
const termo = ref(route.query.query || '')

const buscar = async () => {
  const res = await fetch('https://dummyjson.com/products/search?q=' + encodeURIComponent(termo.value))
  const data = await res.json()
  produtos.value = data.products
}

onMounted(buscar)

watch(() => route.query.query, nova => {
  termo.value = nova
  buscar()
})
</script>
