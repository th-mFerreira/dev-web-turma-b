const API_URL = 'https://v3.football.api-sports.io';
const TOKEN = '6e2b7e2369302737ce3759cd832b4f04';

const headers = {
  'x-apisports-key': TOKEN
};

export async function getPaises() {
  const resposta = await fetch(`${API_URL}/teams/countries`, { headers });
  const dados = await resposta.json();
  return dados.response;
}

export async function getTimePorPais(nomePais) {
  const resposta = await fetch(`${API_URL}/teams?name=${nomePais}`, { headers });
  const dados = await resposta.json();
  return dados.response[0];
}

export async function getJogadoresPorTime(idTime) {
  const resposta = await fetch(`${API_URL}/players/squads?team=${idTime}`, { headers });
  const dados = await resposta.json();
  return dados.response[0].players;
}