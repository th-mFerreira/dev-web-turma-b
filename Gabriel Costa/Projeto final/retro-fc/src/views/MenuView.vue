<template>
  <div>
    <div id="main-container">
      <div id="menu-titulo">
        <h2>Escolha seu Manto Retrô</h2>
      </div>

      <div id="menu-camisas">
        <div
          class="camisa-card"
          v-for="camisa in listaCamisas"
          :key="camisa.id"
        >
          <img :src="camisa.foto" class="camisa-img" />
          <div class="camisa-info">
            <h3>{{ camisa.nome }}</h3>
            <p>{{ camisa.descricao }}</p>
            <p class="valor">R$ {{ camisa.valor.toFixed(2) }}</p>
            <button @click="irParaConfiguracao(camisa)" class="btn-pedir">
              Customizar Camisa
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuView",
  data() {
    return {
      listaCamisas: [],
    };
  },
  methods: {
    async getCamisas() {
      const response = await fetch(`${this.$apiUrl}/menu`);
      const dados = await response.json();
      this.listaCamisas = dados.camisas || dados.burgues || dados;
    },
    irParaConfiguracao(camisa) {
      const camisaString = encodeURIComponent(JSON.stringify(camisa));
      this.$router.push({
        path: "/config-pedido",
        query: { 
          camisa: camisaString,
          burguer: camisaString 
        }, 
      });
    },
  },
  mounted() {
    this.getCamisas();
  },
};
</script>

<style scoped>
#main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
#menu-titulo {
  text-align: center;
  margin-bottom: 40px;
}
#menu-titulo h2 {
  font-size: 32px;
  color: #1a1a1a;
}
#menu-camisas {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
}
.camisa-card {
  width: 350px;
  border: 1px solid #e0e0e0;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  background-color: #fff;
}
.camisa-img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}
.camisa-info {
  padding: 20px;
  text-align: left;
}
.camisa-info h3 {
  font-size: 22px;
  margin-bottom: 10px;
  color: #1a1a1a;
}
.camisa-info p {
  font-size: 14px;
  color: #7f8c8d;
  margin-bottom: 15px;
  height: 60px;
  overflow: hidden;
}
.camisa-info .valor {
  font-size: 18px;
  font-weight: bold;
  color: #2980b9;
}
.btn-pedir {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #1a1a1a;
  color: #fff;
  border: 1px solid #2980b9;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}
.btn-pedir:hover {
  background-color: #2980b9;
  color: #fff;
}
</style>