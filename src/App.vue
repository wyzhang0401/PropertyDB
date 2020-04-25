<template>
  <div id="app">
    <app-header></app-header>
    <router-view />
  </div>
</template>

<script>
import header from "./components/Header.vue";

export default {
  name: "App",
  components: {
    appHeader: header
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
  margin: 0;
}

ul,
li {
  list-style: none;
}
a {
  text-decoration: none;
}
.app-main {
  /* position: absolute;
  margin-top: 0; */
  width: 100%;
  -webkit-box-shadow: 0px 0px 10px #ccc;
  -moz-box-shadow: 0px 0px 10px #ccc;
  -ms-box-shadow: 0px 0px 10px #ccc;
  box-shadow: 0px 0px 10px #ccc;
  background: #e6f0ef;
  padding: 20px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  border-radius: 5px;
  padding-bottom: 40px;
}
</style>
