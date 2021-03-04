<template>
  <div class="navbar">
    <div class="navbarItem" v-on:click="navigateHome()">
      <div class="logoContainer">
        <img class="logo" src="../assets/logo.png" />
      </div>
      <div class="brand-title">StyleIT</div>
    </div>
    <div class="back">
      <div class="navbarItem" v-on:click="navigateHome()">
        <div class="logoContainer">
          <img class="logo" src="../assets/home.png" />
        </div>
        <div>Home</div>
      </div>
      <div class="navbarItem"></div>
      <div class="navbarItem" v-on:click="navigateProfile()">
        <div class="iconContainer"><img src="../assets/person.png" /></div>
        <div>Profile</div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
export default Vue.extend({
  name: "NavBar",
  methods: {
    navigateHome() {
      if (this.$route.path === "/Home") {
        return;
      }
      this.$router.push("Home");
    },
    navigateProfile() {
      if (this.$route.path === "/Profile") {
        return;
      }
      this.$router.push("Profile");
    }
  }
});
</script>
<style scoped>
.navbar {
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 0 0.25rem 0.75rem 0.25rem;
}
.back {
  display: flex;
}

.navbarItem {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  margin-right: 5px;
}

.logoContainer {
  width: 35px;
  height: 35px;
  margin-right: 0.5rem;
}

.iconContainer {
  margin-right: 0.5rem;
  display: flex;
}

.logo {
  height: 100%;
}

.brand-title {
  font-weight: 900;
  font-family: Arial, sans-serif;
  font-size: 18px;
}
</style>
