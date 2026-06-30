<template>
  <div id="app">
    <header class="main-header">
      <h1>Portal da Transparência Parlamentar</h1>
    </header>
    <main>
      <ListaDeputados 
        v-if="telaAtual === 'lista'" 
        @selecionar-deputado="verDetalhes"
      />
      
      <DetalhesDeputado 
        v-if="telaAtual === 'detalhes'" 
        :deputado="deputadoSelecionado" 
        @voltar="irParaLista"
      />
    </main>
  </div>
</template>

<script>
import ListaDeputados from './components/ListaDeputados.vue'
import DetalhesDeputado from './components/DetalhesDeputado.vue'

export default {
  name: 'App',
  components: {
    ListaDeputados,
    DetalhesDeputado
  },
  data() {
    return {
      telaAtual: 'lista',
      deputadoSelecionado: null
    }
  },
  methods: {
    verDetalhes(deputado) {
      this.deputadoSelecionado = deputado
      this.telaAtual = 'detalhes'
    },
    irParaLista() {
      this.deputadoSelecionado = null
      this.telaAtual = 'lista'
    }
  }
}
</script>

<style>
.main-header {
  background-color: #0f4c81;
  color: white;
  padding: 20px;
  text-align: center;
  font-family: Arial, sans-serif;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f4f7f6;
}
</style>