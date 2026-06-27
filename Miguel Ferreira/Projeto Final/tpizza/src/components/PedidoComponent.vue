<template>
  <div class="pedido-wrapper">
    <form id="pedido-form" @submit="criarPedido">
      <div v-if="mensagem" class="alerta" :class="tipoMensagem">
        <span>{{ iconeMensagem }}</span>
        {{ mensagem }}
      </div>

      <div class="pizza-destaque">
        <img
          id="foto-content"
          :src="burguer && burguer.foto ? burguer.foto : ''"
          :alt="burguer && burguer.nome ? burguer.nome : 'Pizza selecionada'"
        />

        <div class="pizza-info">
          <p id="nome-hamburguer-content">
            {{ burguer && burguer.nome ? burguer.nome : "Selecione uma pizza" }}
          </p>

          <p v-if="burguer && burguer.valor" class="preco-pizza">
            R$ {{ burguer.valor }},00
          </p>
        </div>
      </div>

      <div class="form-card">
        <div class="inputs">
          <label>Nome do Cliente</label>
          <input
            v-model="nomeCliente"
            type="text"
            placeholder="Digite seu nome"
            id="nome-cliente"
          />
        </div>

        <div class="inputs">
          <label>Tipo de Massa</label>
          <select v-model="pontoCarneSelecionado" id="ponto-carne">
            <option value="">Selecione a massa</option>

            <option
              v-for="pontoCarne in listaPontosCarne"
              :key="pontoCarne.id"
              :value="pontoCarne"
            >
              {{ pontoCarne.descricao }}
            </option>
          </select>
        </div>

        <div class="inputs">
          <label>Adicionais</label>
          <p class="descricao-grupo">Escolha os adicionais da pizza</p>

          <div class="opcoes-grid">
            <div
              v-for="complemento in listaComplementos"
              :key="complemento.id"
              class="checkbox-container"
            >
              <input
                type="checkbox"
                :id="'complemento-' + complemento.id"
                :name="complemento.nome"
                :value="complemento"
                v-model="listaComplementosSelecionados"
              />

              <label :for="'complemento-' + complemento.id" class="checkbox-label">
                {{ complemento.nome }}
              </label>
            </div>
          </div>
        </div>

        <div class="inputs">
          <label>Bebidas</label>

          <div class="opcoes-grid">
            <div
              v-for="bebida in listaBebidas"
              :key="bebida.id"
              class="checkbox-container"
            >
              <input
                type="checkbox"
                :id="'bebida-' + bebida.id"
                :name="bebida.nome"
                :value="bebida"
                v-model="listaBebidasSelecionadas"
              />

              <label :for="'bebida-' + bebida.id" class="checkbox-label">
                {{ bebida.nome }}
              </label>
            </div>
          </div>
        </div>

        <div class="inputs">
          <input type="submit" class="submit-btn" value="Confirmar Pedido" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "PedidoComponent",

  props: {
    burguer: null,
  },

  data() {
    return {
      listaPontosCarne: [],
      listaComplementos: [],
      listaBebidas: [],

      nomeCliente: "",
      pontoCarneSelecionado: "",

      listaComplementosSelecionados: [],
      listaBebidasSelecionadas: [],

      mensagem: "",
      tipoMensagem: "",
    };
  },

  computed: {
    iconeMensagem() {
      if (this.tipoMensagem === "sucesso") return "✅";
      if (this.tipoMensagem === "erro") return "❌";
      if (this.tipoMensagem === "aviso") return "⚠️";
      if (this.tipoMensagem === "info") return "ℹ️";
      return "";
    },
  },

  methods: {
    async getTiposPontos() {
      const response = await fetch(`${this.$apiUrl}/tipos_pontos`);
      const dados = await response.json();
      this.listaPontosCarne = dados;
    },

    async getOpcionais() {
      const response = await fetch(`${this.$apiUrl}/opcionais`);
      const dados = await response.json();

      this.listaComplementos = dados.complemento;
      this.listaBebidas = dados.bebidas;
    },

    mostrarMensagem(texto, tipo) {
      this.mensagem = texto;
      this.tipoMensagem = tipo;
    },

    async criarPedido(e) {
      e.preventDefault();

      if (!this.burguer) {
        this.mostrarMensagem("Selecione uma pizza no cardápio antes de confirmar o pedido.", "aviso");
        return;
      }

      if (!this.nomeCliente.trim()) {
        this.mostrarMensagem("Informe o nome do cliente.", "erro");
        return;
      }

      if (!this.pontoCarneSelecionado) {
        this.mostrarMensagem("Selecione o tipo de massa.", "erro");
        return;
      }

      const dadosPedido = {
        nome: this.nomeCliente,
        ponto: this.pontoCarneSelecionado,
        bebidas: [...this.listaBebidasSelecionadas],
        complemento: [...this.listaComplementosSelecionados],
        burguer: this.burguer,
        statusId: 5,
      };

      await fetch(`${this.$apiUrl}/pedidos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosPedido),
      });

      this.mostrarMensagem("Pedido realizado com sucesso! Redirecionando para a lista de pedidos.", "sucesso");

      this.nomeCliente = "";
      this.pontoCarneSelecionado = "";
      this.listaComplementosSelecionados = [];
      this.listaBebidasSelecionadas = [];

      setTimeout(() => {
        this.$router.push("/pedidos");
      }, 1400);
    },
  },

  mounted() {
    this.getTiposPontos();
    this.getOpcionais();
  },
};
</script>

<style scoped>
.pedido-wrapper {
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px 16px 40px;
}

#pedido-form {
  width: 100%;
}

.pizza-destaque {
  position: relative;
  margin-bottom: 24px;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
}

#foto-content {
  display: block;
  width: 100%;
  height: 260px;
  object-fit: cover;
}

.pizza-info {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 24px;
  box-sizing: border-box;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.78), rgba(0, 0, 0, 0.15));
}

#nome-hamburguer-content {
  margin: 0;
  color: #fff;
  font-size: 38px;
  font-weight: bold;
}

.preco-pizza {
  margin: 8px 0 0;
  color: #ffd54f;
  font-size: 24px;
  font-weight: bold;
}

.form-card {
  background: #fff;
  padding: 28px;
  border-radius: 18px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.12);
}

.inputs {
  display: flex;
  flex-direction: column;
  margin-bottom: 22px;
}

label {
  font-weight: bold;
  margin-bottom: 10px;
  color: #222;
  padding: 5px 12px;
  display: flex;
  border-left: 4px solid #c62828;
}

input,
select {
  padding: 12px;
  width: 100%;
  max-width: 420px;
  border: solid #222 1px;
  border-radius: 8px;
  font-size: 15px;
  box-sizing: border-box;
}

select {
  height: 46px;
  background: white;
}

.descricao-grupo {
  margin: -4px 0 14px;
  color: #555;
  font-size: 14px;
}

.opcoes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 12px;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 12px;
}

.checkbox-container input {
  width: auto;
  max-width: none;
  height: auto;
  cursor: pointer;
}

.checkbox-label {
  margin: 0;
  padding: 0;
  border: none;
  font-weight: bold;
  color: #222;
  cursor: pointer;
}

.submit-btn {
  background-color: #222;
  color: #ffd54f;
  font-weight: bold;
  border: none;
  font-size: 18px;
  border-radius: 12px;
  padding: 16px;
  margin-top: 8px;
  cursor: pointer;
  width: 100%;
  max-width: none;
  height: auto;
  transition: 0.3s;
}

.submit-btn:hover {
  background-color: #c62828;
  color: #fff;
}

.alerta {
  width: 100%;
  padding: 16px 18px;
  margin: 0 0 20px;
  border-radius: 10px;
  font-size: 17px;
  font-weight: bold;
  text-align: center;
  box-sizing: border-box;
  color: white;
  border: none;
}

.sucesso {
  background: #2e7d32;
}

.erro {
  background: #d32f2f;
}

.aviso {
  background: #ef6c00;
}

.info {
  background: #1565c0;
}

@media (max-width: 700px) {
  #foto-content {
    height: 200px;
  }

  #nome-hamburguer-content {
    font-size: 28px;
  }

  .form-card {
    padding: 18px;
  }
}
</style>