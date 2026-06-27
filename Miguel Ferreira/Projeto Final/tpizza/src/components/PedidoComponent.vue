<template>
  <div>
    <form id="pedido-form" @submit="criarPedido($event)">

      <div
  v-if="mensagem"
  class="alerta"
  :class="tipoMensagem"
>
        {{ mensagem }}
      </div>

      <div>
        <p id="nome-hamburguer-content">
          {{ burguer && burguer.nome ? burguer.nome : "--" }}
        </p>

        <img
          id="foto-content"
          :src="burguer && burguer.foto ? burguer.foto : ''"
        />
      </div>

      <div class="inputs" id="form-pedido">
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

        <select
          v-model="pontoCarneSelecionado"
          id="ponto-carne"
        >
          <option value="">
            Selecione a massa
          </option>

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

        <label id="opcionais-titulo">
          Adicionais
        </label>

        <label id="opcionais-subtitulo">
          Escolha os adicionais da pizza
        </label>

        <div
          v-for="complemento in listaComplementos"
          :key="complemento.id"
          class="checkbox-container"
        >
          <input
            type="checkbox"
            :name="complemento.nome"
            :value="complemento"
            v-model="listaComplementosSelecionados"
          />

          <span>
            {{ complemento.nome }}
          </span>

        </div>

        <label>Bebidas</label>

        <div
          v-for="bebida in listaBebidas"
          :key="bebida.id"
          class="checkbox-container"
        >
          <input
            type="checkbox"
            :name="bebida.nome"
            :value="bebida"
            v-model="listaBebidasSelecionadas"
          />

          <span>
            {{ bebida.nome }}
          </span>

        </div>

        <div class="inputs">
          <input
            type="submit"
            class="submit-btn"
            value="Confirmar Pedido"
          />
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

      setTimeout(() => {
        this.mensagem = "";
        this.tipoMensagem = "";
      }, 3000);
    },

    async criarPedido(e) {
      e.preventDefault();

      if (!this.nomeCliente.trim()) {
        this.mostrarMensagem(
          "Informe o nome do cliente.",
          "erro"
        );
        return;
      }

      if (!this.burguer) {
        this.mostrarMensagem(
          "Selecione uma pizza.",
          "erro"
        );
        return;
      }

      if (!this.pontoCarneSelecionado) {
        this.mostrarMensagem(
          "Selecione o tipo de massa.",
          "erro"
        );
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

      this.mostrarMensagem(
        "Pedido realizado com sucesso!",
        "sucesso"
      );

      this.nomeCliente = "";
      this.pontoCarneSelecionado = "";
      this.listaComplementosSelecionados = [];
      this.listaBebidasSelecionadas = [];

      setTimeout(() => {
        this.$router.push("/pedidos");
      }, 1200);
    },
  },

  mounted() {
    this.getTiposPontos();
    this.getOpcionais();
  },
};
</script>

<style scoped>
#foto-content {
  margin-bottom: 16px;
  border-radius: 16px;
  position: relative;
  z-index: -1;
  justify-content: center;
  width: 100%;
  height: 180px;
  object-fit: cover;
}

#nome-hamburguer-content {
  font-size: 43px;
  font-weight: bold;
  text-align: start;
  margin-bottom: -90px;
  margin-left: 40px;
  color: antiquewhite;
  padding: 16px;
}

#form-pedido {
  max-width: 750px;
  margin: 0 auto;
}

.inputs {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

label {
  font-weight: bold;
  margin-bottom: 16px;
  color: #222;
  padding: 5px 12px;
  flex-direction: start;
  display: flex;
  border-left: 4px solid darkgoldenrod;
}

input,
select {
  padding: 12px;
  width: 300px;
  border: solid #222 1px;
  border-radius: 8px;
  height: 20px;
  font-size: 12px;
}

select {
  height: 45px;
}

#opcionais-titulo {
  width: 100%;
}

#opcionais-subtitulo {
  display: flex;
  align-items: flex-start;
  align-content: center;
  width: 100%;
  margin-bottom: 12px;
}

.checkbox-container span {
  margin-left: 6px;
  font-weight: bold;
}

.checkbox-container span,
.checkbox-container input {
  width: auto;
  height: 20px;
}

.submit-btn {
  background-color: #222;
  color: darkgoldenrod;
  font-weight: bold;
  border: none;
  font-size: 18px;
  border-radius: 12px;
  padding: 16px;
  margin: 0 auto;
  cursor: pointer;
  width: 100%;
  height: auto;
  transition: 0.5s;
}

.submit-btn:hover {
  background-color: darkgoldenrod;
  color: #222;
}
</style>

/* ================= ALERTAS ================= */

.alerta {
  width: 100%;
  padding: 16px;
  margin: 20px auto;
  border-radius: 10px;
  font-size: 18px;
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