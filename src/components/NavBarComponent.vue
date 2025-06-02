<template> 
  <div>
    <nav class="bg-fuchsia-900 text-white py-4 px-6 flex justify-between items-center">
      <h1 class="text-lg font-bold font-Counter">E-commerce</h1>

      <ul class="flex gap-9 items-center">
        <li class="hover:bg-fuchsia-500 hover:text-black p-1 rounded">
          <router-link to="/" class="hover:bg-fucshia-400 hover:text-black">Home</router-link>
        </li>

          <!--Parte de escolha da categoria-->
        <li class="relative" @mouseenter="dropdownVisible = true" @mouseleave="dropdownVisible = false">
          <button class="focus:outline-none hover:bg-fuchsia-400 hover:text-black p-1 rounded">
            Categorias
          </button>
          <ul
            v-if="dropdownVisible"
            class="absolute right-0 top-full bg-fuchsia-900 text-white rounded shadow-lg max-w-[90vw] w-[700px] max-h-[70vh] overflow-y-auto z-20 p-2 grid gap-2"
            style="grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));"
          >
            <li 
              v-for="categoria in categorias"
              :key="categoria"
              class="px-4 py-2 hover:bg-fuchsia-500 hover:text-black cursor-pointer rounded"
            >
              <router-link :to="`/category/${categoria}`" @click="dropdownVisible = false">
                {{ categoria }}
              </router-link>
            </li>
          </ul>
        </li>

        <!--Busca-->
        <li>
          <div class="relative">
            <input
              v-model="busca"
              @input="buscarProdutos"
              type="text"
              placeholder="Buscar produtos..."
              class="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-black"
            />
            <!-- Ícone de lupa -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
        </li>
      </ul>
    </nav>
    
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const categorias = ref([])
const dropdownVisible = ref(false)

const produtos = ref([])
const criterioOrdenacao = ref('')

const busca = ref('')
const router = useRouter()
let timeout = null

const ListCategory = async () => {
  const res = await fetch('https://dummyjson.com/products/category-list') 
  const data = await res.json()
  categorias.value = data
}

const carregarProdutos = async () => {
  const res = await fetch('https://dummyjson.com/products')
  const data = await res.json()
  produtos.value = data.products
}

const buscarProdutos = () => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    if (busca.value.trim().length > 0) {
      router.push(`/buscar?query=${encodeURIComponent(busca.value)}`)
    }
  }, 500)
}

onMounted(() => {
  ListCategory()
  carregarProdutos()
})
</script>

