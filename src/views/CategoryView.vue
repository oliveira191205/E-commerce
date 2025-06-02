<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4 text-center text-fuchsia-900"> {{ categoria }}</h2>
    <div class="max-w-7xl mx-auto">
      <div v-if="produtos.length" class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div 
          v-for="produto in produtos"
          :key="produto.id"
          class="bg-white rounded-2xl shadow-md transform transition duration-300 hover:-translate-y-2 hover:shadow-[0_10px_25px_rgba(168,85,247,0.4)] p-4 flex flex-col"
        >
          <img :src="produto.thumbnail" :alt="produto.title" class="rounded-xl object-cover h-48 w-full mb-4" />
          <h3 class="text-lg font-semibold text-gray-800 line-clamp-1">{{ produto.title }}</h3>
          <p class="mt-2 text-xl font-bold text-green-600">${{ produto.price }}</p> 
          <div class="mt-auto pt-4">
              <p class="text-sm">
                Estoque:
                <span
                  :class="produto.stock > 0 ? 'text-green-600 font-medium' : 'text-red-500 font-medium'"
                >
                  {{ produto.stock > 0 ? 'Disponível' : 'Indisponível' }}
                </span>
              </p>
              <router-link
                :to="`/produto/${produto.id}`"
                class="w-full mt-3 block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-sm font-medium transition"
              >
                Ver detalhes
              </router-link>
            </div>
        </div>
      </div>
    </div>
    </div>
    
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const categoria = ref(route.params.categoria)
const produtos = ref([])

const carregarProdutos = async () => {
  produtos.value = []
  const res = await fetch(`https://dummyjson.com/products/category/${categoria.value}`)
  const data = await res.json()
  produtos.value = data.products
}

// carrega ao entrar
onMounted(carregarProdutos)

// recarrega se trocar de categoria sem sair da página
watch(() => route.params.categoria, (nova) => {
  categoria.value = nova
  carregarProdutos()
})
</script>
