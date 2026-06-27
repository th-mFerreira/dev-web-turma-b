<template>
  <div>
    <div id="pedidos-tabela">
      <div>
        <div id="pedidos-tabela-cabecalho">
          <div id="ordem-id">#ID</div>
          <div>Cliente</div>
          <div>Pizza</div>
          <div>Massa</div>
          <div>Adicionais</div>
          <div>Status</div>
          <div id="div-acoes">Ações</div>
        </div>
      </div>
    </div>

    <div
      class="pedidos-tabela-linha"
      v-for="pedido in listaPedidosRealizados"
      :key="pedido.id"
    >
      <div id="ordem-numero">{{ pedido.id }}</div>

      <div>{{ pedido.nome }}</div>

      <div>{{ pedido.burguer.nome }}</div>

      <div>{{ pedido.ponto.descricao }}</div>

      <div>
        <ul>
          <li
            v-for="(complemento, index) in pedido.complemento"
            :key="index"
          >
            {{ complemento.nome }}
          </li>
        </ul>

        <div class="divider"></div>

        <ul>
          <li
            v-for="(bebida, index) in pedido.bebidas"
            :key="index"
          >
            {{ bebida.nome }}
          </li>
        </ul>
      </div>

      <div>
        <select
          class="status"
          @change="atualizarStatusPedido($event, pedido.id)"
        >
          <option value="">Selecione</option>

          <option
            v-for="status in listaStatusPedido"
            :key="status.id"
            :value="status.id"
            :selected="status.id == pedido.statusId"
          >
            {{ status.descricao }}
          </option>
        </select>
      </div>

      <div id="div-acoes">
        <img
          src="/img/icone_lixeira.png"
          width="35"
          height="35"
          style="cursor:pointer"
          @click="deletarPedido(pedido.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListaPedidoComponent",

  data() {
    return {
      listaPedidosRealizados: [],
      listaStatusPedido: [],
    };
  },

  methods: {
    async consultarPedidos() {
      const response = await fetch(`${this.$apiUrl}/pedidos`);
      this.listaPedidosRealizados = await response.json();
    },

    async consultarStatusPedido() {
      const response = await fetch(`${this.$apiUrl}/status_pedido`);
      this.listaStatusPedido = await response.json();
    },

    async atualizarStatusPedido(event, idPedido) {
      const idPedidoAtualizado = event.target.value;

      await fetch(`${this.$apiUrl}/pedidos/${idPedido}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          statusId: Number(idPedidoAtualizado),
        }),
      });

      await this.consultarPedidos();
    },

    async deletarPedido(idPedido) {
      const confirmar = confirm(
        "Deseja realmente excluir este pedido?"
      );

      if (!confirmar) return;

      await fetch(`${this.$apiUrl}/pedidos/${idPedido}`, {
        method: "DELETE",
      });

      await this.consultarPedidos();
    },
  },

  mounted() {
    this.consultarPedidos();
    this.consultarStatusPedido();
  },
};
</script>

<style scoped>
#pedidos-tabela {
  width: 100%;
  margin: 0 auto;
}

#pedidos-tabela-cabecalho,
#pedidos-tabela-linhas,
.pedidos-tabela-linha {
  display: flex;
  flex-wrap: wrap;
}

#pedidos-tabela-cabecalho {
  font-weight: bold;
  padding: 12px;
  border-bottom: 2px solid #222;
}

#pedidos-tabela-cabecalho div,
.pedidos-tabela-linha div {
  width: 18%;
}

.pedidos-tabela-linha {
  width: 100%;
  padding: 12px;
  border-bottom: 1px dotted #222;
  align-items: center;
}

#pedidos-tabela-cabecalho #ordem-id,
.pedidos-tabela-linha #ordem-numero,
.pedidos-tabela-linha #div-acoes,
#pedidos-tabela-cabecalho #div-acoes {
  width: 5%;
}

.status {
  padding: 6px;
  border-radius: 6px;
}
</style>