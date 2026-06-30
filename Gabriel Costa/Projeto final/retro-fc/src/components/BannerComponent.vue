<template>
  <div id="main-banner">
    <h1>Retrô FC</h1>
  </div>
</template>

<script>
export default {
  name: "BannerComponent",
};
</script>

<style scoped>
#main-banner {
  background-image: url("https://cdn.pixabay.com/photo/2014/10/14/20/24/soccer-488700_1280.jpg");
  background-position: center;
  background-size: cover;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

#main-banner h1 {
  font-size: 32px;
  color: #3498db;
  text-align: center;
  background: rgba(26, 26, 26, 0.85);
  padding: 10px 40px;
  border-radius: 8px;
  border: 1px solid #2980b9;
  margin-right: 150px;
}
</style>