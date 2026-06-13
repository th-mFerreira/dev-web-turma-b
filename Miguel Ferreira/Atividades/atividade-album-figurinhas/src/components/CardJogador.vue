<script setup>
defineProps({
  jogador: Object
});

const imagemPadrao = 'https://via.placeholder.com/120?text=Jogador';

const trocarImagem = (event) => {
  event.target.src = imagemPadrao;
};

const traduzirPosicao = (posicao) => {
  const traducoes = {
    Goalkeeper: 'Goleiro',
    Defender: 'Defensor',
    Midfielder: 'Meio-campista',
    Attacker: 'Atacante'
  };

  return traducoes[posicao] || posicao;
};
</script>

<template>
  <div class="card">
    <img
      :src="jogador.photo || imagemPadrao"
      :alt="jogador.name"
      @error="trocarImagem"
    >

    <h2>{{ jogador.name }}</h2>

    <p>{{ traduzirPosicao(jogador.position) }}</p>
  </div>
</template>

<style scoped>
.card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, .15);
  padding: 15px;
  transition: .3s;
}

.card:hover {
  transform: translateY(-5px);
}

.card img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
}

.card h2 {
  font-size: 16px;
  margin-top: 10px;
}

.card p {
  color: #666;
}
</style>