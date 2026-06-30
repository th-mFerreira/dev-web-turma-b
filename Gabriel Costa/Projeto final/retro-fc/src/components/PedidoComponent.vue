<template>
  <div>
    <div v-if="msg" :class="['alerta', tipoAlerta]">
      {{ msg }}
    </div>

    <form id="pedido-form" @submit="criarPedido($event)">
      <div class="coluna-imagem">
        <p id="nome-cliente-content">
          {{ camisaInfo && camisaInfo.nome ? camisaInfo.nome : "Selecione uma Camisa" }}
        </p>
        <img
          id="foto-content"
          :src="camisaInfo && camisaInfo.foto ? camisaInfo.foto : ''"
        />
      </div>
      
      <div class="coluna-opcoes">
        <div class="inputs">
          <label>Nome do Cliente</label>
          <input
            v-model="nomeCliente"
            type="text"
            id="nome-cliente"
          />
        </div>

        <div class="inputs">
          <label>Modelo e Tamanho da Camisa</label>
          <select v-model="tamanhoSelecionado" name="tamanho-camisa" id="tamanho-camisa">
            <option value="" selected>Selecione o modelo/tamanho</option>
            <option
              v-for="tamanho in listaTamanhos"
              :key="tamanho.id"
              :value="tamanho"
            >
              {{ tamanho.descricao }}
            </option>
          </select>
        </div>

        <div class="inputs">
          <label id="opcionais-titulo">Customize seu Manto</label>
          
          <label class="subtitulo">Patches e Personalização</label>
          <div class="grid-opcionais">
            <div v-for="patch in listaPatches" :key="patch.id" class="checkbox-container">
              <input
                type="checkbox"
                :name="patch.nome"
                :value="patch"
                v-model="listaPatchesSelecionados"
              />
              <span>{{ patch.nome }}</span>
            </div>
          </div>

          <label class="subtitulo">Embalagem Especial</label>
          <div class="grid-opcionais">
            <div v-for="embalagem in listaEmbalagens" :key="embalagem.id" class="checkbox-container">
              <input
                type="checkbox"
                :name="embalagem.nome"
                :value="embalagem"
                v-model="listaEmbalagensSelecionadas"
              />
              <span>{{ embalagem.nome }}</span>
            </div>
          </div>

          <div class="inputs" style="margin-top: 20px;">
            <input type="submit" class="submit-btn" value="Finalizar Encomenda" />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "PedidoComponent",
  props: {
    camisa: null,
    burguer: null,
  },
  data() {
    return {
      listaTamanhos: [],
      listaPatches: [],
      listaEmbalagens: [],
      nomeCliente: "",
      tamanhoSelecionado: "",
      listaPatchesSelecionados: [],
      listaEmbalagensSelecionadas: [],
      msg: null,
      tipoAlerta: "",
      camisaInfo: null,
    };
  },
  methods: {
    async getTamanhos() {
      const response = await fetch(`${this.$apiUrl}/tipos_pontos`);
      this.listaTamanhos = await response.json();
    },
    async getOpcionais() {
      const response = await fetch(`${this.$apiUrl}/opcionais`);
      const dados = await response.json();
      this.listaPatches = dados.complemento;
      this.listaEmbalagens = dados.bebidas;
    },
    carregarCamisa() {
      if (this.camisa) {
        this.camisaInfo = this.camisa;
        return;
      }
      if (this.burguer) {
        this.camisaInfo = this.burguer;
        return;
      }
      const queryData = this.$route.query.camisa || this.$route.query.burguer;
      if (queryData) {
        try {
          this.camisaInfo = JSON.parse(decodeURIComponent(queryData));
        } catch (e) {
          this.camisaInfo = null;
        }
      }
    },
    async criarPedido(e) {
      e.preventDefault();

      if (!this.nomeCliente.trim() || !this.tamanhoSelecionado) {
        this.msg = "Preencha o Nome do Cliente e o Modelo da camisa.";
        this.tipoAlerta = "alerta-vermelho";
        window.scrollTo(0, 0);
        setTimeout(() => (this.msg = null), 4000);
        return;
      }

      const dadosPedido = {
        nome: this.nomeCliente,
        ponto: this.tamanhoSelecionado,
        bebidas: Array.from(this.listaEmbalagensSelecionadas),
        complemento: Array.from(this.listaPatchesSelecionados),
        burguer: this.camisaInfo, 
        statusId: 1,
      };

      const dadosJson = JSON.stringify(dadosPedido);

      const req = await fetch(`${this.$apiUrl}/pedidos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dadosJson,
      });

      if (req.ok) {
        const res = await req.json();

        this.msg = `Encomenda Nº ${res.id} realizada!`;
        this.tipoAlerta = "alerta-verde";
        window.scrollTo(0, 0);

        this.nomeCliente = "";
        this.tamanhoSelecionado = "";
        this.listaPatchesSelecionados = [];
        this.listaEmbalagensSelecionadas = [];

        setTimeout(() => {
          this.msg = null;
          this.$router.push("/pedidos");
        }, 2000);
      }
    },
  },
  mounted() {
    this.getTamanhos();
    this.getOpcionais();
    this.carregarCamisa();
  },
};
</script>

<style scoped>
#pedido-form {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  max-width: 1000px;
  margin: 40px auto;
  background: #fff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}
.coluna-imagem {
  flex: 1;
  min-width: 300px;
  text-align: center;
}
#nome-hamburguer-content {
  font-size: 28px;
  font-weight: bold;
  color: #222;
  margin-bottom: 20px;
}
#foto-content {
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  object-fit: cover;
}
.coluna-opcoes {
  flex: 1.5;
  min-width: 300px;
  text-align: left;
}
.inputs {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
label {
  font-weight: bold;
  margin-bottom: 10px;
  color: #1a1a1a;
  padding-left: 10px;
  border-left: 4px solid #2980b9;
}
.subtitulo {
  font-size: 14px;
  color: #555;
  margin-top: 10px;
}
input[type="text"], select {
  padding: 12px;
  width: 100%;
  border: solid #ccc 1px;
  border-radius: 8px;
  font-size: 14px;
  background-color: #f8f9fa;
}
select {
  height: 45px;
}
.grid-opcionais {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 15px;
}
.checkbox-container {
  display: flex;
  align-items: center;
}
.checkbox-container span {
  margin-left: 8px;
  font-size: 14px;
  color: #333;
}
.submit-btn {
  background-color: #1a1a1a;
  color: #3498db;
  font-weight: bold;
  border: 1px solid #2980b9;
  font-size: 16px;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  width: 100%;
  transition: 0.3s;
}
.submit-btn:hover {
  background-color: #2980b9;
  color: #fff;
}
.alerta {
  padding: 15px;
  margin: 20px auto;
  max-width: 1000px;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
}
.alerta-vermelho {
  background-color: #ffcccc;
  color: #cc0000;
  border: 1px solid #cc0000;
}
.alerta-verde {
  background-color: #e5ffd9;
  color: #009900;
  border: 1px solid #009900;
}
</style>