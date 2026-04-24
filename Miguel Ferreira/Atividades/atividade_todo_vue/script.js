const { createApp, ref } = Vue;

createApp({
  setup() {

    const novaTarefa = ref('');
    const tarefas = ref([]);

    const adicionar = () => {
      if (novaTarefa.value.trim() !== '') {
        tarefas.value.push({
          texto: novaTarefa.value,
          concluida: false
        });

        novaTarefa.value = '';
      }
    };

    const remover = (index) => {
      tarefas.value.splice(index, 1);
    };

    const alternarConcluida = (index) => {
      tarefas.value[index].concluida = !tarefas.value[index].concluida;
    };

    return {
      novaTarefa,
      tarefas,
      adicionar,
      remover,
      alternarConcluida
    };
  }
}).mount('#app');
