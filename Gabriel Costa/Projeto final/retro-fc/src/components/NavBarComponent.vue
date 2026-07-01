<template>
  <div>
    <nav id="nav">
      <router-link to="/" id="logo-url">
        <img src="https://i.pinimg.com/736x/6f/f8/25/6ff825fcce0d9d2870967b85269d4860.jpg" id="logo" />
      </router-link>
      <router-link to="/menu">Catálogo</router-link> |
      <router-link to="/pedidos">Encomendas</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBarComponent",
};
</script>

<style scoped>
#logo {
  width: 60px;
  height: 60px;
}
#nav #logo-url {
  margin-right: auto;
  margin-left: 0;
}
#nav a {
  color: #2980b9;
  text-decoration: none;
  margin: 12px;
  transition: 0.5s;
  font-weight: bold;
}
#nav a:hover {
  color: #3498db;
  font-size: 20px;
}
#logo-url:hover {
  transform: rotate(360deg);
  transition: transform 0.5s;
}
#nav {
  background-color: #1a1a1a;
  border-bottom: 3px solid #2980b9;
  padding: 15px 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>