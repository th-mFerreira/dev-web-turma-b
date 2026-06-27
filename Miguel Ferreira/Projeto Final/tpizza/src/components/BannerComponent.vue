<template>
  <div id="main-banner">
    <div id="overlay">
      <h1>T-Pizza</h1>
      <p>Pizzas artesanais preparadas com ingredientes selecionados.</p>
      <router-link to="/menu" class="btn-banner">
        Ver Cardápio
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "BannerComponent",
};
</script>

<style scoped>
#main-banner {
  background-image: url("/public/img/banner.jpeg");
  background-position: center;
  background-size: cover;
  height: 500px;

  display: flex;
  justify-content: center;
  align-items: center;
}

#overlay {
  background: rgba(0, 0, 0, 0.55);
  padding: 40px;
  border-radius: 15px;
  text-align: center;
}

#overlay h1 {
  color: white;
  font-size: 54px;
  margin-bottom: 15px;
}

#overlay p {
  color: #f1f1f1;
  font-size: 20px;
  margin-bottom: 30px;
}

.btn-banner {
  background: #c62828;
  color: white;
  text-decoration: none;
  padding: 14px 28px;
  border-radius: 8px;
  font-weight: bold;
  transition: 0.3s;
}

.btn-banner:hover {
  background: #8e0000;
}
</style>