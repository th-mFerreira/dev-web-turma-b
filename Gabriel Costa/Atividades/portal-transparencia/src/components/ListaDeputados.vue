<template>
  <div class="container">
    <div class="busca-container">
      <input 
        type="text" 
        v-model="nomeBusca" 
        placeholder="Digite o nome do deputado..." 
        @keydown.enter="buscarDeputados"
      />
      <button @click="buscarDeputados">Buscar</button>
    </div>

    <div class="grid-deputados">
      <div 
        class="card-deputado" 
        v-for="deputado in deputados" 
        :key="deputado.id" 
        @click="selecionar(deputado)"
      >
        <img :src="deputado.urlFoto" :alt="deputado.nome" class="foto-perfil" />
        <h3>{{ deputado.nome }}</h3>
        <p class="partido-uf">{{ deputado.siglaPartido }} - {{ deputado.siglaUf }}</p>
        <p class="email">{{ deputado.email || 'E-mail não disponível' }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListaDeputados',
  data() {
    return {
      nomeBusca: '',
      deputados: []
    }
  },
  mounted() {
    this.buscarDeputados()
  },
  methods: {
    buscarDeputados() {
      // Usando o atalho do Proxy '/api-camara' configurado no vue.config.js para burlar o CORS
      let url = '/api-camara/api/v2/deputados?ordem=ASC&ordenarPor=nome'
      
      if (this.nomeBusca) {
        url += '&nome=' + encodeURIComponent(this.nomeBusca)
      }
      
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.deputados = data.dados
        })
        .catch(error => {
          console.error("Erro ao buscar deputados:", error)
        })
    },
    selecionar(deputado) {
      this.$emit('selecionar-deputado',...[deputado])
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
.busca-container {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  justify-content: center;
}
.busca-container input {
  padding: 12px;
  width: 350px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}
.busca-container button {
  padding: 12px 24px;
  background-color: #2e7d32;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}
.busca-container button:hover {
  background-color: #1b5e20;
}
.grid-deputados {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}
.card-deputado {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}
.card-deputado:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}
.foto-perfil {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
  border: 3px solid #f0f0f0;
}
.partido-uf {
  font-weight: bold;
  color: #1565c0;
  margin: 5px 0;
}
.email {
  font-size: 13px;
  color: #666;
  word-break: break-all;
  margin-top: 10px;
}
</style>