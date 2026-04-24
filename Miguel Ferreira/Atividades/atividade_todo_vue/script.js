const { createApp, ref } = Vue;

createApp({
  setup() {
    // Estado da aplicação (Dados)
    const novaTarefa = ref('');
    const tarefas = ref([]);

    // REGRA: Adicionar tarefa (sem usar document.getElementById)
    const adicionar = () => {
      if (novaTarefa.value.trim() !== '') {
        tarefas.value.push({
          texto: novaTarefa.value,
          concluida: false
        });
        // Limpa o input automaticamente pelo v-model
        novaTarefa.value = '';
      }
    };

    // REGRA: Remover tarefa (sem usar .remove() manual)
    const remover = (index) => {
      tarefas.value.splice(index, 1);
    };

    // REGRA: Marcar como concluída (usando classes reativas)
    const alternarConcluida = (index) => {
      tarefas.value[index].concluida = !tarefas.value[index].concluida;
    };

    // Retornamos apenas o que o HTML precisa enxergar
    return {
      novaTarefa,
      tarefas,
      adicionar,
      remover,
      alternarConcluida
    };
  }
}).mount('#app');