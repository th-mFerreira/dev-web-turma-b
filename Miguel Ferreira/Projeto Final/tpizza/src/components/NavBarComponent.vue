<template>
  <div>
    <nav id="nav">
      <router-link to="/" id="logo-url">
        <img src="/img/logo_tburguer.png" id="logo" />
        <span id="titulo">T-Pizza</span>
      </router-link>

      <router-link to="/menu">Cardápio</router-link>

      |

      <router-link to="/pedidos">Pedidos</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBarComponent",
};
</script>

<style scoped>
#nav {
  background-color: #8B0000;
  border-bottom: 4px solid #FFD54F;
  padding: 15px 50px;

  display: flex;
  align-items: center;
}

#logo-url {
  display: flex;
  align-items: center;

  margin-right: auto;

  text-decoration: none;
}

#logo {
  width: 60px;
  height: 60px;
}

#titulo {
  margin-left: 12px;

  font-size: 28px;

  font-weight: bold;

  color: white;
}

#nav a {
  color: #FFD54F;

  text-decoration: none;

  margin: 12px;

  transition: .3s;
}

#nav a:hover {
  color: white;
}

#logo-url:hover #logo {
  transform: rotate(360deg);

  transition: .5s;
}
</style>