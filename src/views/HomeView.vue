<template>
  <div class="px-6 py-8 bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold mb-8 text-center text-fuchsia-900">Catálogo de Produtos</h1>

      <!--filtro-->
      <div class="mb-6 flex justify-end">
        <select
          v-model="criterioOrdenacao"
          class="border border-fuchsia-700 text-sm rounded-md px-4 py-2 text-gray-700 shadow transition-all duration-300 hover:shadow-[0_0_10px_rgba(168,85,247,0.7)] focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
        >
          <option value="">Ordenar</option>
          <option value="preco-asc">Preço ↑</option>
          <option value="preco-desc">Preço ↓</option>
          <option value="nome-asc">Nome A-Z</option>
          <option value="nome-desc">Nome Z-A</option>
        </select>
      </div>

      <div v-if="loading" class="text-center text-gray-600">Carregando produtos...</div>

      <div v-else>
        <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div
            v-for="product in paginatedProducts"
            :key="product.id"
            class="bg-white rounded-2xl shadow-md transform transition duration-300 hover:-translate-y-2 hover:shadow-[0_10px_25px_rgba(168,85,247,0.4)] p-4 flex flex-col"
          >
            <img
              :src="product.thumbnail"
              :alt="product.title"
              class="rounded-xl object-cover h-48 w-full mb-4"
            />
            <h2 class="text-lg font-semibold text-gray-800 line-clamp-1">{{ product.title }}</h2>
            <p class="text-sm text-gray-500 capitalize">{{ product.category }}</p>

            <div class="mt-2 text-xl font-bold text-green-600">$ {{ product.price }}</div>

            <div class="mt-auto pt-4">
              <p class="text-sm">
                Estoque:
                <span
                  :class="product.stock > 0 ? 'text-green-600 font-medium' : 'text-red-500 font-medium'"
                >
                  {{ product.stock > 0 ? 'Disponível' : 'Indisponível' }}
                </span>
              </p>
              <router-link
                :to="`/produto/${product.id}`"
                class="w-full mt-3 block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-sm font-medium transition"
              >
                Ver detalhes
              </router-link>
            </div>
          </div>
        </div>

        <!-- Paginação -->
        <div class="flex justify-center mt-8 space-x-4">
          <button
            class="px-4 py-2 bg-fuchsia-700 text-white rounded disabled:opacity-50"
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            Anterior
          </button>

          <span class="px-4 py-2 text-gray-700">
            Página {{ currentPage }} de {{ totalPages }}
          </span>

          <button
            class="px-4 py-2 bg-fuchsia-700 text-white rounded disabled:opacity-50"
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import axios from 'axios'

const products = ref([])
const loading = ref(true)
const currentPage = ref(1)
const itemsPerPage = 12

//ordenacao
const criterioOrdenacao = ref('')

const productsOrdenados = computed(() => {
  let lista = [...products.value]
  switch (criterioOrdenacao.value) {
    case 'preco-asc':
      return lista.sort((a, b) => a.price - b.price)
    case 'preco-desc':
      return lista.sort((a, b) => b.price - a.price)
    case 'nome-asc':
      return lista.sort((a, b) => a.title.localeCompare(b.title))
    case 'nome-desc':
      return lista.sort((a, b) => b.title.localeCompare(a.title))
    default:
      return lista
  }
})

//paginacao
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return productsOrdenados.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(productsOrdenados.value.length / itemsPerPage))

watch(criterioOrdenacao, () => {
  currentPage.value = 1
})

onMounted(async () => {
  try {
    const res = await axios.get('https://dummyjson.com/products?limit=100')
    products.value = res.data.products
  } catch (err) {
    console.error('Erro ao carregar produtos:', err)
  } finally {
    loading.value = false
  }
})
</script>




