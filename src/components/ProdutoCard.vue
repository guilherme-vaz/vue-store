<template>
  <div class="bg-white rounded-2xl shadow hover:shadow-lg transition-all p-4 flex flex-col">
    <img
      :src="produto.imagem || 'https://via.placeholder.com/300x200?text=Livro'"
      alt="Capa do livro"
      class="w-full h-56 object-cover rounded-lg mb-3"
    />

    <h2 class="text-lg font-semibold text-gray-800 line-clamp-2">
      {{ produto.nome }}
    </h2>
    <p class="text-gray-600 text-sm mt-1 line-clamp-3">
      {{ produto.descricao }}
    </p>

    <div class="mt-auto flex items-center justify-between pt-4">
      <div class="text-blue-600 font-bold text-lg">
        {{ formatarPreco(produto.preco) }}
      </div>
      <button
        @click="$emit('add-carrinho', produto)"
        class="bg-orange-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-xl text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-200"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 7h13L17 13M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z"
          />
        </svg>
        <span>Comprar</span>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  produto: Object
})

function formatarPreco(preco) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(preco)
}
</script>
