<template>
  <div id="app">
    <div class="layout">
      <NavBar v-if="showNavbar" />
      <div class="mainContent" v-bind:class="{ noNavbar: !showNavbar }">
        <router-view :key="$route.path" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import NavBar from "./components/NavBar.vue";
import { Route } from "vue-router";

export default Vue.extend({
  name: "App",
  components: { NavBar },
  data: () => ({
    showNavbar: true
  }),
  watch: {
    $route(to: Route) {
      this.showNavbar = to.name !== "Login";
    }
  },
  mounted() {
    this.showNavbar = this.$route.name !== "Login";
  }
});
</script>

<style>
#app {
  height: calc(100% - 2rem);
  background-color: #0a0a0a;
  padding: 1rem;
}

.layout {
  height: 100%;
}

.mainContent {
  height: calc(100% - 50px - 0.75rem);
  overflow: auto;
}

.mainContent.noNavbar {
  height: 100%;
}
</style>
