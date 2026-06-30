<template>
  <div class="container-detalhes">
    <button class="btn-voltar" @click="voltar">← Voltar para a Lista</button>
    
    <div class="header-deputado">
      <img :src="deputado.urlFoto" :alt="deputado.nome" class="foto-grande" />
      <div class="info-deputado">
        <h2>{{ deputado.nome }}</h2>
        <p class="sub-info">{{ deputado.siglaPartido }} - {{ deputado.siglaUf }}</p>
        <p class="email-info"><strong>Contato:</strong> {{ deputado.email || 'Não disponível' }}</p>
      </div>
    </div>

    <h3>Despesas Declaradas (Últimas 15)</h3>
    <div class="tabela-container">
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Tipo da Despesa</th>
            <th>Valor</th>
            <th>Documento Original</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(gasto, index) in despesas" :key="index">
            <td>{{ formatarData(gasto.dataDocumento) }}</td>
            <td>{{ gasto.tipoDespesa }}</td>
            <td class="valor-gasto">{{ formatarValor(gasto.valorLiquido) }}</td>
            <td>
              <a 
                v-if="gasto.urlDocumento" 
                :href="gasto.urlDocumento" 
                target="_blank" 
                class="btn-doc"
              >
                Ver Original ↗
              </a>
              <span v-else class="Sem-doc">Não disponível</span>
            </td>
          </tr>
          <tr v-if="despesas.length === 0">
            <td colspan="4" style="text-align: center; color: #888;">Nenhuma despesa encontrada ou carregando...</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetalhesDeputado',
  props: {
    deputado: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      despesas: []
    }
  },
  mounted() {
    this.carregarDespesas()
  },
  methods: {
    carregarDespesas() {
      // Usando o atalho do Proxy '/api-camara' configurado no vue.config.js para burlar o CORS
      let url = '/api-camara/api/v2/deputados/' + this.deputado.id + '/despesas?ordem=DESC&ordenarPor=ano&itens=15'
      
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.despesas = data.dados
        })
        .catch(error => {
          console.error("Erro ao buscar despesas:", error)
        })
    },
    voltar() {
      this.$emit('voltar')
    },
    // Formata a data de YYYY-MM-DD para DD/MM/AAAA
    formatarData(dataStr) {
      if (!dataStr) return '---'
      const partes = dataStr.split('-')
      if (partes.length === 3) {
        return `${partes[2]}/${partes[1]}/${partes[0]}`
      }
      return dataStr
    },
    // Formata o valor numérico para a moeda corrente brasileira R$
    formatarValor(valor) {
      if (valor === undefined || valor === null) return 'R$ 0,00'
      return Number(valor).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
    }
  }
}
</script>

<style scoped>
.container-detalhes {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}
.btn-voltar {
  padding: 10px 20px;
  background-color: #555;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
  font-weight: bold;
  transition: background-color 0.2s;
}
.btn-voltar:hover {
  background-color: #333;
}
.header-deputado {
  display: flex;
  background-color: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  gap: 25px;
  align-items: center;
  margin-bottom: 30px;
}
.foto-grande {
  width: 130px;
  height: 130px;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid #ddd;
}
.info-deputado h2 {
  margin: 0 0 10px 0;
  color: #333;
}
.sub-info {
  font-size: 20px;
  font-weight: bold;
  color: #0f4c81;
  margin: 0 0 10px 0;
}
.email-info {
  color: #666;
  margin: 0;
}
.tabela-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  overflow-x: auto;
  margin-bottom: 40px;
}
table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}
th, td {
  padding: 14px 18px;
  border-bottom: 1px solid #ddd;
  font-size: 15px;
}
th {
  background-color: #f5f5f5;
  color: #333;
  font-weight: bold;
}
.valor-gasto {
  font-weight: bold;
  color: #c62828;
}
.btn-doc {
  display: inline-block;
  padding: 6px 12px;
  background-color: #0f4c81;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 13px;
  font-weight: bold;
}
.btn-doc:hover {
  background-color: #0b3c66;
}
.sem-doc {
  color: #999;
  font-style: italic;
}
</style>