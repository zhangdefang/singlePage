<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <osp-image v-bind="dataCenter.Image2"></osp-image>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      dataCenter: {
        Image2: {
          imageColor: "",
          src: "/img/plant.png",
          width: 110,
          height: 100
        }
      }
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
