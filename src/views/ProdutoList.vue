<template>
  <div class="max-w-6xl mx-auto p-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
      <h1 class="text-3xl font-semibold text-gray-800">📚 Livros Disponíveis</h1>

      <div class="flex items-center gap-4">
        <!-- Ordenação -->
        <select v-model="ordenacao" @change="buscarProdutos"
          class="border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:ring focus:ring-blue-200">
          <option value="">Ordenar por</option>
          <option value="price_asc">Preço: menor para maior</option>
          <option value="price_desc">Preço: maior para menor</option>
        </select>

        <!-- Carrinho -->
        <div class="relative">
          <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 7h13L17 13M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z" />
          </svg>
          <span
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {{ carrinho.length }}
          </span>
        </div>
      </div>
    </div>

    <!-- Input de busca -->
    <div class="relative mb-6">
      <input type="text" v-model="busca" @input="buscarProdutos" placeholder="Buscar por nome..."
        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
      <svg class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none"
        stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 101.5 9a7.5 7.5 0 0015 0z" />
      </svg>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center items-center py-10">
      <div class="relative flex flex-col items-center">
        <div class="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        <p class="mt-4 text-blue-600 font-medium">Carregando livros...</p>
      </div>
    </div>

    <!-- Erro -->
    <div v-else-if="erro" class="text-red-600 text-center">
      ❌ {{ erro }}
    </div>

    <!-- Nenhum produto -->
    <div v-else-if="produtos.length === 0" class="text-center text-gray-500">
      🕵️ Nenhum livro encontrado.
    </div>

    <!-- Lista de produtos -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProdutoCard v-for="produto in produtos" :key="produto.id" :produto="produto"
        @add-carrinho="adicionarAoCarrinho" />
    </div>
  </div>
</template>

<script>
import ProdutoCard from '../components/ProdutoCard.vue'

export default {
  components: { ProdutoCard },
  data() {
    return {
      produtos: [],
      busca: '',
      ordenacao: '', // nova propriedade
      loading: false,
      erro: '',
      carrinho: []
    }
  },
  methods: {
    buscarProdutos() {
      this.loading = true
      this.erro = ''

      const params = new URLSearchParams()
      if (this.busca) params.append('search', this.busca)
      if (this.ordenacao) params.append('sort', this.ordenacao)

      fetch(`http://localhost/api/produtos.php?${params.toString()}`)
        .then(res => {
          if (!res.ok) throw new Error('Erro ao carregar produtos')
          return res.json()
        })
        .then(data => {
          this.produtos = data
        })
        .catch(err => {
          this.erro = err.message
        })
        .finally(() => {
          this.loading = false
        })
    },
    adicionarAoCarrinho(produto) {
      this.carrinho.push(produto)
    }
  },
  mounted() {
    this.buscarProdutos()
  }
}
</script>
