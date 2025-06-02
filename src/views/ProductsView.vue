<template>
  <div class="p-6 max-w-4xl mx-auto justify-center justify-items-center">
    <h1 class="text-2xl font-bold text-fuchsia-900 mb-4 text-center">{{ produto.title }}</h1>
    <img :src="produto.thumbnail" :alt="produto.title" class="rounded-xl w-3/5 h-3/5 object-cover mb-6  " />
    <p class="text-gray-700 text-lg mb-2">Descrição: {{ produto.description }}</p>
    <p class="text-xl text-green-600 font-semibold">Preço: ${{ produto.price }}</p>
    <p class="mt-2">
      Estoque:
      <span :class="produto.stock > 0 ? 'text-green-600' : 'text-red-500'">
        {{ produto.stock > 0 ? 'Disponível' : 'Indisponível' }}
      </span>
    </p>
    <div class="flex gap-3 ">
      <button class="rounded-lg p-3 mt-3  bg-fuchsia-900 text-white hover:bg-fuchsia-400 hover:text-black flex  ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6  mr-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
        Adicionar ao Carrinho
        </button> 
      <button class="rounded-lg p-3 mt-3  bg-fuchsia-900 text-white hover:bg-fuchsia-400 hover:text-black flex">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 mr-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
        </svg>
        Compartilhar 
      </button> 
      </div>
    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const produto = ref({})

onMounted(async () => {
  const res = await fetch(`https://dummyjson.com/products/${route.params.id}`)
  produto.value = await res.json()
})
</script>

