<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png">
    <h1>My first app Vue</h1>
    <p class="subtitulo">Vamos aprender muito!</p>
    <br/>
    <estilo-component/>
    <br/>
    <HomeComponent/>
    <hr>
    <usuario-component v-show="componentUsuarioVisivel"/>
    <br/>
    <imagem-component 
      @visibilidadeImg="escutarVisibilidadeImg" 
      larguraImg ="500" 
      urlImagem = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrwmRPeecJ5SfnEz0YNd9CfcIpvMgA6F5d_A&s"/>
  </div>
</template>

<script>

import HomeComponent from './components/HomeComponent.vue';
import ImagemComponent from './components/ImagemComponent.vue';

export default {
  name: 'App',
  components: {
    HomeComponent,
    ImagemComponent
  },
  data() {
    return {
      componentUsuarioVisivel: true
    };
  },
  methods: {
    escutarVisibilidadeImg( isVisible ) {
      this.componentUsuarioVisivel = !isVisible;
    },
  },
  mounted() {
    console.log("Componente App montado!");
  },
  errorCaptured() {
    console.log("Erro capturado no componente App!");
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
