<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { getPaises, getTimePorPais, getJogadoresPorTime } from './services/apiFootball';
import CardJogador from './components/CardJogador.vue';

const paises = ref([]);
const paisSelecionado = ref('');
const jogadores = ref([]);
const carregando = ref(false);
const erro = ref('');
const bandeiraPadrao =
  'https://via.placeholder.com/60x40?text=Bandeira';
const trocarBandeira = (event) => {
  event.target.src = bandeiraPadrao;
};

const traduzirPais = (pais) => {
  const traducoes = {
    Brazil: 'Brasil',
    Argentina: 'Argentina',
    France: 'França',
    Germany: 'Alemanha',
    Spain: 'Espanha',
    Portugal: 'Portugal',
    England: 'Inglaterra',
    Italy: 'Itália',
    Netherlands: 'Holanda',
    Belgium: 'Bélgica',
    Uruguay: 'Uruguai',
    Chile: 'Chile',
    Colombia: 'Colômbia',
    Mexico: 'México',
    Morocco: 'Marrocos',
    Croatia: 'Croácia',
    Japan: 'Japão',
    'South Korea': 'Coreia do Sul',
    Switzerland: 'Suíça',
    Denmark: 'Dinamarca',
    Sweden: 'Suécia',
    Norway: 'Noruega',
    Poland: 'Polônia',
    Serbia: 'Sérvia',
    Senegal: 'Senegal',
    Cameroon: 'Camarões',
    Ghana: 'Gana',
    Nigeria: 'Nigéria',
    USA: 'Estados Unidos',
    Canada: 'Canadá',
    Australia: 'Austrália'
  };

  return traducoes[pais] || pais;
};

const paisAtual = computed(() => {
  return paises.value.find((pais) => pais.name === paisSelecionado.value);
});

onMounted(async () => {
  try {
    paises.value = await getPaises();
  } catch (e) {
    erro.value = 'Erro ao carregar países.';
  }
});

watch(paisSelecionado, async (novoPais) => {
  if (!novoPais) {
    jogadores.value = [];
    return;
  }

  carregando.value = true;
  erro.value = '';
  jogadores.value = [];

  try {
    const time = await getTimePorPais(novoPais);
    const idTime = time.team.id;

    jogadores.value = await getJogadoresPorTime(idTime);
  } catch (e) {
    erro.value = 'Erro ao carregar figurinhas.';
  } finally {
    carregando.value = false;
  }
});
</script>

<template>
  <main class="container">
    <h1>Álbum de Figurinhas ⚽</h1>

    <select v-model="paisSelecionado">
      <option value="">Selecione um país</option>

      <option
        v-for="pais in paises"
        :key="pais.name"
        :value="pais.name"
      >
        {{ traduzirPais(pais.name) }}
      </option>
    </select>

    <div v-if="paisAtual" class="pais-selecionado">
      <img
        :src="paisAtual.flag || bandeiraPadrao"
        :alt="traduzirPais(paisAtual.name)"
        @error="trocarBandeira"
      />

      <p>
        País selecionado:
        <strong>{{ traduzirPais(paisAtual.name) }}</strong>
      </p>
    </div>

    <p v-if="carregando">Carregando figurinhas...</p>

    <p v-if="erro" class="erro">{{ erro }}</p>

    <h3 v-if="jogadores.length">
      Total de jogadores: {{ jogadores.length }}
    </h3>

    <section class="grid">
      <CardJogador
        v-for="jogador in jogadores"
        :key="jogador.id"
        :jogador="jogador"
      />
    </section>
  </main>
</template>

<style scoped>
.container {
  max-width: 1300px;
  margin: auto;
  padding: 20px;
  text-align: center;
  font-family: Arial, sans-serif;
  min-height: 100vh;
}

h1 {
  color: #1a237e;
  margin-bottom: 20px;
}

body {
  background-color: #f4f6f9;
}

select {
  padding: 12px;
  width: 300px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.pais-selecionado {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.pais-selecionado img {
  width: 45px;
  height: 30px;
  object-fit: cover;
  border: 1px solid #ddd;
}

.erro {
  color: red;
  font-weight: bold;
}

.grid {
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
}
</style>